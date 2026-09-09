/**
 * Resolution: walk each reachable definition's parse tree into the normalized
 * {@link Type} IR.
 *
 * `SchemaBuilder` owns a module cache, a registry of instantiated definitions
 * (`defId` -> {@link Def}), and a work queue. Starting from a file's anonymous
 * default export it drains the queue; each `ref` encountered during a walk
 * enqueues its target rather than recursing, so ordinary self-reference just
 * re-hits an existing registry entry and cycles terminate.
 */

import type { Token } from "antlr4";
import ProgramParser, {
    ExpandContext,
    Generic_paramsContext,
    IndexContext,
    IntersectionContext,
    ItemContext,
    JSONArrayContext,
    JSONBooleanContext,
    JSONNullContext,
    JSONNumberContext,
    JSONObjectContext,
    JSONStringContext,
    Json_objectContext,
    Json_valueContext,
    KeyofContext,
    ListContext,
    NamedTypeContext,
    NumberContext,
    ObjectContext,
    ParensContext,
    PatternPairContext,
    PrimitiveContext,
    RestContext,
    StringContext,
    StringPairContext,
    SubscriptContext,
    TupleContext,
    TupleTypeContext,
    TypeContext,
    TypePairContext,
    UnionContext,
    WithContext,
} from "./parser/ProgramParser";
import {
    Def,
    DefId,
    JSONObject,
    JSONValue,
    ObjectEntry,
    ObjectType,
    PatternEntry,
    PrimitiveType,
    RefType,
    Type,
    isEmptyObject,
    stableStringify,
} from "./ir";
import { LoadedModule, loadModule } from "./load";
import { parseString, SchemagenError } from "./utils";

/** Bindings for a definition's generic parameters while its body is walked. */
type Env = Map<string, Type>;

/**
 * Transient result of resolving `expand T`: the members of the union `T`
 * denotes, waiting to be distributed across the nearest enclosing *frame* (an
 * operand of `&`, or a type-argument slot). It never reaches a {@link Def}
 * body — a frame consumes it, or {@link SchemaBuilder.resolveType} rejects it.
 *
 * `fromUnion` records whether a real union was seen: `expand X` where `X` is a
 * lone non-union type yields `fromUnion: false`, and a frame that meets such a
 * value errors ("`expand` requires a union") rather than acting as a no-op.
 */
interface Distributable {
    kind: "distributable";
    members: Type[];
    fromUnion: boolean;
}

/** A resolved type, or an unconsumed {@link Distributable}. */
type Resolved = Type | Distributable;

function isDistributable(r: Resolved): r is Distributable {
    return r.kind === "distributable";
}

/** `[[a, b], [c]]` -> `[[a, c], [b, c]]`; `[]` -> `[[]]`. */
function cartesianProduct<T>(lists: T[][]): T[][] {
    return lists.reduce<T[][]>(
        (acc, list) => acc.flatMap((combo) => list.map((item) => [...combo, item])),
        [[]]
    );
}

/** Guard against a single `(file, symbol)` diverging under generic
 *  instantiation (`Rec<T> = { x: Rec<Rec<T>> }`). */
const MAX_INSTANTIATIONS = 100;

export interface BuildResult {
    rootDef: DefId;
    defs: Map<DefId, Def>;
}

export class SchemaBuilder {
    private readonly modules = new Map<string, LoadedModule>();
    private readonly defs = new Map<DefId, Def>();
    private readonly queue: DefId[] = [];
    /** Instantiation count per `` `${filePath}#${symbol}` ``. */
    private readonly counts = new Map<string, number>();
    /** Stable short serial per def id, used to keep instantiation keys bounded
     *  when type arguments are themselves refs. */
    private readonly serials = new Map<DefId, number>();
    /** Defs whose bodies are being resolved eagerly (out of queue order) to
     *  service an intersection; re-entry means an unrepresentable cycle. */
    private readonly resolvingBodies = new Set<DefId>();

    build(startPath: string): BuildResult {
        const rootRef = this.reference(startPath, "", [], null, false);
        while (this.queue.length > 0) {
            const id = this.queue.shift()!;
            const def = this.defs.get(id)!;
            if (def.status === "done") continue;
            def.body = this.resolveDefBody(def);
            def.status = "done";
        }
        return { rootDef: rootRef.def, defs: this.defs };
    }

    private getModule(path: string): LoadedModule {
        let mod = this.modules.get(path);
        if (!mod) {
            mod = loadModule(path);
            this.modules.set(path, mod);
        }
        return mod;
    }

    /**
     * Get (creating and enqueuing if new) the registry entry for one
     * instantiation, and return a `ref` to it. Symbol existence, export
     * visibility, and arity are checked here, at the reference site.
     */
    private reference(
        filePath: string,
        symbol: string,
        args: Type[],
        origin: Token | null,
        requireExported: boolean
    ): RefType {
        const mod = this.getModule(filePath);
        const raw = symbol === "" ? mod.default : mod.symbols.get(symbol) ?? null;
        const label = symbol === "" ? "default export" : symbol;

        if (!raw) {
            const msg =
                symbol === ""
                    ? "file has no default export"
                    : `unknown symbol: ${symbol} in ${filePath}`;
            throw this.failAt(msg, filePath, origin);
        }
        if (requireExported && symbol !== "" && !raw.exported) {
            throw this.failAt(
                `symbol is not exported: ${symbol} in ${filePath}`,
                filePath,
                origin
            );
        }
        if (raw.params.length !== args.length) {
            throw this.failAt(
                `${label} expects ${raw.params.length} type argument(s), got ${args.length}`,
                filePath,
                origin
            );
        }

        const id = this.keyFor(filePath, symbol, args);
        let def = this.defs.get(id);
        if (!def) {
            const countKey = `${filePath}#${symbol}`;
            const n = (this.counts.get(countKey) ?? 0) + 1;
            if (n > MAX_INSTANTIATIONS) {
                throw this.failAt(
                    `recursive generic instantiation: ${label} instantiated more than ${MAX_INSTANTIATIONS} times`,
                    filePath,
                    origin
                );
            }
            this.counts.set(countKey, n);
            def = {
                id,
                filePath,
                symbol,
                args,
                body: null,
                status: "pending",
                refCount: 0,
            };
            this.defs.set(id, def);
            this.queue.push(id);
        }
        def.refCount++;
        return { kind: "ref", def: id, with: {} };
    }

    /**
     * Identity key for one instantiation. Type arguments are folded in
     * structurally, but a `ref` argument collapses to its target's short serial
     * so the key can't grow without bound when a generic is instantiated over
     * ever-deeper refs (that divergence is caught by the instantiation count).
     */
    private keyFor(filePath: string, symbol: string, args: Type[]): DefId {
        const base = `${filePath}#${symbol}`;
        if (args.length === 0) return base;
        return `${base}<${args.map((a) => stableStringify(this.canon(a))).join(",")}>`;
    }

    private serialOf(id: DefId): number {
        let serial = this.serials.get(id);
        if (serial === undefined) {
            serial = this.serials.size;
            this.serials.set(id, serial);
        }
        return serial;
    }

    private canon(t: Type): unknown {
        switch (t.kind) {
            case "primitive":
                return { k: "primitive", v: t.value, w: t.with };
            case "literal":
                return { k: "literal", v: t.value, w: t.with };
            case "ref":
                return { k: "ref", s: this.serialOf(t.def), w: t.with };
            case "union":
                return { k: "union", m: t.members.map((m) => this.canon(m)), w: t.with };
            case "array":
                return {
                    k: "array",
                    p: t.prefix.map((x) => this.canon(x)),
                    i: t.items ? this.canon(t.items) : null,
                    q: t.postfix.map((x) => this.canon(x)),
                    w: t.with,
                };
            case "object":
                return {
                    k: "object",
                    e: t.entries.map((e) => ({
                        key: e.key,
                        optional: e.optional,
                        type: this.canon(e.type),
                    })),
                    x: t.indexValue ? this.canon(t.indexValue) : null,
                    pp: t.patternEntries.map((pe) => ({
                        pattern: pe.pattern,
                        type: this.canon(pe.type),
                    })),
                    w: t.with,
                };
        }
    }

    private resolveDefBody(def: Def): Type {
        const mod = this.getModule(def.filePath);
        const raw = def.symbol === "" ? mod.default! : mod.symbols.get(def.symbol)!;
        const env: Env = new Map();
        raw.params.forEach((p, i) => env.set(p, def.args[i]!));
        return describedBy(this.resolveType(raw.tree, def.filePath, env), raw.doc);
    }

    // ---- the type walk -----------------------------------------------------

    /**
     * Resolve one `type` node to a concrete {@link Type}. This is the strict
     * entry point: a `Distributable` reaching here means an `expand` sat
     * somewhere it cannot be consumed, which is an error.
     */
    private resolveType(ctx: TypeContext, file: string, env: Env): Type {
        const r = this.resolveInner(ctx, file, env);
        if (isDistributable(r)) {
            throw this.fail(
                r.fromUnion
                    ? "`expand` has no effect here; it may only qualify an operand of `&` or a type argument"
                    : "`expand` requires a union",
                file,
                ctx.start
            );
        }
        return r;
    }

    /**
     * The type walk. Returns a {@link Distributable} for `expand` (and for a
     * union or `(...)` that wraps one); every other node collapses to a
     * {@link Type}. The three frames — `&` operands, generic-argument slots,
     * and `expand`'s own union detection — call this directly; everyone else
     * goes through {@link resolveType}.
     */
    private resolveInner(ctx: TypeContext, file: string, env: Env): Resolved {
        if (ctx instanceof PrimitiveContext) {
            return {
                kind: "primitive",
                value: ctx._val.text as PrimitiveType["value"],
                with: {},
            };
        }
        if (ctx instanceof NumberContext) {
            return { kind: "literal", value: Number(ctx._val.text), with: {} };
        }
        if (ctx instanceof StringContext) {
            return { kind: "literal", value: parseString(ctx._val.text), with: {} };
        }
        if (ctx instanceof ParensContext) {
            // Transparent: a parenthesised `expand` still feeds an outer frame.
            return this.resolveInner(ctx.type_(), file, env);
        }
        if (ctx instanceof ListContext) {
            return {
                kind: "array",
                prefix: [],
                items: this.resolveType(ctx.type_(), file, env),
                postfix: [],
                with: {},
            };
        }
        if (ctx instanceof TupleTypeContext) {
            return this.resolveTuple(ctx.tuple(), file, env);
        }
        if (ctx instanceof WithContext) {
            const base = this.resolveType(ctx.type_(), file, env);
            return withBag(base, this.jsonObject(ctx.json_object()));
        }
        if (ctx instanceof UnionContext) {
            const l = this.resolveInner(ctx._l, file, env);
            const r = this.resolveInner(ctx._r, file, env);
            if (isDistributable(l) || isDistributable(r)) {
                // `expand X | Y` — the whole union is the distribution set.
                return {
                    kind: "distributable",
                    members: [
                        ...(isDistributable(l) ? l.members : [l]),
                        ...(isDistributable(r) ? r.members : [r]),
                    ],
                    fromUnion: true,
                };
            }
            return this.normalizeUnion([l, r]);
        }
        if (ctx instanceof IntersectionContext) {
            const l = this.resolveInner(ctx._l, file, env);
            const r = this.resolveInner(ctx._r, file, env);
            if (isDistributable(l) || isDistributable(r)) {
                return this.distributeIntersection(l, r, ctx.start, file);
            }
            return this.intersect(l, r, ctx.start, file);
        }
        if (ctx instanceof ObjectContext) {
            return this.resolveObject(ctx, file, env);
        }
        if (ctx instanceof NamedTypeContext) {
            return this.resolveNamed(ctx, file, env);
        }
        if (ctx instanceof ExpandContext) {
            return this.resolveExpand(ctx, file, env);
        }
        if (ctx instanceof KeyofContext) {
            return this.resolveKeyof(
                this.resolveType(ctx.type_(), file, env),
                ctx.start,
                file
            );
        }
        if (ctx instanceof IndexContext) {
            return this.resolveIndex(
                this.resolveType(ctx._val, file, env),
                this.resolveType(ctx._key, file, env),
                ctx.start,
                file
            );
        }
        if (ctx instanceof SubscriptContext) {
            return this.resolveIndex(
                this.resolveType(ctx.type_(), file, env),
                { kind: "literal", value: ctx._member.text, with: {} },
                ctx.start,
                file
            );
        }
        throw this.fail("unsupported type syntax", file, ctx.start);
    }

    // ---- `expand` distribution -------------------------------------------

    private resolveExpand(
        ctx: ExpandContext,
        file: string,
        env: Env
    ): Distributable {
        const operand = this.resolveType(ctx.type_(), file, env);
        const seen = this.throughRefs(operand, ctx.start, file);
        if (seen.kind === "union") {
            if (!isEmptyObject(seen.with)) {
                throw this.fail(
                    "`expand` requires a plain union operand; move the `with` clause onto the members or the result",
                    file,
                    ctx.start
                );
            }
            return { kind: "distributable", members: seen.members, fromUnion: true };
        }
        // Not a union yet — only an enclosing `X | Y` can rescue it.
        return { kind: "distributable", members: [operand], fromUnion: false };
    }

    /** Members a frame operand contributes; a lone `expand <non-union>` here
     *  is the error the spec calls for rather than a silent pass-through. */
    private frameMembers(r: Resolved, tok: Token, file: string): Type[] {
        if (!isDistributable(r)) return [r];
        if (!r.fromUnion) {
            throw this.fail("`expand` requires a union", file, tok);
        }
        return r.members;
    }

    private distributeIntersection(
        l: Resolved,
        r: Resolved,
        tok: Token,
        file: string
    ): Type {
        const out: Type[] = [];
        for (const a of this.frameMembers(l, tok, file)) {
            for (const b of this.frameMembers(r, tok, file)) {
                out.push(this.intersect(a, b, tok, file));
            }
        }
        return this.normalizeUnion(out);
    }

    /** Chase a chain of bare `ref`s to the type they ultimately denote, using
     *  the shared eager-resolution guard so cycles fail cleanly. */
    private throughRefs(t: Type, tok: Token, file: string): Type {
        let cur = t;
        while (cur.kind === "ref") cur = this.bodyOf(cur, tok, file);
        return cur;
    }

    // ---- `keyof` -------------------------------------------------------

    /**
     * `keyof T` — the set of keys `T` allows, as a string-literal union.
     * An index signature or pattern property makes the set open, so the
     * result is `string`; `keyof` of a union is the keys common to every
     * member; anything that is not an object is an error.
     */
    private resolveKeyof(t: Type, tok: Token, file: string): Type {
        const keys = this.keyNamesOf(t, tok, file);
        if (keys === "open") {
            return { kind: "primitive", value: "string", with: {} };
        }
        if (keys.length === 0) {
            throw this.fail("`keyof` of an object type with no known keys", file, tok);
        }
        return this.normalizeUnion(
            keys.map((k) => ({ kind: "literal", value: k, with: {} }))
        );
    }

    private keyNamesOf(
        t: Type,
        tok: Token,
        file: string
    ): string[] | "open" {
        const resolved = this.throughRefs(t, tok, file);
        if (resolved.kind === "object") {
            if (resolved.indexValue || resolved.patternEntries.length > 0) {
                return "open";
            }
            return resolved.entries.map((e) => e.key);
        }
        if (resolved.kind === "union") {
            // keyof (A | B) = keyof A & keyof B: keys present in every member.
            // `open` (from an index signature) intersects away to nothing.
            const per = resolved.members.map((m) => this.keyNamesOf(m, tok, file));
            const concrete = per.filter((k): k is string[] => k !== "open");
            if (concrete.length === 0) return "open";
            return concrete.reduce((acc, list) =>
                acc.filter((k) => list.includes(k))
            );
        }
        throw this.fail("`keyof` requires an object type", file, tok);
    }

    // ---- indexed access `T[K]` / `T.member` --------------------------

    /**
     * `T[K]` — the type reached by indexing `T` with `K`. A union on either
     * side distributes (`(A | B)[K]` -> `A[K] | B[K]`, `T["a" | "b"]` ->
     * `T["a"] | T["b"]`). A string-literal key names a property (falling back
     * to the index signature); a numeric key indexes a tuple or list;
     * `number` / `string` keys index a list / index signature respectively.
     * The property's optionality does not leak into the result.
     */
    private resolveIndex(
        target: Type,
        key: Type,
        tok: Token,
        file: string
    ): Type {
        const t = this.throughRefs(target, tok, file);
        if (t.kind === "union") {
            return this.normalizeUnion(
                t.members.map((m) => this.resolveIndex(m, key, tok, file))
            );
        }

        const k = this.throughRefs(key, tok, file);
        if (k.kind === "union") {
            return this.normalizeUnion(
                k.members.map((m) => this.resolveIndex(t, m, tok, file))
            );
        }

        if (k.kind === "literal" && typeof k.value === "string") {
            return this.indexByName(t, k.value, tok, file);
        }
        if (k.kind === "literal" && typeof k.value === "number") {
            return this.indexByOrdinal(t, k.value, tok, file);
        }
        if (k.kind === "primitive" && k.value === "number") {
            return this.indexByNumber(t, tok, file);
        }
        if (k.kind === "primitive" && k.value === "string") {
            if (t.kind === "object" && t.indexValue) return t.indexValue;
            throw this.fail(
                "a `string` index requires an object with an index signature",
                file,
                tok
            );
        }
        throw this.fail("an index type must be a string or a number", file, tok);
    }

    private indexByName(t: Type, name: string, tok: Token, file: string): Type {
        if (t.kind !== "object") {
            throw this.fail(
                `cannot index ${describe(t)} by property name`,
                file,
                tok
            );
        }
        const entry = t.entries.find((e) => e.key === name);
        if (entry) return entry.type;
        if (t.indexValue) return t.indexValue;
        throw this.fail(
            `property "${name}" does not exist on the object`,
            file,
            tok
        );
    }

    private indexByOrdinal(t: Type, n: number, tok: Token, file: string): Type {
        if (t.kind !== "array") {
            throw this.fail(`cannot index ${describe(t)} by position`, file, tok);
        }
        if (n >= 0 && n < t.prefix.length) return t.prefix[n]!;
        if (t.items) return t.items;
        throw this.fail(`no element at position ${n}`, file, tok);
    }

    private indexByNumber(t: Type, tok: Token, file: string): Type {
        if (t.kind !== "array") {
            throw this.fail(`cannot index ${describe(t)} by number`, file, tok);
        }
        if (t.prefix.length > 0) {
            return this.normalizeUnion([
                ...t.prefix,
                ...(t.items ? [t.items] : []),
            ]);
        }
        if (t.items) return t.items;
        throw this.fail("cannot index an empty tuple by number", file, tok);
    }

    private resolveObject(ctx: ObjectContext, file: string, env: Env): ObjectType {
        // `{ [K in T]: V }` is a mapped type and must stand alone.
        const mapped = ctx._items.find(
            (p): p is TypePairContext => p instanceof TypePairContext
        );
        if (mapped) {
            if (ctx._items.length !== 1) {
                throw this.fail(
                    "a mapped type must be the sole member of its object",
                    file,
                    mapped.start
                );
            }
            return this.resolveMapped(mapped, file, env);
        }

        const entries: ObjectEntry[] = [];
        const keys = new Set<string>();
        const patternEntries: PatternEntry[] = [];
        const patterns = new Set<string>();
        let indexValue: Type | null = null;
        const docFor = this.getModule(file).docFor;

        for (const pair of ctx._items) {
            if (pair instanceof StringPairContext) {
                const key =
                    pair._key.type === ProgramParser.STRING
                        ? parseString(pair._key.text)
                        : pair._key.text;
                if (keys.has(key)) {
                    throw this.fail(`duplicate property: ${key}`, file, pair.start);
                }
                keys.add(key);
                entries.push({
                    key,
                    type: describedBy(
                        this.resolveType(pair._val, file, env),
                        docFor(pair.start)
                    ),
                    optional: !!pair._optional,
                });
                continue;
            }
            if (pair instanceof PatternPairContext) {
                if (pair._match) {
                    const match = this.throughRefs(
                        this.resolveType(pair._match, file, env),
                        pair.start,
                        file
                    );
                    if (match.kind !== "literal" || typeof match.value !== "string") {
                        throw this.fail(
                            "a pattern property key must evaluate to a string literal",
                            file,
                            pair.start
                        );
                    }
                    if (patterns.has(match.value)) {
                        throw this.fail(
                            `duplicate pattern property: ${match.value}`,
                            file,
                            pair.start
                        );
                    }
                    patterns.add(match.value);
                    patternEntries.push({
                        pattern: match.value,
                        type: describedBy(
                            this.resolveType(pair._val, file, env),
                            docFor(pair.start)
                        ),
                    });
                    continue;
                }
                if (indexValue) {
                    throw this.fail("multiple index signatures", file, pair.start);
                }
                indexValue = this.resolveType(pair._val, file, env);
                continue;
            }
            throw this.fail("unsupported object member", file, pair.start);
        }

        return { kind: "object", entries, indexValue, patternEntries, with: {} };
    }

    /**
     * `{ [K in T]: V }` — `T` must be a finite set of string literals (given
     * directly or via `keyof`); the result has one entry per literal, each
     * typed by `V` with `K` bound to that literal. `?` makes every entry
     * optional; without it they are all required.
     */
    private resolveMapped(
        ctx: TypePairContext,
        file: string,
        env: Env
    ): ObjectType {
        const key = ctx._name.text;
        const source = this.resolveType(ctx.type__list()[0]!, file, env);
        const optional = !!ctx._opt;

        const entries: ObjectEntry[] = [];
        const seen = new Set<string>();
        for (const lit of this.stringLiteralMembers(source, ctx.start, file)) {
            if (seen.has(lit)) continue;
            seen.add(lit);
            const inner: Env = new Map(env);
            inner.set(key, { kind: "literal", value: lit, with: {} });
            entries.push({
                key: lit,
                type: this.resolveType(ctx._val, file, inner),
                optional,
            });
        }
        return {
            kind: "object",
            entries,
            indexValue: null,
            patternEntries: [],
            with: {},
        };
    }

    /** The string-literal members of a mapped-type source, or an error when it
     *  is not a finite set of string literals (e.g. `keyof` of an object with
     *  an index signature, which yields `string`). */
    private stringLiteralMembers(t: Type, tok: Token, file: string): string[] {
        const resolved = this.throughRefs(t, tok, file);
        const members =
            resolved.kind === "union" ? resolved.members : [resolved];
        return members.map((m) => {
            const lit = this.throughRefs(m, tok, file);
            if (lit.kind !== "literal" || typeof lit.value !== "string") {
                throw this.fail(
                    "a mapped type source must be a finite set of string literals",
                    file,
                    tok
                );
            }
            return lit.value;
        });
    }

    private resolveTuple(ctx: TupleContext, file: string, env: Env): Type {
        const prefix: Type[] = [];
        const postfix: Type[] = [];
        let rest: Type | null = null;
        let seenRest = false;

        for (const item of ctx._items) {
            if (item instanceof RestContext) {
                if (seenRest) {
                    throw this.fail(
                        "a tuple may have at most one `...rest` element",
                        file,
                        item.start
                    );
                }
                seenRest = true;
                rest = this.resolveType(item.type_(), file, env);
            } else if (item instanceof ItemContext) {
                const t = this.resolveType(item.type_(), file, env);
                (seenRest ? postfix : prefix).push(t);
            }
        }

        if (postfix.length > 0) {
            throw this.fail(
                "elements after a `...rest` element are not supported",
                file,
                ctx.start
            );
        }

        return { kind: "array", prefix, items: rest, postfix: [], with: {} };
    }

    private resolveNamed(
        ctx: NamedTypeContext,
        file: string,
        env: Env
    ): Resolved {
        const nameTok = ctx.ID().symbol;
        const name = nameTok.text;

        const gp: Generic_paramsContext | null = ctx.generic_params();
        const rawArgs: Resolved[] = gp
            ? gp._items.map((t) => this.resolveInner(t, file, env))
            : [];

        if (env.has(name)) {
            if (rawArgs.length > 0) {
                throw this.fail(
                    `type parameter ${name} cannot take type arguments`,
                    file,
                    nameTok
                );
            }
            return env.get(name)!;
        }

        // A generic-argument slot is a frame: `T<expand A | B>` -> `T<A> | T<B>`,
        // and several `expand`s in one application multiply out.
        const choices = rawArgs.map((a) => this.frameMembers(a, nameTok, file));
        const combos = cartesianProduct(choices);
        if (combos.length === 1) {
            return this.instantiateNamed(file, name, combos[0]!, nameTok);
        }
        return this.normalizeUnion(
            combos.map((args) => this.instantiateNamed(file, name, args, nameTok))
        );
    }

    private instantiateNamed(
        file: string,
        name: string,
        args: Type[],
        nameTok: Token
    ): RefType {
        const mod = this.getModule(file);
        if (mod.symbols.has(name)) {
            return this.reference(file, name, args, nameTok, false);
        }
        const imp = mod.imports.get(name);
        if (imp) {
            return this.reference(imp.path, imp.sourceName, args, nameTok, true);
        }
        throw this.fail(`unknown type: ${name}`, file, nameTok);
    }

    // ---- union normalization --------------------------------------------

    private normalizeUnion(members: Type[]): Type {
        const flat: Type[] = [];
        const seen = new Set<string>();
        const add = (t: Type): void => {
            if (t.kind === "union" && isEmptyObject(t.with)) {
                t.members.forEach(add);
                return;
            }
            const key = stableStringify(t);
            if (!seen.has(key)) {
                seen.add(key);
                flat.push(t);
            }
        };
        members.forEach(add);
        if (flat.length === 1) return flat[0]!;
        return { kind: "union", members: flat, with: {} };
    }

    // ---- intersection --------------------------------------------------

    private intersect(a: Type, b: Type, tok: Token, file: string): Type {
        // `T & T` is `T` for any `T`; this also lets two operands share an
        // identical scalar field (`{ id: integer } & { id: integer }`).
        if (stableStringify(a) === stableStringify(b)) return a;
        const oa = this.toObject(a, tok, file);
        const ob = this.toObject(b, tok, file);
        return this.mergeObjects(oa, ob, tok, file);
    }

    /** Reduce a type to the object it contributes to an intersection. */
    private toObject(t: Type, tok: Token, file: string): ObjectType {
        switch (t.kind) {
            case "object":
                return t;
            case "union":
                return this.approximateUnion(t.members, tok, file);
            case "ref": {
                const body = this.bodyOf(t, tok, file);
                const inner = this.toObject(body, tok, file);
                return { ...inner, with: { ...inner.with, ...t.with } };
            }
            default:
                throw this.fail(
                    `intersection requires object types, got ${describe(t)}`,
                    file,
                    tok
                );
        }
    }

    /**
     * Object-approximation of `U | V`: every key any member declares, optional
     * unless present-and-required in every member, typed as the union of the
     * per-member field types.
     */
    private approximateUnion(members: Type[], tok: Token, file: string): ObjectType {
        const objs = members.map((m) => this.toObject(m, tok, file));

        const order: string[] = [];
        const seen = new Set<string>();
        for (const obj of objs) {
            for (const entry of obj.entries) {
                if (!seen.has(entry.key)) {
                    seen.add(entry.key);
                    order.push(entry.key);
                }
            }
        }

        const entries: ObjectEntry[] = order.map((key) => {
            const holders = objs
                .map((obj) => obj.entries.find((e) => e.key === key))
                .filter((e): e is ObjectEntry => e !== undefined);
            return {
                key,
                type: this.normalizeUnion(holders.map((e) => e.type)),
                optional:
                    holders.length !== objs.length || holders.some((e) => e.optional),
            };
        });

        const indexValue = objs.every((obj) => obj.indexValue)
            ? this.normalizeUnion(objs.map((obj) => obj.indexValue!))
            : null;

        // Keep a pattern only where every member declares it.
        const patternEntries: PatternEntry[] = (objs[0]?.patternEntries ?? [])
            .map((p) => p.pattern)
            .filter((pat) =>
                objs.every((obj) => obj.patternEntries.some((p) => p.pattern === pat))
            )
            .map((pat) => ({
                pattern: pat,
                type: this.normalizeUnion(
                    objs.map(
                        (obj) => obj.patternEntries.find((p) => p.pattern === pat)!.type
                    )
                ),
            }));

        return { kind: "object", entries, indexValue, patternEntries, with: {} };
    }

    private mergeObjects(
        a: ObjectType,
        b: ObjectType,
        tok: Token,
        file: string
    ): ObjectType {
        const entries: ObjectEntry[] = a.entries.map((e) => ({ ...e }));
        const indexOf = new Map(entries.map((e, i) => [e.key, i]));

        for (const be of b.entries) {
            const at = indexOf.get(be.key);
            if (at === undefined) {
                indexOf.set(be.key, entries.length);
                entries.push({ ...be });
            } else {
                const existing = entries[at]!;
                entries[at] = {
                    key: be.key,
                    type: this.intersect(existing.type, be.type, tok, file),
                    optional: existing.optional && be.optional, // required if either
                };
            }
        }

        let indexValue: Type | null;
        if (a.indexValue && b.indexValue) {
            indexValue = this.intersect(a.indexValue, b.indexValue, tok, file);
        } else {
            indexValue = a.indexValue ?? b.indexValue;
        }

        const patternEntries: PatternEntry[] = a.patternEntries.map((p) => ({ ...p }));
        const patAt = new Map(patternEntries.map((p, i) => [p.pattern, i]));
        for (const bp of b.patternEntries) {
            const at = patAt.get(bp.pattern);
            if (at === undefined) {
                patAt.set(bp.pattern, patternEntries.length);
                patternEntries.push({ ...bp });
            } else {
                patternEntries[at] = {
                    pattern: bp.pattern,
                    type: this.intersect(patternEntries[at]!.type, bp.type, tok, file),
                };
            }
        }

        return {
            kind: "object",
            entries,
            indexValue,
            patternEntries,
            with: { ...a.with, ...b.with },
        };
    }

    /** Resolve a ref's body now, out of queue order, for an operation that
     *  needs it eagerly (`&`, `keyof`, `T[K]`, `expand`). */
    private bodyOf(ref: RefType, tok: Token, file: string): Type {
        const def = this.defs.get(ref.def)!;
        if (def.status === "done") return def.body!;
        if (this.resolvingBodies.has(def.id)) {
            throw this.fail(
                "a recursive type cannot be used here",
                file,
                tok
            );
        }
        this.resolvingBodies.add(def.id);
        try {
            def.body = this.resolveDefBody(def);
            def.status = "done";
        } finally {
            this.resolvingBodies.delete(def.id);
        }
        return def.body;
    }

    // ---- `with { ... }` -> JSONObject ---------------------------------

    private jsonObject(ctx: Json_objectContext): JSONObject {
        const out: JSONObject = {};
        for (const pair of ctx.json_pair_list()) {
            const key = pair.ID()
                ? pair.ID().symbol.text
                : parseString(pair.STRING().symbol.text);
            out[key] = this.jsonValue(pair.json_value());
        }
        return out;
    }

    private jsonValue(ctx: Json_valueContext): JSONValue {
        if (ctx instanceof JSONStringContext) {
            return parseString(ctx.STRING().symbol.text);
        }
        if (ctx instanceof JSONNumberContext) {
            return Number(ctx.NUM().symbol.text);
        }
        if (ctx instanceof JSONBooleanContext) {
            return ctx.start.text === "true";
        }
        if (ctx instanceof JSONNullContext) {
            return null;
        }
        if (ctx instanceof JSONObjectContext) {
            return this.jsonObject(ctx.json_object());
        }
        if (ctx instanceof JSONArrayContext) {
            return ctx
                .json_arr()
                .json_value_list()
                .map((v) => this.jsonValue(v));
        }
        throw new Error("internal: unhandled JSON value");
    }

    // ---- errors -------------------------------------------------------

    private fail(message: string, file: string, tok: Token): SchemagenError {
        return new SchemagenError(message, file, tok.line, tok.column);
    }

    private failAt(
        message: string,
        file: string,
        tok: Token | null
    ): SchemagenError {
        return tok
            ? new SchemagenError(message, file, tok.line, tok.column)
            : new SchemagenError(message, file, 1, 0);
    }
}

/** Fill in `description` from a doc comment, unless an explicit `with` clause
 *  already set one. */
function describedBy(t: Type, doc: string | null): Type {
    if (doc === null || "description" in t.with) return t;
    return withBag(t, { description: doc });
}

function withBag(base: Type, bag: JSONObject): Type {
    const merged = { ...base.with, ...bag };
    switch (base.kind) {
        case "primitive":
            return { ...base, with: merged };
        case "literal":
            return { ...base, with: merged };
        case "ref":
            return { ...base, with: merged };
        case "union":
            return { ...base, with: merged };
        case "array":
            return { ...base, with: merged };
        case "object":
            return { ...base, with: merged };
    }
}

function describe(t: Type): string {
    switch (t.kind) {
        case "primitive":
            return t.value;
        case "literal":
            return typeof t.value === "string"
                ? JSON.stringify(t.value)
                : String(t.value);
        case "array":
            return "an array";
        case "ref":
            return "a named type";
        case "union":
            return "a union";
        case "object":
            return "an object";
    }
}

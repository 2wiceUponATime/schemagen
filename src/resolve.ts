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

    private resolveType(ctx: TypeContext, file: string, env: Env): Type {
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
            return this.resolveType(ctx.type_(), file, env);
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
            return this.normalizeUnion([
                this.resolveType(ctx._l, file, env),
                this.resolveType(ctx._r, file, env),
            ]);
        }
        if (ctx instanceof IntersectionContext) {
            return this.intersect(
                this.resolveType(ctx._l, file, env),
                this.resolveType(ctx._r, file, env),
                ctx.start,
                file
            );
        }
        if (ctx instanceof ObjectContext) {
            return this.resolveObject(ctx, file, env);
        }
        if (ctx instanceof NamedTypeContext) {
            return this.resolveNamed(ctx, file, env);
        }
        if (ctx instanceof ExpandContext) {
            throw this.fail("`expand` is not supported", file, ctx.start);
        }
        if (ctx instanceof KeyofContext) {
            throw this.fail("`keyof` is not supported", file, ctx.start);
        }
        if (ctx instanceof IndexContext) {
            throw this.fail("indexed access `T[K]` is not supported", file, ctx.start);
        }
        if (ctx instanceof SubscriptContext) {
            throw this.fail("member access `T.x` is not supported", file, ctx.start);
        }
        throw this.fail("unsupported type syntax", file, ctx.start);
    }

    private resolveObject(ctx: ObjectContext, file: string, env: Env): ObjectType {
        const entries: ObjectEntry[] = [];
        const keys = new Set<string>();
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
                    throw this.fail(
                        "pattern properties (`[k matches ...]`) are not supported",
                        file,
                        pair.start
                    );
                }
                if (indexValue) {
                    throw this.fail("multiple index signatures", file, pair.start);
                }
                indexValue = this.resolveType(pair._val, file, env);
                continue;
            }
            if (pair instanceof TypePairContext) {
                throw this.fail(
                    "mapped types (`[K in T]`) are not supported",
                    file,
                    pair.start
                );
            }
            throw this.fail("unsupported object member", file, pair.start);
        }

        return { kind: "object", entries, indexValue, with: {} };
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

    private resolveNamed(ctx: NamedTypeContext, file: string, env: Env): Type {
        const nameTok = ctx.ID().symbol;
        const name = nameTok.text;

        const gp: Generic_paramsContext | null = ctx.generic_params();
        const args: Type[] = gp
            ? gp._items.map((t) => this.resolveType(t, file, env))
            : [];

        if (env.has(name)) {
            if (args.length > 0) {
                throw this.fail(
                    `type parameter ${name} cannot take type arguments`,
                    file,
                    nameTok
                );
            }
            return env.get(name)!;
        }

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

        return { kind: "object", entries, indexValue, with: {} };
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

        return {
            kind: "object",
            entries,
            indexValue,
            with: { ...a.with, ...b.with },
        };
    }

    /** Resolve a ref's body now, out of queue order, for an intersection. */
    private bodyOf(ref: RefType, tok: Token, file: string): Type {
        const def = this.defs.get(ref.def)!;
        if (def.status === "done") return def.body!;
        if (this.resolvingBodies.has(def.id)) {
            throw this.fail(
                "recursive type cannot be used in an intersection",
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

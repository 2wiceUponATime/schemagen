/**
 * The intermediate representation produced by `resolve.ts` and consumed by
 * `emit.ts`.
 *
 * It is a *normalized* form: every semantic step (generic substitution, object
 * intersection, union flattening, cross-file linking) has already happened by
 * the time a `Type` exists here. `emit.ts` does a near-mechanical walk over it
 * and never touches the grammar or the parser.
 *
 * Types are treated as immutable once created; every transform returns a fresh
 * object rather than mutating in place.
 */

export type JSONValue = string | number | boolean | null | JSONValue[] | JSONObject;
export type JSONObject = { [key: string]: JSONValue };

/**
 * Identity of one instantiated definition: `` `${absPath}#${symbol}` `` for a
 * plain def, with a structural key of its type arguments appended when it
 * carries any. The empty string is the symbol name of a file's anonymous
 * default export. Built by `SchemaBuilder`.
 */
export type DefId = string;

export interface TypeBase {
    /** JSON Schema keywords attached via one or more `with { ... }` clauses,
     *  already merged left-to-right. Shallow-assigned over the generated schema
     *  at emit time, so user keys win. */
    with: JSONObject;
}

export interface PrimitiveType extends TypeBase {
    kind: "primitive";
    value: "string" | "number" | "integer" | "boolean" | "null";
}

export interface LiteralType extends TypeBase {
    kind: "literal";
    value: string | number;
}

export interface RefType extends TypeBase {
    kind: "ref";
    def: DefId;
}

/** Flat (no nested `union` member without its own `with`), structurally deduped,
 *  always at least two members. */
export interface UnionType extends TypeBase {
    kind: "union";
    members: Type[];
}

/** `prefix`/`postfix` exist for a future tuple implementation; the current
 *  grammar only ever produces `items`. */
export interface ArrayType extends TypeBase {
    kind: "array";
    prefix: Type[];
    items: Type | null;
    postfix: Type[];
}

export interface ObjectEntry {
    key: string;
    type: Type;
    optional: boolean;
}

export interface ObjectType extends TypeBase {
    kind: "object";
    /** In declaration order. */
    entries: ObjectEntry[];
    /** Value type of a bare index signature `[k]: V`, or null. Emitted as
     *  `additionalProperties`. */
    indexValue: Type | null;
}

export type Type =
    | PrimitiveType
    | LiteralType
    | RefType
    | UnionType
    | ArrayType
    | ObjectType;

export interface Def {
    id: DefId;
    /** Absolute path of the file the symbol lives in. */
    filePath: string;
    /** Symbol name; `""` for the anonymous default export. */
    symbol: string;
    /** Already-resolved type arguments. */
    args: Type[];
    /** Resolved body, or null while still pending. */
    body: Type | null;
    status: "pending" | "done";
    /** Number of references to this def; kept for a future inline-single-use
     *  optimization, unused today. */
    refCount: number;
}

/** Canonical serialization of a JSON-ish value with object keys sorted, used for
 *  structural identity (def keys, union dedup). */
export function stableStringify(v: unknown): string {
    if (v === null || typeof v !== "object") return JSON.stringify(v) ?? "null";
    if (Array.isArray(v)) return `[${v.map(stableStringify).join(",")}]`;
    const keys = Object.keys(v as Record<string, unknown>).sort();
    return `{${keys
        .map((k) => `${JSON.stringify(k)}:${stableStringify((v as Record<string, unknown>)[k])}`)
        .join(",")}}`;
}

export function isEmptyObject(o: JSONObject): boolean {
    return Object.keys(o).length === 0;
}

/**
 * Emission: turn the resolved definition registry into a JSON Schema 2020-12
 * document. Imports only `ir.ts` — no grammar, no resolution logic.
 *
 * Every instantiated definition becomes a `$defs` entry and every `ref` becomes
 * a `#/$defs/<slug>` pointer. Anonymous inline types stay inline. The one
 * shortcut: if the anonymous default export is just a bare ref with no `with`
 * clause, the document `$ref` targets that def directly and no `default` entry
 * is emitted.
 */

import {
    Def,
    DefId,
    JSONObject,
    LiteralType,
    Type,
    isEmptyObject,
} from "./ir";

const DIALECT = "https://json-schema.org/draft/2020-12/schema";

/** Canonical key order within one schema object; anything else (i.e. keys from
 *  a `with` clause) follows in its existing order. */
const KEY_ORDER = [
    "$ref",
    "$schema",
    "type",
    "const",
    "enum",
    "anyOf",
    "prefixItems",
    "items",
    "minItems",
    "maxItems",
    "properties",
    "required",
    "additionalProperties",
];

export function emit(rootDef: DefId, defs: Map<DefId, Def>): JSONObject {
    const root = defs.get(rootDef)!;
    const collapseTarget = bareRefTarget(root);
    const collapsed = collapseTarget !== null && defs.has(collapseTarget);

    // The collapsed root is never emitted, so it must not claim a slug.
    const skip = collapsed ? rootDef : null;
    const slugs = assignSlugs(defs, skip);

    const rootRef = refTo(slugs.get(collapsed ? collapseTarget! : rootDef)!);

    const ids = [...defs.keys()]
        .filter((id) => id !== skip)
        .sort((a, b) => cmp(slugs.get(a)!, slugs.get(b)!));
    const $defs: JSONObject = {};
    for (const id of ids) {
        $defs[slugs.get(id)!] = emitType(defs.get(id)!.body!, slugs);
    }

    return { $schema: DIALECT, $ref: rootRef, $defs };
}

/** Assign each def a `$defs` key: its symbol name (`default` for the anonymous
 *  default), disambiguated `Name`, `Name_2`, ... in registry-insertion order. */
function assignSlugs(
    defs: Map<DefId, Def>,
    skip: DefId | null
): Map<DefId, string> {
    const slugs = new Map<DefId, string>();
    const used = new Set<string>();
    for (const [id, def] of defs) {
        if (id === skip) continue;
        const base = def.symbol === "" ? "default" : def.symbol;
        let slug = base;
        let n = 2;
        while (used.has(slug)) slug = `${base}_${n++}`;
        used.add(slug);
        slugs.set(id, slug);
    }
    return slugs;
}

function bareRefTarget(root: Def): DefId | null {
    const body = root.body;
    if (root.symbol === "" && body && body.kind === "ref" && isEmptyObject(body.with)) {
        return body.def;
    }
    return null;
}

function emitType(t: Type, slugs: Map<DefId, string>): JSONObject {
    let schema: JSONObject;
    switch (t.kind) {
        case "primitive":
            schema = { type: t.value };
            break;
        case "literal":
            schema = { const: t.value };
            break;
        case "ref":
            schema = { $ref: refTo(slugs.get(t.def)!) };
            break;
        case "array": {
            if (t.prefix.length === 0) {
                // Plain list (`T[]`, `[...T]`) or the empty tuple (`[]`).
                schema = t.items
                    ? { type: "array", items: emitType(t.items, slugs) }
                    : { type: "array", maxItems: 0 };
            } else {
                schema = {
                    type: "array",
                    prefixItems: t.prefix.map((x) => emitType(x, slugs)),
                    items: t.items ? emitType(t.items, slugs) : false,
                    minItems: t.prefix.length,
                };
            }
            break;
        }
        case "union":
            schema = t.members.every((m) => m.kind === "literal")
                ? { enum: t.members.map((m) => (m as LiteralType).value) }
                : { anyOf: t.members.map((m) => emitType(m, slugs)) };
            break;
        case "object": {
            const properties: JSONObject = {};
            const required: string[] = [];
            for (const entry of t.entries) {
                properties[entry.key] = emitType(entry.type, slugs);
                if (!entry.optional) required.push(entry.key);
            }
            schema = { type: "object", properties };
            if (required.length > 0) schema.required = required;
            schema.additionalProperties = t.indexValue
                ? emitType(t.indexValue, slugs)
                : false;
            break;
        }
    }
    return orderKeys({ ...schema, ...t.with });
}

function orderKeys(o: JSONObject): JSONObject {
    const out: JSONObject = {};
    for (const key of KEY_ORDER) {
        if (key in o) out[key] = o[key]!;
    }
    for (const key of Object.keys(o)) {
        if (!(key in out)) out[key] = o[key]!;
    }
    return out;
}

function refTo(slug: string): string {
    return `#/$defs/${slug}`;
}

function cmp(a: string, b: string): number {
    return a < b ? -1 : a > b ? 1 : 0;
}

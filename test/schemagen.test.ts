import assert from "node:assert/strict";
import {
    existsSync,
    readFileSync,
    readdirSync,
    writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { emit } from "../src/emit";
import { SchemaBuilder } from "../src/resolve";
import { SchemagenError } from "../src/utils";

const FIXTURES = join(import.meta.dirname, "fixtures");
const UPDATE = !!process.env.UPDATE;

function schemaFor(inputPath: string): unknown {
    const { rootDef, defs } = new SchemaBuilder().build(inputPath);
    return emit(rootDef, defs);
}

for (const name of readdirSync(FIXTURES).sort()) {
    const dir = join(FIXTURES, name);
    const inputPath = join(dir, "input.schemagen");
    if (!existsSync(inputPath)) continue;

    const errorPath = join(dir, "error.txt");
    const expectedPath = join(dir, "expected.json");

    if (existsSync(errorPath)) {
        test(`fixture: ${name} (error)`, () => {
            const needle = readFileSync(errorPath, "utf8").trim();
            assert.throws(
                () => schemaFor(inputPath),
                (err: unknown) => {
                    assert.ok(
                        err instanceof SchemagenError,
                        `expected SchemagenError, got ${String(err)}`
                    );
                    assert.ok(
                        err.message.includes(needle),
                        `expected message to include ${JSON.stringify(needle)}, got ${JSON.stringify(err.message)}`
                    );
                    return true;
                }
            );
        });
        continue;
    }

    test(`fixture: ${name}`, () => {
        const actual = schemaFor(inputPath);
        if (UPDATE) {
            writeFileSync(expectedPath, `${JSON.stringify(actual, null, 2)}\n`);
            return;
        }
        const expected = JSON.parse(readFileSync(expectedPath, "utf8"));
        assert.deepEqual(actual, expected);
    });
}

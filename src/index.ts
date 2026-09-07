import { command, positional, run, string } from "cmd-ts";
import { resolve } from "node:path";
import { emit } from "./emit";
import { SchemaBuilder } from "./resolve";
import { SchemagenError } from "./utils";

const app = command({
    name: "schemagen",
    args: {
        file: positional({ type: string, displayName: "file" }),
    },
    handler: (args) => {
        try {
            const start = resolve(args.file);
            const { rootDef, defs } = new SchemaBuilder().build(start);
            const doc = emit(rootDef, defs);
            process.stdout.write(`${JSON.stringify(doc, null, 2)}\n`);
        } catch (err) {
            if (err instanceof SchemagenError) {
                process.stderr.write(`${err.message}\n`);
                process.exit(1);
            }
            throw err;
        }
    },
});

run(app, process.argv.slice(2));

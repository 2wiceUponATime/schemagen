const SIMPLE_ESCAPES: Record<string, string> = {
    '"': '"',
    "'": "'",
    "\\": "\\",
    "/": "/",
    b: "\b",
    f: "\f",
    n: "\n",
    r: "\r",
    t: "\t",
    v: "\v",
    "0": "\0",
};

const HEX = /^[0-9a-fA-F]+$/;

const LINE_TERMINATOR = /[\n\r\u2028\u2029]/;

function isLineTerminator(c: string | undefined): boolean {
    return c !== undefined && LINE_TERMINATOR.test(c);
}

/**
 * Decode an ANTLR STRING token into its literal value.
 *
 * Trusts the lexer's guarantees: the token opens and closes with a matching
 * quote (`'` or `"`) and every backslash is followed by at least one character.
 * Escape handling mirrors JavaScript/TypeScript string literals; a malformed or
 * unrecognized escape is a compile error.
 */
export function parseString(raw: string): string {
    const body = raw.slice(1, -1);
    let out = "";

    for (let i = 0; i < body.length; i++) {
        const ch = body[i];
        if (ch !== "\\") {
            out += ch;
            continue;
        }

        const next = body[i + 1];

        // Line continuation: a backslash before a line terminator emits nothing.
        if (isLineTerminator(next)) {
            // CRLF is a single terminator.
            i += next === "\r" && body[i + 2] === "\n" ? 2 : 1;
            continue;
        }

        const simple = SIMPLE_ESCAPES[next];
        if (simple !== undefined) {
            out += simple;
            i += 1;
            continue;
        }

        if (next === "x") {
            const hex = body.slice(i + 2, i + 4);
            if (hex.length !== 2 || !HEX.test(hex)) {
                throw new Error(
                    `Invalid hex escape \`\\x${hex}\` in string literal ${raw}`
                );
            }
            out += String.fromCharCode(parseInt(hex, 16));
            i += 3;
            continue;
        }

        if (next === "u") {
            if (body[i + 2] === "{") {
                const end = body.indexOf("}", i + 3);
                const hex = end === -1 ? "" : body.slice(i + 3, end);
                const code =
                    hex.length > 0 && HEX.test(hex) ? parseInt(hex, 16) : NaN;
                if (Number.isNaN(code) || code > 0x10ffff) {
                    const shown = end === -1 ? `\\u{${hex}` : `\\u{${hex}}`;
                    throw new Error(
                        `Invalid unicode escape \`${shown}\` in string literal ${raw}`
                    );
                }
                out += String.fromCodePoint(code);
                i = end; // loop's i++ moves past the closing '}'
                continue;
            }

            const hex = body.slice(i + 2, i + 6);
            if (hex.length !== 4 || !HEX.test(hex)) {
                throw new Error(
                    `Invalid unicode escape \`\\u${hex}\` in string literal ${raw}`
                );
            }
            out += String.fromCharCode(parseInt(hex, 16));
            i += 5;
            continue;
        }

        throw new Error(
            `Invalid escape sequence \`\\${next}\` in string literal ${raw}`
        );
    }

    return out;
}

/**
 * A located compile error. Every failure in loading, resolution, or emission is
 * reported as one of these; `index.ts` catches it, prints `message`, and exits
 * non-zero. Anything else propagates as an internal error.
 *
 * `column` is 0-based (as ANTLR reports it); `message` renders it 1-based.
 */
export class SchemagenError extends Error {
    constructor(
        message: string,
        public readonly file: string,
        public readonly line: number,
        public readonly column: number
    ) {
        super(`${file}:${line}:${column + 1}: ${message}`);
        this.name = "SchemagenError";
    }
}
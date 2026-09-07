/**
 * Parsing and per-file symbol extraction. Owns every interaction with ANTLR;
 * nothing downstream imports the runtime. Produces a {@link LoadedModule} — a
 * raw, un-evaluated view of one source file.
 */

import { CommonTokenStream, ErrorListener, FileStream, type Token } from "antlr4";
import { dirname, resolve } from "node:path";
import ProgramLexer from "./parser/ProgramLexer";
import ProgramParser, {
    DefContext,
    ExportContext,
    ImportContext,
    ImportDefaultContext,
    ImportSymbolsContext,
    type TypeContext,
} from "./parser/ProgramParser";
import { parseString, SchemagenError } from "./utils";

/** A `Foo<A, B> = ...` definition or a file's anonymous `export <type>`. */
export interface RawSymbol {
    /** Name, or `""` for the anonymous default export. */
    name: string;
    /** The unresolved right-hand side. */
    tree: TypeContext;
    /** Declared generic parameter names, in order. */
    params: string[];
    /** Whether the def is `export`-marked (always true for the default). */
    exported: boolean;
    /** Cleaned text of an attached doc comment (line or block form), or null. */
    doc: string | null;
    /** Token to blame for errors about this symbol. */
    token: Token;
}

/** One binding introduced by an `import` statement. */
export interface RawImport {
    /** Local name it is bound to in this file. */
    local: string;
    /** Absolute path of the file it comes from. */
    path: string;
    /** Name to look up in that file; `""` for its default export. */
    sourceName: string;
    token: Token;
}

export interface LoadedModule {
    path: string;
    /** Named definitions, keyed by name. */
    symbols: Map<string, RawSymbol>;
    /** Import bindings, keyed by local name. */
    imports: Map<string, RawImport>;
    /** The anonymous `export <type>`, or null if the file has none. */
    default: RawSymbol | null;
    /** Cleaned doc comment attached immediately above `token`, or null. Used by
     *  the resolver for object properties. */
    docFor(token: Token): string | null;
}

// One instance serves both the lexer (`ErrorListener<number>`) and the parser
// (`ErrorListener<Token>`); the offending symbol is ignored either way.
class ThrowingErrorListener extends ErrorListener<Token> {
    constructor(private readonly path: string) {
        super();
    }
    override syntaxError(
        _recognizer: unknown,
        _offendingSymbol: unknown,
        line: number,
        column: number,
        msg: string
    ): void {
        throw new SchemagenError(`syntax error: ${msg}`, this.path, line, column);
    }
}

const DOC_LINE = ProgramLexer.DOC_LINE_COMMENT;
const DOC_BLOCK = ProgramLexer.DOC_BLOCK_COMMENT;

function newlineCount(text: string): number {
    return (text.match(/\r\n|\r|\n/g) ?? []).length;
}

function cleanDoc(token: Token): string {
    if (token.type === DOC_LINE) {
        // `/// text` — no line terminators in the token.
        return token.text.slice(3).replace(/^ /, "").trimEnd();
    }
    // `/** ... */`
    const body = token.text.slice(3, -2);
    const lines = body
        .split(/\r\n|\r|\n/)
        .map((line) => line.replace(/^\s*\*? ?/, "").trimEnd());
    while (lines.length > 0 && lines[0] === "") lines.shift();
    while (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
    return lines.join("\n");
}

/**
 * The run of doc-comment tokens sitting directly above the token at
 * `startIndex`, with no blank line between them or before the node.
 */
function docAbove(tokens: Token[], startIndex: number): string | null {
    const parts: string[] = [];
    let nextLine = tokens[startIndex]?.line ?? 0;
    for (let i = startIndex - 1; i >= 0; i--) {
        const tk = tokens[i]!;
        if (tk.type !== DOC_LINE && tk.type !== DOC_BLOCK) break;
        const endLine = tk.line + newlineCount(tk.text);
        if (nextLine - endLine > 1) break;
        parts.push(cleanDoc(tk));
        nextLine = tk.line;
    }
    if (parts.length === 0) return null;
    return parts.reverse().join("\n");
}

export function loadModule(path: string): LoadedModule {
    const listener = new ThrowingErrorListener(path);

    const lexer = new ProgramLexer(new FileStream(path));
    lexer.removeErrorListeners();
    lexer.addErrorListener(listener as unknown as ErrorListener<number>);

    const tokenStream = new CommonTokenStream(lexer);
    const parser = new ProgramParser(tokenStream);
    parser.removeErrorListeners();
    parser.addErrorListener(listener);

    const tree = parser.program();
    const dir = dirname(path);

    // After a full parse the buffer holds every token, hidden ones included.
    const allTokens = (tokenStream as unknown as { tokens: Token[] }).tokens;
    const docFor = (token: Token): string | null =>
        docAbove(allTokens, token.tokenIndex);

    const symbols = new Map<string, RawSymbol>();
    const imports = new Map<string, RawImport>();
    let defaultSymbol: RawSymbol | null = null;

    const claim = (name: string, token: Token): void => {
        if (symbols.has(name) || imports.has(name)) {
            throw new SchemagenError(
                `duplicate symbol: ${name}`,
                path,
                token.line,
                token.column
            );
        }
    };

    for (const stmt of tree._stmts) {
        if (stmt instanceof DefContext) {
            const name = stmt._name.text;
            claim(name, stmt._name);
            symbols.set(name, {
                name,
                tree: stmt._val,
                params: stmt._params.map((p) => p.text),
                exported: !!stmt._export_,
                doc: docFor(stmt.start),
                token: stmt._name,
            });
            continue;
        }

        if (stmt instanceof ExportContext) {
            if (defaultSymbol !== null) {
                throw new SchemagenError(
                    "multiple default exports",
                    path,
                    stmt.start.line,
                    stmt.start.column
                );
            }
            defaultSymbol = {
                name: "",
                tree: stmt._val,
                params: [],
                exported: true,
                doc: docFor(stmt.start),
                token: stmt.start,
            };
            continue;
        }

        if (stmt instanceof ImportContext) {
            const importPath = resolve(dir, parseString(stmt._path.text));
            const body = stmt._body;

            if (body instanceof ImportDefaultContext) {
                const local = body._item.text;
                claim(local, body._item);
                imports.set(local, {
                    local,
                    path: importPath,
                    sourceName: "",
                    token: body._item,
                });
            } else if (body instanceof ImportSymbolsContext) {
                for (const alias of body._items) {
                    const localToken = alias._as_ ?? alias._name;
                    const local = localToken.text;
                    claim(local, localToken);
                    imports.set(local, {
                        local,
                        path: importPath,
                        sourceName: alias._name.text,
                        token: localToken,
                    });
                }
            }
        }
    }

    return { path, symbols, imports, default: defaultSymbol, docFor };
}

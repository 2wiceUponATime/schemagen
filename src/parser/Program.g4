grammar Program;

EXPORT: 'export';
EXPAND: 'expand';
KEYOF : 'keyof' ;
IMPORT: 'import';
FROM  : 'from'  ;
NULL: 'null';
PRIMITIVE: 'string' | 'number' | 'integer' | 'boolean';


fragment INT: [0-9]+;
fragment FLOAT
    : INT  '.' INT?
    | INT? '.' INT;
fragment EXP: [Ee] [+-]? INT;

NUM: '-'? (INT | FLOAT) EXP?;
ID: [a-zA-Z$_][a-zA-Z0-9$_]*;
STRING
    : '\'' (~['\\] | '\\' .)* '\''
    | '"'  (~["\\] | '\\' .)* '"';

DOC_LINE_COMMENT : '///' ~[\r\n]* -> channel(HIDDEN);
DOC_BLOCK_COMMENT: '/**' .*? '*/' -> channel(HIDDEN);

WS: [ \t\r\n] -> skip;
LINE_COMMENT : '//' ~[\r\n]* -> skip;
BLOCK_COMMENT: '/*' .*? '*/' -> skip;

program: (stmts+=statement ';'?)* EOF;
statement
    : export=EXPORT? name=ID ('<' params+=ID (',' params+=ID)* '>')? '=' val=type # Def
    | IMPORT body=import_body FROM path=STRING                                    # Import
    | EXPORT val=type                                                             # Export;

import_body
    : item=ID                                     # ImportDefault
    | '{' (items+=alias (',' items+=alias)*)? '}' # ImportSymbols;

alias: name=ID ('as' as=ID)?;

generic_params: items+=type (',' items+=type)*;

type
    : val=(PRIMITIVE | NULL)                         # Primitive
    | val=NUM                                        # Number
    | val=STRING                                     # String
    | '{' (items+=pair (';' items+=pair)* ';'?)? '}' # Object
    | tuple                                          # TupleType
    | ID ('<' generic_params '>')?                   # NamedType
    | '(' type ')'                                   # Parens
    | type '[' ']'                                   # List
    | val=type '[' key=type ']'                      # Index
    | type '.' member=ID                             # Subscript
    | type 'with' json_object                        # With
    | KEYOF type                                     # Keyof
    | EXPAND type                                    # Expand
    | l=type '&' r=type                              # Intersection
    | l=type '|' r=type                              # Union;

tuple: '[' (items+=tuple_item (',' items+=tuple_item)* ','?)? ']';

tuple_item
    : type       # Item
    | '...' type # Rest;

pair
    : key=(ID | STRING) optional='?'?         ':' val=type # StringPair
    | '[' name=ID 'in' type ']' opt='?'?      ':' val=type # TypePair
    | '[' name=ID ('matches' match=type)? ']' ':' val=type # PatternPair;

json_value
    : STRING             # JSONString
    | NUM                # JSONNumber
    | json_object        # JSONObject
    | json_arr           # JSONArray
    | ('true' | 'false') # JSONBoolean
    | NULL               # JSONNull;

json_object: '{' json_pair (';' json_pair)* '}';

json_pair: key=(ID | STRING) ':' json_value;

json_arr: '[' (json_value (',' json_value)* ','?)? ']';

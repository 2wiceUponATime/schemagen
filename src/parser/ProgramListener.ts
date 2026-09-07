// Generated from Program.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


import { ProgramContext } from "./ProgramParser.js";
import { DefContext } from "./ProgramParser.js";
import { ImportContext } from "./ProgramParser.js";
import { ExportContext } from "./ProgramParser.js";
import { ImportDefaultContext } from "./ProgramParser.js";
import { ImportSymbolsContext } from "./ProgramParser.js";
import { AliasContext } from "./ProgramParser.js";
import { Generic_paramsContext } from "./ProgramParser.js";
import { IntersectionContext } from "./ProgramParser.js";
import { NamedTypeContext } from "./ProgramParser.js";
import { ParensContext } from "./ProgramParser.js";
import { KeyofContext } from "./ProgramParser.js";
import { IndexContext } from "./ProgramParser.js";
import { SubscriptContext } from "./ProgramParser.js";
import { StringContext } from "./ProgramParser.js";
import { UnionContext } from "./ProgramParser.js";
import { WithContext } from "./ProgramParser.js";
import { PrimitiveContext } from "./ProgramParser.js";
import { NumberContext } from "./ProgramParser.js";
import { ExpandContext } from "./ProgramParser.js";
import { TupleTypeContext } from "./ProgramParser.js";
import { ObjectContext } from "./ProgramParser.js";
import { ListContext } from "./ProgramParser.js";
import { TupleContext } from "./ProgramParser.js";
import { ItemContext } from "./ProgramParser.js";
import { RestContext } from "./ProgramParser.js";
import { StringPairContext } from "./ProgramParser.js";
import { TypePairContext } from "./ProgramParser.js";
import { PatternPairContext } from "./ProgramParser.js";
import { JSONStringContext } from "./ProgramParser.js";
import { JSONNumberContext } from "./ProgramParser.js";
import { JSONObjectContext } from "./ProgramParser.js";
import { JSONArrayContext } from "./ProgramParser.js";
import { JSONBooleanContext } from "./ProgramParser.js";
import { JSONNullContext } from "./ProgramParser.js";
import { Json_objectContext } from "./ProgramParser.js";
import { Json_pairContext } from "./ProgramParser.js";
import { Json_arrContext } from "./ProgramParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ProgramParser`.
 */
export default class ProgramListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `ProgramParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `ProgramParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;
	/**
	 * Enter a parse tree produced by the `Def`
	 * labeled alternative in `ProgramParser.statement`.
	 * @param ctx the parse tree
	 */
	enterDef?: (ctx: DefContext) => void;
	/**
	 * Exit a parse tree produced by the `Def`
	 * labeled alternative in `ProgramParser.statement`.
	 * @param ctx the parse tree
	 */
	exitDef?: (ctx: DefContext) => void;
	/**
	 * Enter a parse tree produced by the `Import`
	 * labeled alternative in `ProgramParser.statement`.
	 * @param ctx the parse tree
	 */
	enterImport?: (ctx: ImportContext) => void;
	/**
	 * Exit a parse tree produced by the `Import`
	 * labeled alternative in `ProgramParser.statement`.
	 * @param ctx the parse tree
	 */
	exitImport?: (ctx: ImportContext) => void;
	/**
	 * Enter a parse tree produced by the `Export`
	 * labeled alternative in `ProgramParser.statement`.
	 * @param ctx the parse tree
	 */
	enterExport?: (ctx: ExportContext) => void;
	/**
	 * Exit a parse tree produced by the `Export`
	 * labeled alternative in `ProgramParser.statement`.
	 * @param ctx the parse tree
	 */
	exitExport?: (ctx: ExportContext) => void;
	/**
	 * Enter a parse tree produced by the `ImportDefault`
	 * labeled alternative in `ProgramParser.import_body`.
	 * @param ctx the parse tree
	 */
	enterImportDefault?: (ctx: ImportDefaultContext) => void;
	/**
	 * Exit a parse tree produced by the `ImportDefault`
	 * labeled alternative in `ProgramParser.import_body`.
	 * @param ctx the parse tree
	 */
	exitImportDefault?: (ctx: ImportDefaultContext) => void;
	/**
	 * Enter a parse tree produced by the `ImportSymbols`
	 * labeled alternative in `ProgramParser.import_body`.
	 * @param ctx the parse tree
	 */
	enterImportSymbols?: (ctx: ImportSymbolsContext) => void;
	/**
	 * Exit a parse tree produced by the `ImportSymbols`
	 * labeled alternative in `ProgramParser.import_body`.
	 * @param ctx the parse tree
	 */
	exitImportSymbols?: (ctx: ImportSymbolsContext) => void;
	/**
	 * Enter a parse tree produced by `ProgramParser.alias`.
	 * @param ctx the parse tree
	 */
	enterAlias?: (ctx: AliasContext) => void;
	/**
	 * Exit a parse tree produced by `ProgramParser.alias`.
	 * @param ctx the parse tree
	 */
	exitAlias?: (ctx: AliasContext) => void;
	/**
	 * Enter a parse tree produced by `ProgramParser.generic_params`.
	 * @param ctx the parse tree
	 */
	enterGeneric_params?: (ctx: Generic_paramsContext) => void;
	/**
	 * Exit a parse tree produced by `ProgramParser.generic_params`.
	 * @param ctx the parse tree
	 */
	exitGeneric_params?: (ctx: Generic_paramsContext) => void;
	/**
	 * Enter a parse tree produced by the `Intersection`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	enterIntersection?: (ctx: IntersectionContext) => void;
	/**
	 * Exit a parse tree produced by the `Intersection`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	exitIntersection?: (ctx: IntersectionContext) => void;
	/**
	 * Enter a parse tree produced by the `NamedType`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	enterNamedType?: (ctx: NamedTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `NamedType`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	exitNamedType?: (ctx: NamedTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `Parens`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	enterParens?: (ctx: ParensContext) => void;
	/**
	 * Exit a parse tree produced by the `Parens`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	exitParens?: (ctx: ParensContext) => void;
	/**
	 * Enter a parse tree produced by the `Keyof`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	enterKeyof?: (ctx: KeyofContext) => void;
	/**
	 * Exit a parse tree produced by the `Keyof`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	exitKeyof?: (ctx: KeyofContext) => void;
	/**
	 * Enter a parse tree produced by the `Index`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	enterIndex?: (ctx: IndexContext) => void;
	/**
	 * Exit a parse tree produced by the `Index`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	exitIndex?: (ctx: IndexContext) => void;
	/**
	 * Enter a parse tree produced by the `Subscript`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	enterSubscript?: (ctx: SubscriptContext) => void;
	/**
	 * Exit a parse tree produced by the `Subscript`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	exitSubscript?: (ctx: SubscriptContext) => void;
	/**
	 * Enter a parse tree produced by the `String`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	enterString?: (ctx: StringContext) => void;
	/**
	 * Exit a parse tree produced by the `String`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	exitString?: (ctx: StringContext) => void;
	/**
	 * Enter a parse tree produced by the `Union`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	enterUnion?: (ctx: UnionContext) => void;
	/**
	 * Exit a parse tree produced by the `Union`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	exitUnion?: (ctx: UnionContext) => void;
	/**
	 * Enter a parse tree produced by the `With`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	enterWith?: (ctx: WithContext) => void;
	/**
	 * Exit a parse tree produced by the `With`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	exitWith?: (ctx: WithContext) => void;
	/**
	 * Enter a parse tree produced by the `Primitive`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	enterPrimitive?: (ctx: PrimitiveContext) => void;
	/**
	 * Exit a parse tree produced by the `Primitive`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	exitPrimitive?: (ctx: PrimitiveContext) => void;
	/**
	 * Enter a parse tree produced by the `Number`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	enterNumber?: (ctx: NumberContext) => void;
	/**
	 * Exit a parse tree produced by the `Number`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	exitNumber?: (ctx: NumberContext) => void;
	/**
	 * Enter a parse tree produced by the `Expand`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	enterExpand?: (ctx: ExpandContext) => void;
	/**
	 * Exit a parse tree produced by the `Expand`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	exitExpand?: (ctx: ExpandContext) => void;
	/**
	 * Enter a parse tree produced by the `TupleType`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	enterTupleType?: (ctx: TupleTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `TupleType`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	exitTupleType?: (ctx: TupleTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `Object`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	enterObject?: (ctx: ObjectContext) => void;
	/**
	 * Exit a parse tree produced by the `Object`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	exitObject?: (ctx: ObjectContext) => void;
	/**
	 * Enter a parse tree produced by the `List`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	enterList?: (ctx: ListContext) => void;
	/**
	 * Exit a parse tree produced by the `List`
	 * labeled alternative in `ProgramParser.type`.
	 * @param ctx the parse tree
	 */
	exitList?: (ctx: ListContext) => void;
	/**
	 * Enter a parse tree produced by `ProgramParser.tuple`.
	 * @param ctx the parse tree
	 */
	enterTuple?: (ctx: TupleContext) => void;
	/**
	 * Exit a parse tree produced by `ProgramParser.tuple`.
	 * @param ctx the parse tree
	 */
	exitTuple?: (ctx: TupleContext) => void;
	/**
	 * Enter a parse tree produced by the `Item`
	 * labeled alternative in `ProgramParser.tuple_item`.
	 * @param ctx the parse tree
	 */
	enterItem?: (ctx: ItemContext) => void;
	/**
	 * Exit a parse tree produced by the `Item`
	 * labeled alternative in `ProgramParser.tuple_item`.
	 * @param ctx the parse tree
	 */
	exitItem?: (ctx: ItemContext) => void;
	/**
	 * Enter a parse tree produced by the `Rest`
	 * labeled alternative in `ProgramParser.tuple_item`.
	 * @param ctx the parse tree
	 */
	enterRest?: (ctx: RestContext) => void;
	/**
	 * Exit a parse tree produced by the `Rest`
	 * labeled alternative in `ProgramParser.tuple_item`.
	 * @param ctx the parse tree
	 */
	exitRest?: (ctx: RestContext) => void;
	/**
	 * Enter a parse tree produced by the `StringPair`
	 * labeled alternative in `ProgramParser.pair`.
	 * @param ctx the parse tree
	 */
	enterStringPair?: (ctx: StringPairContext) => void;
	/**
	 * Exit a parse tree produced by the `StringPair`
	 * labeled alternative in `ProgramParser.pair`.
	 * @param ctx the parse tree
	 */
	exitStringPair?: (ctx: StringPairContext) => void;
	/**
	 * Enter a parse tree produced by the `TypePair`
	 * labeled alternative in `ProgramParser.pair`.
	 * @param ctx the parse tree
	 */
	enterTypePair?: (ctx: TypePairContext) => void;
	/**
	 * Exit a parse tree produced by the `TypePair`
	 * labeled alternative in `ProgramParser.pair`.
	 * @param ctx the parse tree
	 */
	exitTypePair?: (ctx: TypePairContext) => void;
	/**
	 * Enter a parse tree produced by the `PatternPair`
	 * labeled alternative in `ProgramParser.pair`.
	 * @param ctx the parse tree
	 */
	enterPatternPair?: (ctx: PatternPairContext) => void;
	/**
	 * Exit a parse tree produced by the `PatternPair`
	 * labeled alternative in `ProgramParser.pair`.
	 * @param ctx the parse tree
	 */
	exitPatternPair?: (ctx: PatternPairContext) => void;
	/**
	 * Enter a parse tree produced by the `JSONString`
	 * labeled alternative in `ProgramParser.json_value`.
	 * @param ctx the parse tree
	 */
	enterJSONString?: (ctx: JSONStringContext) => void;
	/**
	 * Exit a parse tree produced by the `JSONString`
	 * labeled alternative in `ProgramParser.json_value`.
	 * @param ctx the parse tree
	 */
	exitJSONString?: (ctx: JSONStringContext) => void;
	/**
	 * Enter a parse tree produced by the `JSONNumber`
	 * labeled alternative in `ProgramParser.json_value`.
	 * @param ctx the parse tree
	 */
	enterJSONNumber?: (ctx: JSONNumberContext) => void;
	/**
	 * Exit a parse tree produced by the `JSONNumber`
	 * labeled alternative in `ProgramParser.json_value`.
	 * @param ctx the parse tree
	 */
	exitJSONNumber?: (ctx: JSONNumberContext) => void;
	/**
	 * Enter a parse tree produced by the `JSONObject`
	 * labeled alternative in `ProgramParser.json_value`.
	 * @param ctx the parse tree
	 */
	enterJSONObject?: (ctx: JSONObjectContext) => void;
	/**
	 * Exit a parse tree produced by the `JSONObject`
	 * labeled alternative in `ProgramParser.json_value`.
	 * @param ctx the parse tree
	 */
	exitJSONObject?: (ctx: JSONObjectContext) => void;
	/**
	 * Enter a parse tree produced by the `JSONArray`
	 * labeled alternative in `ProgramParser.json_value`.
	 * @param ctx the parse tree
	 */
	enterJSONArray?: (ctx: JSONArrayContext) => void;
	/**
	 * Exit a parse tree produced by the `JSONArray`
	 * labeled alternative in `ProgramParser.json_value`.
	 * @param ctx the parse tree
	 */
	exitJSONArray?: (ctx: JSONArrayContext) => void;
	/**
	 * Enter a parse tree produced by the `JSONBoolean`
	 * labeled alternative in `ProgramParser.json_value`.
	 * @param ctx the parse tree
	 */
	enterJSONBoolean?: (ctx: JSONBooleanContext) => void;
	/**
	 * Exit a parse tree produced by the `JSONBoolean`
	 * labeled alternative in `ProgramParser.json_value`.
	 * @param ctx the parse tree
	 */
	exitJSONBoolean?: (ctx: JSONBooleanContext) => void;
	/**
	 * Enter a parse tree produced by the `JSONNull`
	 * labeled alternative in `ProgramParser.json_value`.
	 * @param ctx the parse tree
	 */
	enterJSONNull?: (ctx: JSONNullContext) => void;
	/**
	 * Exit a parse tree produced by the `JSONNull`
	 * labeled alternative in `ProgramParser.json_value`.
	 * @param ctx the parse tree
	 */
	exitJSONNull?: (ctx: JSONNullContext) => void;
	/**
	 * Enter a parse tree produced by `ProgramParser.json_object`.
	 * @param ctx the parse tree
	 */
	enterJson_object?: (ctx: Json_objectContext) => void;
	/**
	 * Exit a parse tree produced by `ProgramParser.json_object`.
	 * @param ctx the parse tree
	 */
	exitJson_object?: (ctx: Json_objectContext) => void;
	/**
	 * Enter a parse tree produced by `ProgramParser.json_pair`.
	 * @param ctx the parse tree
	 */
	enterJson_pair?: (ctx: Json_pairContext) => void;
	/**
	 * Exit a parse tree produced by `ProgramParser.json_pair`.
	 * @param ctx the parse tree
	 */
	exitJson_pair?: (ctx: Json_pairContext) => void;
	/**
	 * Enter a parse tree produced by `ProgramParser.json_arr`.
	 * @param ctx the parse tree
	 */
	enterJson_arr?: (ctx: Json_arrContext) => void;
	/**
	 * Exit a parse tree produced by `ProgramParser.json_arr`.
	 * @param ctx the parse tree
	 */
	exitJson_arr?: (ctx: Json_arrContext) => void;
}


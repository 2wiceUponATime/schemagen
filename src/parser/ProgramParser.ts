// Generated from Program.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import ProgramListener from "./ProgramListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class ProgramParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly EXPORT = 24;
	public static readonly EXPAND = 25;
	public static readonly KEYOF = 26;
	public static readonly IMPORT = 27;
	public static readonly FROM = 28;
	public static readonly NULL = 29;
	public static readonly PRIMITIVE = 30;
	public static readonly NUM = 31;
	public static readonly ID = 32;
	public static readonly STRING = 33;
	public static readonly DOC_LINE_COMMENT = 34;
	public static readonly DOC_BLOCK_COMMENT = 35;
	public static readonly WS = 36;
	public static readonly LINE_COMMENT = 37;
	public static readonly BLOCK_COMMENT = 38;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_program = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_import_body = 2;
	public static readonly RULE_alias = 3;
	public static readonly RULE_generic_params = 4;
	public static readonly RULE_type = 5;
	public static readonly RULE_tuple = 6;
	public static readonly RULE_tuple_item = 7;
	public static readonly RULE_pair = 8;
	public static readonly RULE_json_value = 9;
	public static readonly RULE_json_object = 10;
	public static readonly RULE_json_pair = 11;
	public static readonly RULE_json_arr = 12;
	public static readonly literalNames: (string | null)[] = [ null, "';'", 
                                                            "'<'", "','", 
                                                            "'>'", "'='", 
                                                            "'{'", "'}'", 
                                                            "'as'", "'('", 
                                                            "')'", "'['", 
                                                            "']'", "'.'", 
                                                            "'with'", "'&'", 
                                                            "'|'", "'...'", 
                                                            "'?'", "':'", 
                                                            "'in'", "'matches'", 
                                                            "'true'", "'false'", 
                                                            "'export'", 
                                                            "'expand'", 
                                                            "'keyof'", "'import'", 
                                                            "'from'", "'null'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "EXPORT", "EXPAND", 
                                                             "KEYOF", "IMPORT", 
                                                             "FROM", "NULL", 
                                                             "PRIMITIVE", 
                                                             "NUM", "ID", 
                                                             "STRING", "DOC_LINE_COMMENT", 
                                                             "DOC_BLOCK_COMMENT", 
                                                             "WS", "LINE_COMMENT", 
                                                             "BLOCK_COMMENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "statement", "import_body", "alias", "generic_params", "type", 
		"tuple", "tuple_item", "pair", "json_value", "json_object", "json_pair", 
		"json_arr",
	];
	public get grammarFileName(): string { return "Program.g4"; }
	public get literalNames(): (string | null)[] { return ProgramParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return ProgramParser.symbolicNames; }
	public get ruleNames(): string[] { return ProgramParser.ruleNames; }
	public get serializedATN(): number[] { return ProgramParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, ProgramParser._ATN, ProgramParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let localctx: ProgramContext = new ProgramContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, ProgramParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 32;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 24)) & ~0x1F) === 0 && ((1 << (_la - 24)) & 265) !== 0)) {
				{
				{
				this.state = 26;
				localctx._statement = this.statement();
				localctx._stmts.push(localctx._statement);
				this.state = 28;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===1) {
					{
					this.state = 27;
					this.match(ProgramParser.T__0);
					}
				}

				}
				}
				this.state = 34;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 35;
			this.match(ProgramParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let localctx: StatementContext = new StatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, ProgramParser.RULE_statement);
		let _la: number;
		try {
			this.state = 62;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 5, this._ctx) ) {
			case 1:
				localctx = new DefContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 38;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===24) {
					{
					this.state = 37;
					(localctx as DefContext)._export_ = this.match(ProgramParser.EXPORT);
					}
				}

				this.state = 40;
				(localctx as DefContext)._name = this.match(ProgramParser.ID);
				this.state = 51;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===2) {
					{
					this.state = 41;
					this.match(ProgramParser.T__1);
					this.state = 42;
					(localctx as DefContext)._ID = this.match(ProgramParser.ID);
					(localctx as DefContext)._params.push((localctx as DefContext)._ID);
					this.state = 47;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===3) {
						{
						{
						this.state = 43;
						this.match(ProgramParser.T__2);
						this.state = 44;
						(localctx as DefContext)._ID = this.match(ProgramParser.ID);
						(localctx as DefContext)._params.push((localctx as DefContext)._ID);
						}
						}
						this.state = 49;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 50;
					this.match(ProgramParser.T__3);
					}
				}

				this.state = 53;
				this.match(ProgramParser.T__4);
				this.state = 54;
				(localctx as DefContext)._val = this.type_(0);
				}
				break;
			case 2:
				localctx = new ImportContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 55;
				this.match(ProgramParser.IMPORT);
				this.state = 56;
				(localctx as ImportContext)._body = this.import_body();
				this.state = 57;
				this.match(ProgramParser.FROM);
				this.state = 58;
				(localctx as ImportContext)._path = this.match(ProgramParser.STRING);
				}
				break;
			case 3:
				localctx = new ExportContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 60;
				this.match(ProgramParser.EXPORT);
				this.state = 61;
				(localctx as ExportContext)._val = this.type_(0);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public import_body(): Import_bodyContext {
		let localctx: Import_bodyContext = new Import_bodyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, ProgramParser.RULE_import_body);
		let _la: number;
		try {
			this.state = 77;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 32:
				localctx = new ImportDefaultContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 64;
				(localctx as ImportDefaultContext)._item = this.match(ProgramParser.ID);
				}
				break;
			case 6:
				localctx = new ImportSymbolsContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 65;
				this.match(ProgramParser.T__5);
				this.state = 74;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===32) {
					{
					this.state = 66;
					(localctx as ImportSymbolsContext)._alias = this.alias();
					(localctx as ImportSymbolsContext)._items.push((localctx as ImportSymbolsContext)._alias);
					this.state = 71;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===3) {
						{
						{
						this.state = 67;
						this.match(ProgramParser.T__2);
						this.state = 68;
						(localctx as ImportSymbolsContext)._alias = this.alias();
						(localctx as ImportSymbolsContext)._items.push((localctx as ImportSymbolsContext)._alias);
						}
						}
						this.state = 73;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 76;
				this.match(ProgramParser.T__6);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public alias(): AliasContext {
		let localctx: AliasContext = new AliasContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, ProgramParser.RULE_alias);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 79;
			localctx._name = this.match(ProgramParser.ID);
			this.state = 82;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===8) {
				{
				this.state = 80;
				this.match(ProgramParser.T__7);
				this.state = 81;
				localctx._as_ = this.match(ProgramParser.ID);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public generic_params(): Generic_paramsContext {
		let localctx: Generic_paramsContext = new Generic_paramsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, ProgramParser.RULE_generic_params);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 84;
			localctx._type_ = this.type_(0);
			localctx._items.push(localctx._type_);
			this.state = 89;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===3) {
				{
				{
				this.state = 85;
				this.match(ProgramParser.T__2);
				this.state = 86;
				localctx._type_ = this.type_(0);
				localctx._items.push(localctx._type_);
				}
				}
				this.state = 91;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public type_(): TypeContext;
	public type_(_p: number): TypeContext;
	// @RuleVersion(0)
	public type_(_p?: number): TypeContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: TypeContext = new TypeContext(this, this._ctx, _parentState);
		let _prevctx: TypeContext = localctx;
		let _startState: number = 10;
		this.enterRecursionRule(localctx, 10, ProgramParser.RULE_type, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 127;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 29:
			case 30:
				{
				localctx = new PrimitiveContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 93;
				(localctx as PrimitiveContext)._val = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===29 || _la===30)) {
				    (localctx as PrimitiveContext)._val = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 31:
				{
				localctx = new NumberContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 94;
				(localctx as NumberContext)._val = this.match(ProgramParser.NUM);
				}
				break;
			case 33:
				{
				localctx = new StringContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 95;
				(localctx as StringContext)._val = this.match(ProgramParser.STRING);
				}
				break;
			case 6:
				{
				localctx = new ObjectContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 96;
				this.match(ProgramParser.T__5);
				this.state = 108;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 11)) & ~0x1F) === 0 && ((1 << (_la - 11)) & 6291457) !== 0)) {
					{
					this.state = 97;
					(localctx as ObjectContext)._pair = this.pair();
					(localctx as ObjectContext)._items.push((localctx as ObjectContext)._pair);
					this.state = 102;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
					while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
						if (_alt === 1) {
							{
							{
							this.state = 98;
							this.match(ProgramParser.T__0);
							this.state = 99;
							(localctx as ObjectContext)._pair = this.pair();
							(localctx as ObjectContext)._items.push((localctx as ObjectContext)._pair);
							}
							}
						}
						this.state = 104;
						this._errHandler.sync(this);
						_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
					}
					this.state = 106;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la===1) {
						{
						this.state = 105;
						this.match(ProgramParser.T__0);
						}
					}

					}
				}

				this.state = 110;
				this.match(ProgramParser.T__6);
				}
				break;
			case 11:
				{
				localctx = new TupleTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 111;
				this.tuple();
				}
				break;
			case 32:
				{
				localctx = new NamedTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 112;
				this.match(ProgramParser.ID);
				this.state = 117;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 14, this._ctx) ) {
				case 1:
					{
					this.state = 113;
					this.match(ProgramParser.T__1);
					this.state = 114;
					this.generic_params();
					this.state = 115;
					this.match(ProgramParser.T__3);
					}
					break;
				}
				}
				break;
			case 9:
				{
				localctx = new ParensContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 119;
				this.match(ProgramParser.T__8);
				this.state = 120;
				this.type_(0);
				this.state = 121;
				this.match(ProgramParser.T__9);
				}
				break;
			case 26:
				{
				localctx = new KeyofContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 123;
				this.match(ProgramParser.KEYOF);
				this.state = 124;
				this.type_(4);
				}
				break;
			case 25:
				{
				localctx = new ExpandContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 125;
				this.match(ProgramParser.EXPAND);
				this.state = 126;
				this.type_(3);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 154;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 18, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 152;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 17, this._ctx) ) {
					case 1:
						{
						localctx = new IntersectionContext(this, new TypeContext(this, _parentctx, _parentState));
						(localctx as IntersectionContext)._l = _prevctx;
						this.pushNewRecursionContext(localctx, _startState, ProgramParser.RULE_type);
						this.state = 129;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 130;
						this.match(ProgramParser.T__14);
						this.state = 131;
						(localctx as IntersectionContext)._r = this.type_(3);
						}
						break;
					case 2:
						{
						localctx = new UnionContext(this, new TypeContext(this, _parentctx, _parentState));
						(localctx as UnionContext)._l = _prevctx;
						this.pushNewRecursionContext(localctx, _startState, ProgramParser.RULE_type);
						this.state = 132;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 133;
						this.match(ProgramParser.T__15);
						this.state = 134;
						(localctx as UnionContext)._r = this.type_(2);
						}
						break;
					case 3:
						{
						localctx = new ListContext(this, new TypeContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, ProgramParser.RULE_type);
						this.state = 135;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 136;
						this.match(ProgramParser.T__10);
						this.state = 137;
						this.match(ProgramParser.T__11);
						}
						break;
					case 4:
						{
						localctx = new IndexContext(this, new TypeContext(this, _parentctx, _parentState));
						(localctx as IndexContext)._val = _prevctx;
						this.pushNewRecursionContext(localctx, _startState, ProgramParser.RULE_type);
						this.state = 138;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 139;
						this.match(ProgramParser.T__10);
						this.state = 141;
						this._errHandler.sync(this);
						switch ( this._interp.adaptivePredict(this._input, 16, this._ctx) ) {
						case 1:
							{
							this.state = 140;
							(localctx as IndexContext)._expand = this.match(ProgramParser.EXPAND);
							}
							break;
						}
						this.state = 143;
						(localctx as IndexContext)._key = this.type_(0);
						this.state = 144;
						this.match(ProgramParser.T__11);
						}
						break;
					case 5:
						{
						localctx = new SubscriptContext(this, new TypeContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, ProgramParser.RULE_type);
						this.state = 146;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 147;
						this.match(ProgramParser.T__12);
						this.state = 148;
						(localctx as SubscriptContext)._member = this.match(ProgramParser.ID);
						}
						break;
					case 6:
						{
						localctx = new WithContext(this, new TypeContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, ProgramParser.RULE_type);
						this.state = 149;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 150;
						this.match(ProgramParser.T__13);
						this.state = 151;
						this.json_object();
						}
						break;
					}
					}
				}
				this.state = 156;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 18, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public tuple(): TupleContext {
		let localctx: TupleContext = new TupleContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, ProgramParser.RULE_tuple);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 157;
			this.match(ProgramParser.T__10);
			this.state = 169;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 6)) & ~0x1F) === 0 && ((1 << (_la - 6)) & 261621801) !== 0)) {
				{
				this.state = 158;
				localctx._tuple_item = this.tuple_item();
				localctx._items.push(localctx._tuple_item);
				this.state = 163;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 19, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 159;
						this.match(ProgramParser.T__2);
						this.state = 160;
						localctx._tuple_item = this.tuple_item();
						localctx._items.push(localctx._tuple_item);
						}
						}
					}
					this.state = 165;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 19, this._ctx);
				}
				this.state = 167;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===3) {
					{
					this.state = 166;
					this.match(ProgramParser.T__2);
					}
				}

				}
			}

			this.state = 171;
			this.match(ProgramParser.T__11);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public tuple_item(): Tuple_itemContext {
		let localctx: Tuple_itemContext = new Tuple_itemContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, ProgramParser.RULE_tuple_item);
		try {
			this.state = 176;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 6:
			case 9:
			case 11:
			case 25:
			case 26:
			case 29:
			case 30:
			case 31:
			case 32:
			case 33:
				localctx = new ItemContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 173;
				this.type_(0);
				}
				break;
			case 17:
				localctx = new RestContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 174;
				this.match(ProgramParser.T__16);
				this.state = 175;
				this.type_(0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public pair(): PairContext {
		let localctx: PairContext = new PairContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, ProgramParser.RULE_pair);
		let _la: number;
		try {
			this.state = 201;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				localctx = new StringPairContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 178;
				(localctx as StringPairContext)._key = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===32 || _la===33)) {
				    (localctx as StringPairContext)._key = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 180;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===18) {
					{
					this.state = 179;
					(localctx as StringPairContext)._optional = this.match(ProgramParser.T__17);
					}
				}

				this.state = 182;
				this.match(ProgramParser.T__18);
				this.state = 183;
				(localctx as StringPairContext)._val = this.type_(0);
				}
				break;
			case 2:
				localctx = new TypePairContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 184;
				this.match(ProgramParser.T__10);
				this.state = 185;
				(localctx as TypePairContext)._name = this.match(ProgramParser.ID);
				this.state = 186;
				this.match(ProgramParser.T__19);
				this.state = 187;
				this.type_(0);
				this.state = 188;
				this.match(ProgramParser.T__11);
				this.state = 189;
				this.match(ProgramParser.T__18);
				this.state = 190;
				(localctx as TypePairContext)._val = this.type_(0);
				}
				break;
			case 3:
				localctx = new PatternPairContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 192;
				this.match(ProgramParser.T__10);
				this.state = 193;
				(localctx as PatternPairContext)._name = this.match(ProgramParser.ID);
				this.state = 196;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===21) {
					{
					this.state = 194;
					this.match(ProgramParser.T__20);
					this.state = 195;
					(localctx as PatternPairContext)._match = this.type_(0);
					}
				}

				this.state = 198;
				this.match(ProgramParser.T__11);
				this.state = 199;
				this.match(ProgramParser.T__18);
				this.state = 200;
				(localctx as PatternPairContext)._val = this.type_(0);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public json_value(): Json_valueContext {
		let localctx: Json_valueContext = new Json_valueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, ProgramParser.RULE_json_value);
		let _la: number;
		try {
			this.state = 209;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 33:
				localctx = new JSONStringContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 203;
				this.match(ProgramParser.STRING);
				}
				break;
			case 31:
				localctx = new JSONNumberContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 204;
				this.match(ProgramParser.NUM);
				}
				break;
			case 6:
				localctx = new JSONObjectContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 205;
				this.json_object();
				}
				break;
			case 11:
				localctx = new JSONArrayContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 206;
				this.json_arr();
				}
				break;
			case 22:
			case 23:
				localctx = new JSONBooleanContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 207;
				_la = this._input.LA(1);
				if(!(_la===22 || _la===23)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 29:
				localctx = new JSONNullContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 208;
				this.match(ProgramParser.NULL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public json_object(): Json_objectContext {
		let localctx: Json_objectContext = new Json_objectContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, ProgramParser.RULE_json_object);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 211;
			this.match(ProgramParser.T__5);
			this.state = 212;
			this.json_pair();
			this.state = 217;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===1) {
				{
				{
				this.state = 213;
				this.match(ProgramParser.T__0);
				this.state = 214;
				this.json_pair();
				}
				}
				this.state = 219;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 220;
			this.match(ProgramParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public json_pair(): Json_pairContext {
		let localctx: Json_pairContext = new Json_pairContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, ProgramParser.RULE_json_pair);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 222;
			localctx._key = this._input.LT(1);
			_la = this._input.LA(1);
			if(!(_la===32 || _la===33)) {
			    localctx._key = this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 223;
			this.match(ProgramParser.T__18);
			this.state = 224;
			this.json_value();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public json_arr(): Json_arrContext {
		let localctx: Json_arrContext = new Json_arrContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, ProgramParser.RULE_json_arr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 226;
			this.match(ProgramParser.T__10);
			this.state = 238;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 6)) & ~0x1F) === 0 && ((1 << (_la - 6)) & 176357409) !== 0)) {
				{
				this.state = 227;
				this.json_value();
				this.state = 232;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 28, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 228;
						this.match(ProgramParser.T__2);
						this.state = 229;
						this.json_value();
						}
						}
					}
					this.state = 234;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 28, this._ctx);
				}
				this.state = 236;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===3) {
					{
					this.state = 235;
					this.match(ProgramParser.T__2);
					}
				}

				}
			}

			this.state = 240;
			this.match(ProgramParser.T__11);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 5:
			return this.type_sempred(localctx as TypeContext, predIndex);
		}
		return true;
	}
	private type_sempred(localctx: TypeContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 2);
		case 1:
			return this.precpred(this._ctx, 1);
		case 2:
			return this.precpred(this._ctx, 8);
		case 3:
			return this.precpred(this._ctx, 7);
		case 4:
			return this.precpred(this._ctx, 6);
		case 5:
			return this.precpred(this._ctx, 5);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,38,243,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,1,0,1,0,3,0,29,8,0,5,0,31,8,0,10,0,12,0,34,
	9,0,1,0,1,0,1,1,3,1,39,8,1,1,1,1,1,1,1,1,1,1,1,5,1,46,8,1,10,1,12,1,49,
	9,1,1,1,3,1,52,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,63,8,1,1,2,1,
	2,1,2,1,2,1,2,5,2,70,8,2,10,2,12,2,73,9,2,3,2,75,8,2,1,2,3,2,78,8,2,1,3,
	1,3,1,3,3,3,83,8,3,1,4,1,4,1,4,5,4,88,8,4,10,4,12,4,91,9,4,1,5,1,5,1,5,
	1,5,1,5,1,5,1,5,1,5,5,5,101,8,5,10,5,12,5,104,9,5,1,5,3,5,107,8,5,3,5,109,
	8,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,3,5,118,8,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,
	1,5,3,5,128,8,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,3,5,142,
	8,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,5,5,153,8,5,10,5,12,5,156,9,5,1,
	6,1,6,1,6,1,6,5,6,162,8,6,10,6,12,6,165,9,6,1,6,3,6,168,8,6,3,6,170,8,6,
	1,6,1,6,1,7,1,7,1,7,3,7,177,8,7,1,8,1,8,3,8,181,8,8,1,8,1,8,1,8,1,8,1,8,
	1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,3,8,197,8,8,1,8,1,8,1,8,3,8,202,8,8,
	1,9,1,9,1,9,1,9,1,9,1,9,3,9,210,8,9,1,10,1,10,1,10,1,10,5,10,216,8,10,10,
	10,12,10,219,9,10,1,10,1,10,1,11,1,11,1,11,1,11,1,12,1,12,1,12,1,12,5,12,
	231,8,12,10,12,12,12,234,9,12,1,12,3,12,237,8,12,3,12,239,8,12,1,12,1,12,
	1,12,0,1,10,13,0,2,4,6,8,10,12,14,16,18,20,22,24,0,3,1,0,29,30,1,0,32,33,
	1,0,22,23,277,0,32,1,0,0,0,2,62,1,0,0,0,4,77,1,0,0,0,6,79,1,0,0,0,8,84,
	1,0,0,0,10,127,1,0,0,0,12,157,1,0,0,0,14,176,1,0,0,0,16,201,1,0,0,0,18,
	209,1,0,0,0,20,211,1,0,0,0,22,222,1,0,0,0,24,226,1,0,0,0,26,28,3,2,1,0,
	27,29,5,1,0,0,28,27,1,0,0,0,28,29,1,0,0,0,29,31,1,0,0,0,30,26,1,0,0,0,31,
	34,1,0,0,0,32,30,1,0,0,0,32,33,1,0,0,0,33,35,1,0,0,0,34,32,1,0,0,0,35,36,
	5,0,0,1,36,1,1,0,0,0,37,39,5,24,0,0,38,37,1,0,0,0,38,39,1,0,0,0,39,40,1,
	0,0,0,40,51,5,32,0,0,41,42,5,2,0,0,42,47,5,32,0,0,43,44,5,3,0,0,44,46,5,
	32,0,0,45,43,1,0,0,0,46,49,1,0,0,0,47,45,1,0,0,0,47,48,1,0,0,0,48,50,1,
	0,0,0,49,47,1,0,0,0,50,52,5,4,0,0,51,41,1,0,0,0,51,52,1,0,0,0,52,53,1,0,
	0,0,53,54,5,5,0,0,54,63,3,10,5,0,55,56,5,27,0,0,56,57,3,4,2,0,57,58,5,28,
	0,0,58,59,5,33,0,0,59,63,1,0,0,0,60,61,5,24,0,0,61,63,3,10,5,0,62,38,1,
	0,0,0,62,55,1,0,0,0,62,60,1,0,0,0,63,3,1,0,0,0,64,78,5,32,0,0,65,74,5,6,
	0,0,66,71,3,6,3,0,67,68,5,3,0,0,68,70,3,6,3,0,69,67,1,0,0,0,70,73,1,0,0,
	0,71,69,1,0,0,0,71,72,1,0,0,0,72,75,1,0,0,0,73,71,1,0,0,0,74,66,1,0,0,0,
	74,75,1,0,0,0,75,76,1,0,0,0,76,78,5,7,0,0,77,64,1,0,0,0,77,65,1,0,0,0,78,
	5,1,0,0,0,79,82,5,32,0,0,80,81,5,8,0,0,81,83,5,32,0,0,82,80,1,0,0,0,82,
	83,1,0,0,0,83,7,1,0,0,0,84,89,3,10,5,0,85,86,5,3,0,0,86,88,3,10,5,0,87,
	85,1,0,0,0,88,91,1,0,0,0,89,87,1,0,0,0,89,90,1,0,0,0,90,9,1,0,0,0,91,89,
	1,0,0,0,92,93,6,5,-1,0,93,128,7,0,0,0,94,128,5,31,0,0,95,128,5,33,0,0,96,
	108,5,6,0,0,97,102,3,16,8,0,98,99,5,1,0,0,99,101,3,16,8,0,100,98,1,0,0,
	0,101,104,1,0,0,0,102,100,1,0,0,0,102,103,1,0,0,0,103,106,1,0,0,0,104,102,
	1,0,0,0,105,107,5,1,0,0,106,105,1,0,0,0,106,107,1,0,0,0,107,109,1,0,0,0,
	108,97,1,0,0,0,108,109,1,0,0,0,109,110,1,0,0,0,110,128,5,7,0,0,111,128,
	3,12,6,0,112,117,5,32,0,0,113,114,5,2,0,0,114,115,3,8,4,0,115,116,5,4,0,
	0,116,118,1,0,0,0,117,113,1,0,0,0,117,118,1,0,0,0,118,128,1,0,0,0,119,120,
	5,9,0,0,120,121,3,10,5,0,121,122,5,10,0,0,122,128,1,0,0,0,123,124,5,26,
	0,0,124,128,3,10,5,4,125,126,5,25,0,0,126,128,3,10,5,3,127,92,1,0,0,0,127,
	94,1,0,0,0,127,95,1,0,0,0,127,96,1,0,0,0,127,111,1,0,0,0,127,112,1,0,0,
	0,127,119,1,0,0,0,127,123,1,0,0,0,127,125,1,0,0,0,128,154,1,0,0,0,129,130,
	10,2,0,0,130,131,5,15,0,0,131,153,3,10,5,3,132,133,10,1,0,0,133,134,5,16,
	0,0,134,153,3,10,5,2,135,136,10,8,0,0,136,137,5,11,0,0,137,153,5,12,0,0,
	138,139,10,7,0,0,139,141,5,11,0,0,140,142,5,25,0,0,141,140,1,0,0,0,141,
	142,1,0,0,0,142,143,1,0,0,0,143,144,3,10,5,0,144,145,5,12,0,0,145,153,1,
	0,0,0,146,147,10,6,0,0,147,148,5,13,0,0,148,153,5,32,0,0,149,150,10,5,0,
	0,150,151,5,14,0,0,151,153,3,20,10,0,152,129,1,0,0,0,152,132,1,0,0,0,152,
	135,1,0,0,0,152,138,1,0,0,0,152,146,1,0,0,0,152,149,1,0,0,0,153,156,1,0,
	0,0,154,152,1,0,0,0,154,155,1,0,0,0,155,11,1,0,0,0,156,154,1,0,0,0,157,
	169,5,11,0,0,158,163,3,14,7,0,159,160,5,3,0,0,160,162,3,14,7,0,161,159,
	1,0,0,0,162,165,1,0,0,0,163,161,1,0,0,0,163,164,1,0,0,0,164,167,1,0,0,0,
	165,163,1,0,0,0,166,168,5,3,0,0,167,166,1,0,0,0,167,168,1,0,0,0,168,170,
	1,0,0,0,169,158,1,0,0,0,169,170,1,0,0,0,170,171,1,0,0,0,171,172,5,12,0,
	0,172,13,1,0,0,0,173,177,3,10,5,0,174,175,5,17,0,0,175,177,3,10,5,0,176,
	173,1,0,0,0,176,174,1,0,0,0,177,15,1,0,0,0,178,180,7,1,0,0,179,181,5,18,
	0,0,180,179,1,0,0,0,180,181,1,0,0,0,181,182,1,0,0,0,182,183,5,19,0,0,183,
	202,3,10,5,0,184,185,5,11,0,0,185,186,5,32,0,0,186,187,5,20,0,0,187,188,
	3,10,5,0,188,189,5,12,0,0,189,190,5,19,0,0,190,191,3,10,5,0,191,202,1,0,
	0,0,192,193,5,11,0,0,193,196,5,32,0,0,194,195,5,21,0,0,195,197,3,10,5,0,
	196,194,1,0,0,0,196,197,1,0,0,0,197,198,1,0,0,0,198,199,5,12,0,0,199,200,
	5,19,0,0,200,202,3,10,5,0,201,178,1,0,0,0,201,184,1,0,0,0,201,192,1,0,0,
	0,202,17,1,0,0,0,203,210,5,33,0,0,204,210,5,31,0,0,205,210,3,20,10,0,206,
	210,3,24,12,0,207,210,7,2,0,0,208,210,5,29,0,0,209,203,1,0,0,0,209,204,
	1,0,0,0,209,205,1,0,0,0,209,206,1,0,0,0,209,207,1,0,0,0,209,208,1,0,0,0,
	210,19,1,0,0,0,211,212,5,6,0,0,212,217,3,22,11,0,213,214,5,1,0,0,214,216,
	3,22,11,0,215,213,1,0,0,0,216,219,1,0,0,0,217,215,1,0,0,0,217,218,1,0,0,
	0,218,220,1,0,0,0,219,217,1,0,0,0,220,221,5,7,0,0,221,21,1,0,0,0,222,223,
	7,1,0,0,223,224,5,19,0,0,224,225,3,18,9,0,225,23,1,0,0,0,226,238,5,11,0,
	0,227,232,3,18,9,0,228,229,5,3,0,0,229,231,3,18,9,0,230,228,1,0,0,0,231,
	234,1,0,0,0,232,230,1,0,0,0,232,233,1,0,0,0,233,236,1,0,0,0,234,232,1,0,
	0,0,235,237,5,3,0,0,236,235,1,0,0,0,236,237,1,0,0,0,237,239,1,0,0,0,238,
	227,1,0,0,0,238,239,1,0,0,0,239,240,1,0,0,0,240,241,5,12,0,0,241,25,1,0,
	0,0,31,28,32,38,47,51,62,71,74,77,82,89,102,106,108,117,127,141,152,154,
	163,167,169,176,180,196,201,209,217,232,236,238];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ProgramParser.__ATN) {
			ProgramParser.__ATN = new ATNDeserializer().deserialize(ProgramParser._serializedATN);
		}

		return ProgramParser.__ATN;
	}


	static DecisionsToDFA = ProgramParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ProgramContext extends ParserRuleContext {
	public _statement!: StatementContext;
	public _stmts: StatementContext[] = [];
	constructor(parser?: ProgramParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(ProgramParser.EOF, 0);
	}
	public statement_list(): StatementContext[] {
		return this.getTypedRuleContexts(StatementContext) as StatementContext[];
	}
	public statement(i: number): StatementContext {
		return this.getTypedRuleContext(StatementContext, i) as StatementContext;
	}
    public get ruleIndex(): number {
    	return ProgramParser.RULE_program;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterProgram) {
	 		listener.enterProgram(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitProgram) {
	 		listener.exitProgram(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	constructor(parser?: ProgramParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return ProgramParser.RULE_statement;
	}
	public override copyFrom(ctx: StatementContext): void {
		super.copyFrom(ctx);
	}
}
export class ImportContext extends StatementContext {
	public _body!: Import_bodyContext;
	public _path!: Token;
	constructor(parser: ProgramParser, ctx: StatementContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public IMPORT(): TerminalNode {
		return this.getToken(ProgramParser.IMPORT, 0);
	}
	public FROM(): TerminalNode {
		return this.getToken(ProgramParser.FROM, 0);
	}
	public import_body(): Import_bodyContext {
		return this.getTypedRuleContext(Import_bodyContext, 0) as Import_bodyContext;
	}
	public STRING(): TerminalNode {
		return this.getToken(ProgramParser.STRING, 0);
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterImport) {
	 		listener.enterImport(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitImport) {
	 		listener.exitImport(this);
		}
	}
}
export class DefContext extends StatementContext {
	public _export_!: Token;
	public _name!: Token;
	public _ID!: Token;
	public _params: Token[] = [];
	public _val!: TypeContext;
	constructor(parser: ProgramParser, ctx: StatementContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(ProgramParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(ProgramParser.ID, i);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public EXPORT(): TerminalNode {
		return this.getToken(ProgramParser.EXPORT, 0);
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterDef) {
	 		listener.enterDef(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitDef) {
	 		listener.exitDef(this);
		}
	}
}
export class ExportContext extends StatementContext {
	public _val!: TypeContext;
	constructor(parser: ProgramParser, ctx: StatementContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public EXPORT(): TerminalNode {
		return this.getToken(ProgramParser.EXPORT, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterExport) {
	 		listener.enterExport(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitExport) {
	 		listener.exitExport(this);
		}
	}
}


export class Import_bodyContext extends ParserRuleContext {
	constructor(parser?: ProgramParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return ProgramParser.RULE_import_body;
	}
	public override copyFrom(ctx: Import_bodyContext): void {
		super.copyFrom(ctx);
	}
}
export class ImportSymbolsContext extends Import_bodyContext {
	public _alias!: AliasContext;
	public _items: AliasContext[] = [];
	constructor(parser: ProgramParser, ctx: Import_bodyContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public alias_list(): AliasContext[] {
		return this.getTypedRuleContexts(AliasContext) as AliasContext[];
	}
	public alias(i: number): AliasContext {
		return this.getTypedRuleContext(AliasContext, i) as AliasContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterImportSymbols) {
	 		listener.enterImportSymbols(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitImportSymbols) {
	 		listener.exitImportSymbols(this);
		}
	}
}
export class ImportDefaultContext extends Import_bodyContext {
	public _item!: Token;
	constructor(parser: ProgramParser, ctx: Import_bodyContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ID(): TerminalNode {
		return this.getToken(ProgramParser.ID, 0);
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterImportDefault) {
	 		listener.enterImportDefault(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitImportDefault) {
	 		listener.exitImportDefault(this);
		}
	}
}


export class AliasContext extends ParserRuleContext {
	public _name!: Token;
	public _as_!: Token;
	constructor(parser?: ProgramParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(ProgramParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(ProgramParser.ID, i);
	}
    public get ruleIndex(): number {
    	return ProgramParser.RULE_alias;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterAlias) {
	 		listener.enterAlias(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitAlias) {
	 		listener.exitAlias(this);
		}
	}
}


export class Generic_paramsContext extends ParserRuleContext {
	public _type_!: TypeContext;
	public _items: TypeContext[] = [];
	constructor(parser?: ProgramParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public type__list(): TypeContext[] {
		return this.getTypedRuleContexts(TypeContext) as TypeContext[];
	}
	public type_(i: number): TypeContext {
		return this.getTypedRuleContext(TypeContext, i) as TypeContext;
	}
    public get ruleIndex(): number {
    	return ProgramParser.RULE_generic_params;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterGeneric_params) {
	 		listener.enterGeneric_params(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitGeneric_params) {
	 		listener.exitGeneric_params(this);
		}
	}
}


export class TypeContext extends ParserRuleContext {
	constructor(parser?: ProgramParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return ProgramParser.RULE_type;
	}
	public override copyFrom(ctx: TypeContext): void {
		super.copyFrom(ctx);
	}
}
export class IntersectionContext extends TypeContext {
	public _l!: TypeContext;
	public _r!: TypeContext;
	constructor(parser: ProgramParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public type__list(): TypeContext[] {
		return this.getTypedRuleContexts(TypeContext) as TypeContext[];
	}
	public type_(i: number): TypeContext {
		return this.getTypedRuleContext(TypeContext, i) as TypeContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterIntersection) {
	 		listener.enterIntersection(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitIntersection) {
	 		listener.exitIntersection(this);
		}
	}
}
export class NamedTypeContext extends TypeContext {
	constructor(parser: ProgramParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ID(): TerminalNode {
		return this.getToken(ProgramParser.ID, 0);
	}
	public generic_params(): Generic_paramsContext {
		return this.getTypedRuleContext(Generic_paramsContext, 0) as Generic_paramsContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterNamedType) {
	 		listener.enterNamedType(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitNamedType) {
	 		listener.exitNamedType(this);
		}
	}
}
export class ParensContext extends TypeContext {
	constructor(parser: ProgramParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterParens) {
	 		listener.enterParens(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitParens) {
	 		listener.exitParens(this);
		}
	}
}
export class KeyofContext extends TypeContext {
	constructor(parser: ProgramParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public KEYOF(): TerminalNode {
		return this.getToken(ProgramParser.KEYOF, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterKeyof) {
	 		listener.enterKeyof(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitKeyof) {
	 		listener.exitKeyof(this);
		}
	}
}
export class IndexContext extends TypeContext {
	public _val!: TypeContext;
	public _expand!: Token;
	public _key!: TypeContext;
	constructor(parser: ProgramParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public type__list(): TypeContext[] {
		return this.getTypedRuleContexts(TypeContext) as TypeContext[];
	}
	public type_(i: number): TypeContext {
		return this.getTypedRuleContext(TypeContext, i) as TypeContext;
	}
	public EXPAND(): TerminalNode {
		return this.getToken(ProgramParser.EXPAND, 0);
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterIndex) {
	 		listener.enterIndex(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitIndex) {
	 		listener.exitIndex(this);
		}
	}
}
export class SubscriptContext extends TypeContext {
	public _member!: Token;
	constructor(parser: ProgramParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public ID(): TerminalNode {
		return this.getToken(ProgramParser.ID, 0);
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterSubscript) {
	 		listener.enterSubscript(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitSubscript) {
	 		listener.exitSubscript(this);
		}
	}
}
export class StringContext extends TypeContext {
	public _val!: Token;
	constructor(parser: ProgramParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING(): TerminalNode {
		return this.getToken(ProgramParser.STRING, 0);
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterString) {
	 		listener.enterString(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitString) {
	 		listener.exitString(this);
		}
	}
}
export class UnionContext extends TypeContext {
	public _l!: TypeContext;
	public _r!: TypeContext;
	constructor(parser: ProgramParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public type__list(): TypeContext[] {
		return this.getTypedRuleContexts(TypeContext) as TypeContext[];
	}
	public type_(i: number): TypeContext {
		return this.getTypedRuleContext(TypeContext, i) as TypeContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterUnion) {
	 		listener.enterUnion(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitUnion) {
	 		listener.exitUnion(this);
		}
	}
}
export class WithContext extends TypeContext {
	constructor(parser: ProgramParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public json_object(): Json_objectContext {
		return this.getTypedRuleContext(Json_objectContext, 0) as Json_objectContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterWith) {
	 		listener.enterWith(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitWith) {
	 		listener.exitWith(this);
		}
	}
}
export class PrimitiveContext extends TypeContext {
	public _val!: Token;
	constructor(parser: ProgramParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public PRIMITIVE(): TerminalNode {
		return this.getToken(ProgramParser.PRIMITIVE, 0);
	}
	public NULL(): TerminalNode {
		return this.getToken(ProgramParser.NULL, 0);
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterPrimitive) {
	 		listener.enterPrimitive(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitPrimitive) {
	 		listener.exitPrimitive(this);
		}
	}
}
export class NumberContext extends TypeContext {
	public _val!: Token;
	constructor(parser: ProgramParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public NUM(): TerminalNode {
		return this.getToken(ProgramParser.NUM, 0);
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterNumber) {
	 		listener.enterNumber(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitNumber) {
	 		listener.exitNumber(this);
		}
	}
}
export class ExpandContext extends TypeContext {
	constructor(parser: ProgramParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public EXPAND(): TerminalNode {
		return this.getToken(ProgramParser.EXPAND, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterExpand) {
	 		listener.enterExpand(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitExpand) {
	 		listener.exitExpand(this);
		}
	}
}
export class TupleTypeContext extends TypeContext {
	constructor(parser: ProgramParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public tuple(): TupleContext {
		return this.getTypedRuleContext(TupleContext, 0) as TupleContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterTupleType) {
	 		listener.enterTupleType(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitTupleType) {
	 		listener.exitTupleType(this);
		}
	}
}
export class ObjectContext extends TypeContext {
	public _pair!: PairContext;
	public _items: PairContext[] = [];
	constructor(parser: ProgramParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public pair_list(): PairContext[] {
		return this.getTypedRuleContexts(PairContext) as PairContext[];
	}
	public pair(i: number): PairContext {
		return this.getTypedRuleContext(PairContext, i) as PairContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterObject) {
	 		listener.enterObject(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitObject) {
	 		listener.exitObject(this);
		}
	}
}
export class ListContext extends TypeContext {
	constructor(parser: ProgramParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterList) {
	 		listener.enterList(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitList) {
	 		listener.exitList(this);
		}
	}
}


export class TupleContext extends ParserRuleContext {
	public _tuple_item!: Tuple_itemContext;
	public _items: Tuple_itemContext[] = [];
	constructor(parser?: ProgramParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public tuple_item_list(): Tuple_itemContext[] {
		return this.getTypedRuleContexts(Tuple_itemContext) as Tuple_itemContext[];
	}
	public tuple_item(i: number): Tuple_itemContext {
		return this.getTypedRuleContext(Tuple_itemContext, i) as Tuple_itemContext;
	}
    public get ruleIndex(): number {
    	return ProgramParser.RULE_tuple;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterTuple) {
	 		listener.enterTuple(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitTuple) {
	 		listener.exitTuple(this);
		}
	}
}


export class Tuple_itemContext extends ParserRuleContext {
	constructor(parser?: ProgramParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return ProgramParser.RULE_tuple_item;
	}
	public override copyFrom(ctx: Tuple_itemContext): void {
		super.copyFrom(ctx);
	}
}
export class ItemContext extends Tuple_itemContext {
	constructor(parser: ProgramParser, ctx: Tuple_itemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterItem) {
	 		listener.enterItem(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitItem) {
	 		listener.exitItem(this);
		}
	}
}
export class RestContext extends Tuple_itemContext {
	constructor(parser: ProgramParser, ctx: Tuple_itemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterRest) {
	 		listener.enterRest(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitRest) {
	 		listener.exitRest(this);
		}
	}
}


export class PairContext extends ParserRuleContext {
	constructor(parser?: ProgramParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return ProgramParser.RULE_pair;
	}
	public override copyFrom(ctx: PairContext): void {
		super.copyFrom(ctx);
	}
}
export class PatternPairContext extends PairContext {
	public _name!: Token;
	public _match!: TypeContext;
	public _val!: TypeContext;
	constructor(parser: ProgramParser, ctx: PairContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ID(): TerminalNode {
		return this.getToken(ProgramParser.ID, 0);
	}
	public type__list(): TypeContext[] {
		return this.getTypedRuleContexts(TypeContext) as TypeContext[];
	}
	public type_(i: number): TypeContext {
		return this.getTypedRuleContext(TypeContext, i) as TypeContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterPatternPair) {
	 		listener.enterPatternPair(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitPatternPair) {
	 		listener.exitPatternPair(this);
		}
	}
}
export class StringPairContext extends PairContext {
	public _key!: Token;
	public _optional!: Token;
	public _val!: TypeContext;
	constructor(parser: ProgramParser, ctx: PairContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public ID(): TerminalNode {
		return this.getToken(ProgramParser.ID, 0);
	}
	public STRING(): TerminalNode {
		return this.getToken(ProgramParser.STRING, 0);
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterStringPair) {
	 		listener.enterStringPair(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitStringPair) {
	 		listener.exitStringPair(this);
		}
	}
}
export class TypePairContext extends PairContext {
	public _name!: Token;
	public _val!: TypeContext;
	constructor(parser: ProgramParser, ctx: PairContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public type__list(): TypeContext[] {
		return this.getTypedRuleContexts(TypeContext) as TypeContext[];
	}
	public type_(i: number): TypeContext {
		return this.getTypedRuleContext(TypeContext, i) as TypeContext;
	}
	public ID(): TerminalNode {
		return this.getToken(ProgramParser.ID, 0);
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterTypePair) {
	 		listener.enterTypePair(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitTypePair) {
	 		listener.exitTypePair(this);
		}
	}
}


export class Json_valueContext extends ParserRuleContext {
	constructor(parser?: ProgramParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return ProgramParser.RULE_json_value;
	}
	public override copyFrom(ctx: Json_valueContext): void {
		super.copyFrom(ctx);
	}
}
export class JSONObjectContext extends Json_valueContext {
	constructor(parser: ProgramParser, ctx: Json_valueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public json_object(): Json_objectContext {
		return this.getTypedRuleContext(Json_objectContext, 0) as Json_objectContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterJSONObject) {
	 		listener.enterJSONObject(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitJSONObject) {
	 		listener.exitJSONObject(this);
		}
	}
}
export class JSONNullContext extends Json_valueContext {
	constructor(parser: ProgramParser, ctx: Json_valueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public NULL(): TerminalNode {
		return this.getToken(ProgramParser.NULL, 0);
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterJSONNull) {
	 		listener.enterJSONNull(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitJSONNull) {
	 		listener.exitJSONNull(this);
		}
	}
}
export class JSONArrayContext extends Json_valueContext {
	constructor(parser: ProgramParser, ctx: Json_valueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public json_arr(): Json_arrContext {
		return this.getTypedRuleContext(Json_arrContext, 0) as Json_arrContext;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterJSONArray) {
	 		listener.enterJSONArray(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitJSONArray) {
	 		listener.exitJSONArray(this);
		}
	}
}
export class JSONBooleanContext extends Json_valueContext {
	constructor(parser: ProgramParser, ctx: Json_valueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterJSONBoolean) {
	 		listener.enterJSONBoolean(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitJSONBoolean) {
	 		listener.exitJSONBoolean(this);
		}
	}
}
export class JSONNumberContext extends Json_valueContext {
	constructor(parser: ProgramParser, ctx: Json_valueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public NUM(): TerminalNode {
		return this.getToken(ProgramParser.NUM, 0);
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterJSONNumber) {
	 		listener.enterJSONNumber(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitJSONNumber) {
	 		listener.exitJSONNumber(this);
		}
	}
}
export class JSONStringContext extends Json_valueContext {
	constructor(parser: ProgramParser, ctx: Json_valueContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING(): TerminalNode {
		return this.getToken(ProgramParser.STRING, 0);
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterJSONString) {
	 		listener.enterJSONString(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitJSONString) {
	 		listener.exitJSONString(this);
		}
	}
}


export class Json_objectContext extends ParserRuleContext {
	constructor(parser?: ProgramParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public json_pair_list(): Json_pairContext[] {
		return this.getTypedRuleContexts(Json_pairContext) as Json_pairContext[];
	}
	public json_pair(i: number): Json_pairContext {
		return this.getTypedRuleContext(Json_pairContext, i) as Json_pairContext;
	}
    public get ruleIndex(): number {
    	return ProgramParser.RULE_json_object;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterJson_object) {
	 		listener.enterJson_object(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitJson_object) {
	 		listener.exitJson_object(this);
		}
	}
}


export class Json_pairContext extends ParserRuleContext {
	public _key!: Token;
	constructor(parser?: ProgramParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public json_value(): Json_valueContext {
		return this.getTypedRuleContext(Json_valueContext, 0) as Json_valueContext;
	}
	public ID(): TerminalNode {
		return this.getToken(ProgramParser.ID, 0);
	}
	public STRING(): TerminalNode {
		return this.getToken(ProgramParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return ProgramParser.RULE_json_pair;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterJson_pair) {
	 		listener.enterJson_pair(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitJson_pair) {
	 		listener.exitJson_pair(this);
		}
	}
}


export class Json_arrContext extends ParserRuleContext {
	constructor(parser?: ProgramParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public json_value_list(): Json_valueContext[] {
		return this.getTypedRuleContexts(Json_valueContext) as Json_valueContext[];
	}
	public json_value(i: number): Json_valueContext {
		return this.getTypedRuleContext(Json_valueContext, i) as Json_valueContext;
	}
    public get ruleIndex(): number {
    	return ProgramParser.RULE_json_arr;
	}
	public enterRule(listener: ProgramListener): void {
	    if(listener.enterJson_arr) {
	 		listener.enterJson_arr(this);
		}
	}
	public exitRule(listener: ProgramListener): void {
	    if(listener.exitJson_arr) {
	 		listener.exitJson_arr(this);
		}
	}
}

/*
 * Parser module
 *
 *   const parse = require('./parser');
 *
 *   parse(text)
 *       Returns the abstract syntax tree for the given program text. This
 *       function will first pre-parse (figure out indents and dedents),
 *       then match against an Ohm grammar, then apply AST generation
 *       rules. If there are any errors, this function will throw an error.
 */

/* eslint quotes: [2, "double"] */

const fs = require("fs");
const ohm = require("ohm-js");
const withIndentsAndDedents = require("./preparser.js");

const Program = require("../ast/program");
const WhileStatement = require("../ast/while-statement");
const Case = require("../ast/case");
const IfStatement = require("../ast/if-statement");
const FromStatement = require("../ast/from-statement");
const BreakStatement = require("../ast/break-statement");
const ReturnStatement = require("../ast/return-statement");
const FunctionDeclaration = require("../ast/function-declaration");
const VariableDeclaration = require("../ast/variable-declaration");
const AssignmentStatement = require("../ast/assignment-statement");
const CallStatement = require("../ast/call-statement");
const BinaryExpression = require("../ast/binary-expression");
const UnaryExpression = require("../ast/unary-expression");
const TernaryExpression = require("../ast/ternary-expression");
const ListExpression = require("../ast/list-expression");
const TupleExpression = require("../ast/tuple-expression");
const SetExpression = require("../ast/set-expression");
const DictionaryExpression = require("../ast/dictionary-expression");
const Call = require("../ast/call");
const FunctionType = require("../ast/function-type");
const SubscriptedExpression = require("../ast/subscripted-expression");
const IdentifierExpression = require("../ast/identifier-expression");
const Parameter = require("../ast/parameter");
const Argument = require("../ast/argument");
const BooleanLiteral = require("../ast/boolean-literal");
const NumericLiteral = require("../ast/numeric-literal");
const StringLiteral = require("../ast/string-literal");
const IdDeclaration = require("../ast/id-declaration");
const KeyValueExpression = require("../ast/keyvalue-expression");

const grammar = ohm.grammar(fs.readFileSync("./syntax/casper.ohm"));

// Ohm turns `x?` into either [x] or [], which we should clean up for our AST.
function unpack(a) {
  return a.length === 0 ? null : a[0];
}

/* eslint-disable no-unused-vars */
const astGenerator = grammar.createSemantics().addOperation("ast", {
  Program(_1, body, _2) {
    return new Program(body.ast());
  },
  Stmt_simple(statement, _) {
    return statement.ast();
  },
  Stmt_while(_, test, block) {
    return new WhileStatement(test.ast(), block.ast());
  },
  Stmt_if(_1, firstTest, firstBlock, _2, moreTests, moreBlocks, _3, lastBlock) {
    const tests = [firstTest.ast(), ...moreTests.ast()];
    const bodies = [firstBlock.ast(), ...moreBlocks.ast()];
    const cases = tests.map((test, index) => new Case(test, bodies[index]));
    return new IfStatement(cases, unpack(lastBlock.ast()));
  },
  Stmt_loop(_1, firstTest, _2, secondTest, _3, increments, Block) {
    const tests = [firstTest.ast(), secondTest.ast()];
    return new FromStatement(tests, increments, Block.ast());
  },
  Stmt_ternary(_1, firstTest, _2, secondTest, _3, thirdTest) {
    const tests = [firstTest.ast(), secondTest.ast(), thirdTest.ast()];
    return new TernaryExpression(tests);
  },
  Stmt_function(type, id, _1, params, _2, block) {
    return new FunctionDeclaration(
      type.ast(),
      id.ast(),
      params.ast(),
      block.ast()
    );
  },
  SingleStmt_vardecl(v, _, e) {
    return new VariableDeclaration(v.ast(), e.ast());
  },
  SingleStmt_assign(v, _, e) {
    return new AssignmentStatement(v.ast(), e.ast());
  },
  SingleStmt_call(c) {
    return new CallStatement(c.ast());
  },
  SingleStmt_break(_) {
    return new BreakStatement();
  },
  SingleStmt_return(_, e) {
    return new ReturnStatement(unpack(e.ast()));
  },
  Block_small(_1, statement, _2) {
    return [statement.ast()];
  },
  Block_large(_1, _2, _3, statements, _4) {
    return statements.ast();
  },
  Exp_or(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },
  Exp_and(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },
  Exp1_binary(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },
  Exp2_binary(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },
  Exp3_binary(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },
  Exp4_unary(op, operand) {
    return new UnaryExpression(op.ast(), operand.ast());
  },
  Exp5_unary(operand, op) {
    return new UnaryExpression(op.ast(), operand.ast());
  },
  Exp6_parens(_1, expression, _2) {
    return expression.ast();
  },
  Exp6_list(_1, expressions, _2) {
    return new ListExpression(expressions.ast());
  },
  Exp6_tuple(_1, expressions, _2) {
    return new TupleExpression(expressions.ast());
  },
  Exp6_set(_1, _2, expressions, _3) {
    return new SetExpression(expressions.ast());
  },
  Exp6_dict(_1, expressions, _2) {
    return new DictionaryExpression(expressions.ast());
  },

  KeyValue(id, _, exp) {
    return new KeyValueExpression(id.ast(), exp.ast());
  },
  // TODO: Exp6_call, Exp6_varexp
  Call(callee, _1, expressions, _2) {
    return new Call(callee.ast(), expressions.ast());
  },
  VarExp_subscripted(v, _1, e, _2) {
    return new SubscriptedExpression(v.ast(), e.ast());
  },
  VarExp_simple(id) {
    return new IdentifierExpression(id.ast());
  },
  // TODO: VarExps?
  Param(type, id, fntype, _, exp) {
    return new Parameter(type.ast(), id.ast(), fntype.ast(), unpack(exp.ast()));
  },
  // TODO: Params?
  Arg(exp) {
    return new Argument(exp.ast());
  },
  DeclId(type, id) {
    return new IdDeclaration(type.ast(), id.ast());
  },
  // TODO: Args?, Type
  FnType(_1, _2, args, _3) {
    return FunctionType(args.ast());
  },
  NonemptyListOf(first, _, rest) {
    return [first.ast(), ...rest.ast()];
  },
  EmptyListOf() {
    return [];
  },
  boollit(_) {
    return new BooleanLiteral(!!this.sourceString);
  },
  numlit(_1, _2, _3, _4, _5, _6) {
    return new NumericLiteral(+this.sourceString);
  },
  strlit(_1, chars, _6) {
    return new StringLiteral(this.sourceString);
  },
  id(_1, _2) {
    return this.sourceString;
  },
  _terminal() {
    return this.sourceString;
  },
});
/* eslint-enable no-unused-vars */

module.exports = text => {
  const match = grammar.match(withIndentsAndDedents(text));
  if (!match.succeeded()) {
    throw new Error(`Syntax Error: ${match.message}`);
  }
  console.log(JSON.stringify(astGenerator(match).ast()));
  return astGenerator(match).ast();
};

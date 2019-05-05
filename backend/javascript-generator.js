/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
const prettyJs = require('pretty-js');
const util = require("util");

// const Program = require("../ast/program");
const VariableDeclaration = require("../ast/variable-declaration");
const AssignmentStatement = require("../ast/assignment-statement");
const BreakStatement = require("../ast/break-statement");
const ReturnStatement = require("../ast/return-statement");
const IfStatement = require("../ast/if-statement");
const WhileStatement = require("../ast/while-statement");
const FromStatement = require("../ast/from-statement");
const FunctionDeclaration = require("../ast/function-declaration");
const FunctionObject = require("../ast/function-object");
const ListExpression = require("../ast/list-expression");
const DictExpression = require("../ast/dict-expression");
const KeyValueExpression = require("../ast/keyvalue-expression");
const SetExpression = require("../ast/set-expression");
const BinaryExpression = require("../ast/binary-expression");
const UnaryExpression = require("../ast/unary-expression");
const IdentifierExpression = require("../ast/identifier-expression");
const SubscriptedExpression = require("../ast/subscripted-expression");
const Variable = require("../ast/variable");
const Call = require("../ast/call");
const Parameter = require("../ast/parameter");
const Argument = require("../ast/argument");
const BooleanLiteral = require("../ast/boolean-literal");
const NumericLiteral = require("../ast/numeric-literal");
const StringLiteral = require("../ast/string-literal");

const Context = require("../semantics/context");
const { StringType, NumType, BooleanType } = require("../semantics/builtins");


function makeOp(op) {
  return { not: "!", and: "&&", or: "||", "==": "===", is: "==", "!=": "!=" }[op] || op;
}

const jsName = (() => {
  let lastId = 0;
  const map = new Map();
  return (v) => {
    if (!(map.has(v))) {
      map.set(v, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${v.id}_${map.get(v)}`;
  };
})();

function generateLibraryFunctions() {
  function generateLibraryStub(name, params, body) {
    const entity = Context.INITIAL.declarations[name];
    return `function ${jsName(entity)}(${params}) {${body}}`;
  }
  return [
    generateLibraryStub('print', 's', 'console.log(s);'),
    generateLibraryStub('exit', 'code', 'process.exit(code);'),
    generateLibraryStub('len', 'l', 'return l.length;'),
    generateLibraryStub('substring', 's, i, n', 'return s.substr(i, n);'),
    generateLibraryStub('charAt', 'index', 'return String.charAt(index);'),
    generateLibraryStub('ord', 's', 'return s.charCodeAt(0);'),
    generateLibraryStub('abs', 'n', 'return Math.abs(n)'),
    generateLibraryStub('sqrt', 'n', 'return Math.sqrt(n)'),
    generateLibraryStub('pi', '', 'return Math.PI'),
    generateLibraryStub('random', 'start, end', 'return Math.floor(Math.random() * (Math.max(start, end) - Math.min(start, end) + 1) + Math.min(start, end));'),
    generateLibraryStub('pow', 'x, y', 'return Math.pow(x, y);'),
  ].join('');
}

function generateBlock(block) {
  return block.map(s => `${s.gen()};`).join('');
}

module.exports = function (exp) {
  console.log(`EXP: ${exp}`);
  const libraryFunctions = generateLibraryFunctions();
  const programStatements = generateBlock(exp.statements);
  // Separate with a semicolon to avoid possible translation as a function call
  const program = `${libraryFunctions} ; ${programStatements}`;
  return prettyJs(program, { indent: '  ' });
};

Argument.prototype.gen = function () {
  return jsName(this.expression);
};

AssignmentStatement.prototype.gen = function () {
  return `${this.ids.gen()} = ${this.exps.gen()}`;
};

BinaryExpression.prototype.gen = function () {
  return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`;
};

BooleanLiteral.prototype.gen = function () {
  return `${this.value}`;
};

BreakStatement.prototype.gen = function () {
  return 'break';
};

Call.prototype.gen = function () {
  return `${jsName(this.callee)}(${this.args.map(a => a.gen()).join(',')})`;
};

DictExpression.prototype.gen = function () {
  const formattedKeyValues = [];
  const keyValues = this.exp.map(kv => kv.gen());
  for (let i = 0; i < this.exp.length; i += 1) {
    formattedKeyValues.push(keyValues[i]);
  }
  return `{ ${formattedKeyValues.join(", ")} }`;
};

// test, expressions may be off
FromStatement.prototype.gen = function () {
  const id = jsName(this.id);
  const expressions = this.expressions.gen();
  const increments = this.increments.gen();
  const blocks = this.blocks.gen();
  return `for (let ${id} = ${expressions[0].value}; ${id} <= ${expressions[1].value}; ${increments}++) {${blocks}}`;
};

FunctionDeclaration.prototype.gen = function () {
  // num func();
};

// TODO: fix using generateBlock
FunctionObject.prototype.gen = function () {
  const id = jsName(this);
  const params = this.params.map(jsName);
  let body = this.body.gen();
  if (this.body.type) {
    body = `return ${body};`;
  }
  return `function ${id} (${params.join(',')}) {${body}}`;
};

IdentifierExpression.prototype.gen = function () {
  console.log('id exp called');
  return jsName(this.ref);
};

// TODO: fix using generateBlock
IfStatement.prototype.gen = function () {
  const thenPart = this.consequents;
  const elsePart = this.alternate ? generateBlock(this.alternate) : '';
  return `if (${this.tests.gen()}) ${thenPart} ${elsePart}`;
};

KeyValueExpression.prototype.gen = function () {
  return `${this.key.value}: ${this.value.value}`;
};

ListExpression.prototype.gen = function () {
  const jsMembers = this.members.map(member => member.gen());
  return `[${jsMembers.join(',')}]`;
};

NumericLiteral.prototype.gen = function () {
  return `${this.value}`;
};

Parameter.prototype.gen = function () {
  return jsName(this);
};

ReturnStatement.prototype.gen = function () {
  return `return`;
};

SetExpression.prototype.gen = function () {
  const jsMembers = this.members.map(member => member.gen());
  return `new Set([${jsMembers}])`;
};

StringLiteral.prototype.gen = function () {
  return `${this.value}`;
};

SubscriptedExpression.prototype.gen = function () {
  return this.variable[this.subscript];
};

UnaryExpression.prototype.gen = function () {
  return `${makeOp(this.op)} ${this.operand.gen()})`;
};

// TO-DO Variable
Variable.prototype.gen = function () {
  return `${this.id}`;
};

VariableDeclaration.prototype.gen = function () {
  const formattedIds = [];
  const exps = this.exps.map(v => v.gen());
  // console.log("exps", variables[0]);
  for (let i = 0; i < this.ids.length; i += 1) {
    formattedIds.push(`${jsName(this.ids[i])} = ${exps[i]}`);
  }
  // console.log(formattedIds);
  return `let ${formattedIds.join(", ")}`;
};

WhileStatement.prototype.gen = function () {
  return `while (${this.test.gen()}) { ${generateBlock(this.body)} }`;
};

// TODO
// const FunctionDeclaration = require("../ast/function-declaration");

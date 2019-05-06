/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
const prettyJs = require("pretty-js");
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
  return (
    { not: "!", and: "&&", or: "||", "==": "===", is: "==", "!=": "!=" }[op]
    || op
  );
}

const jsName = (() => {
  let lastId = 0;
  const map = new Map();
  return v => {
    // console.log("VEE", v);
    if (!map.has(v)) {
      // console.log("hello");,,
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
  // TODO: fix builtin functions
  return [
    // generateLibraryStub("print", "s", "console.log(s);"),
    // generateLibraryStub("exit", "code", "process.exit(code);"),
    // generateLibraryStub("len", "l", "return l.length;"),
    // generateLibraryStub("substring", "s, i, n", "return s.substr(i, n);"),
    // generateLibraryStub("charAt", "index", "return String.charAt(index);"),
    // generateLibraryStub("ord", "s", "return s.charCodeAt(0);"),
    // generateLibraryStub("abs", "n", "return Math.abs(n)"),
    // generateLibraryStub("sqrt", "n", "return Math.sqrt(n)"),
    // generateLibraryStub("pi", "", "return Math.PI"),
    // generateLibraryStub(
    //   "random",
    //   "start, end",
    //   "return Math.floor(Math.random() * (Math.max(start, end) - Math.min(start, end) + 1) + Math.min(start, end));"
    // ),
    // generateLibraryStub("pow", "x, y", "return Math.pow(x, y);"),
  ].join("");
}

function generateBlock(block) {
  // console.log("GB", block.map(s => `${s.gen()};`).join(""));
  return block.map(s => `${s.gen()};`).join("");
}

module.exports = function (exp) {
  // const libraryFunctions = generateLibraryFunctions();
  const programStatements = generateBlock(exp.statements);
  // Separate with a semicolon to avoid possible translation as a function call
  // const program = `${programStatements}`;
  return prettyJs(programStatements, { indent: "  " });
};

Argument.prototype.gen = function () {
  // console.log("\nA R G U M E N T\n");
  // console.log("THIS", this.expression);
  // console.log(this.expression.gen());
  // const j = jsName(this.expression.gen());
  // console.log(j);
  return this.expression.gen();
};

AssignmentStatement.prototype.gen = function () {
  const formattedIds = [];
  const exps = this.exps.map(v => v.gen());
  //   console.log("IDS", this.ids);
  for (let i = 0; i < this.ids.length; i += 1) {
    // console.log("Ids", this.ids[i]);

    // console.log("Gen", this.ids[i].gen());
    formattedIds.push(`${this.ids[i].gen()} = ${exps[i]}`);
  }
  return `${formattedIds.join(", ")}`;
};

BinaryExpression.prototype.gen = function () {
  return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`;
};

BooleanLiteral.prototype.gen = function () {
  return `${this.value}`;
};

BreakStatement.prototype.gen = function () {
  return "break";
};

Call.prototype.gen = function () {
  // console.log("C A L L");
  // console.log()
  // return `${this.callee.gen()}(${this.args.map(a => a.gen()).join(",")})`;
  return `${this.callee.gen()}(${this.args.map(a => a.gen()).join(",")})`;
};

DictExpression.prototype.gen = function () {
  const formattedKeyValues = [];
  const keyValues = this.exp.map(kv => kv.gen());
  for (let i = 0; i < this.exp.length; i += 1) {
    formattedKeyValues.push(keyValues[i]);
  }
  return `{ ${formattedKeyValues.join(", ")} }`;
};

FromStatement.prototype.gen = function () {
  // console.log(this);
  const id = jsName(this.id);
  const expressions = this.expressions.map(v => v.gen());
  const increments = this.increments.length ? this.increments[0].gen() : 1;
  //   console.log(this.blocks);
  const blocks = this.blocks.map(s => s.gen());
  return `for (let ${id} = ${expressions[0]}; ${id} <= ${
    expressions[1]
  }; ${id} += ${increments}) {${blocks.join("")}}`;
};

FunctionDeclaration.prototype.gen = function () {
  return `function ${this.function.gen()}(${this.function.params
    .map(p => p.gen())
    .join(",")}) {
    ${generateBlock(this.function.body)}
  }`;
};

FunctionObject.prototype.gen = function () {
  return jsName(this);
};

// TODO: check in playground
IdentifierExpression.prototype.gen = function () {
  // console.log("id exp called");
  // console.log("REF", this.ref.gen());
  return this.ref.gen();
};

IfStatement.prototype.gen = function () {
  const cases = this.tests.map((test, index) => {
    const prefix = index === 0 ? "if" : "} else if";
    return `${prefix} (${test.gen()}) {${generateBlock(
      this.consequents[index],
    )}`;
  });
  const alternate = this.alternate
    ? `}else{${generateBlock(this.alternate)}`
    : "";
  return `${cases.join("")}${alternate}}`;
};

KeyValueExpression.prototype.gen = function () {
  return `${this.key.value}: ${this.value.value}`;
};

ListExpression.prototype.gen = function () {
  const jsMembers = this.members.map(member => member.gen());
  return `[${jsMembers.join(",")}]`;
};

NumericLiteral.prototype.gen = function () {
  return `${this.value}`;
};

Parameter.prototype.gen = function () {
  // console.log("P A R A M E T E R");
  // console.log(this);
  return jsName(this);
};

// TODO: cannot have sole return in else statement
ReturnStatement.prototype.gen = function () {
  // console.log("R E T U R N");
  // console.log(`return ${this.returnValue ? this.returnValue.gen() : ""}`);
  return `return ${this.returnValue ? this.returnValue.gen() : ""}`;
};

SetExpression.prototype.gen = function () {
  const jsMembers = this.members.map(member => member.gen());
  return `new Set([${jsMembers}])`;
};

StringLiteral.prototype.gen = function () {
  return `${this.value}`;
};

SubscriptedExpression.prototype.gen = function () {
  const base = this.id.gen();
  const subscript = this.subscript.gen();
  return `${base}[${subscript}]`;
};

UnaryExpression.prototype.gen = function () {
  return `(${makeOp(this.op)} ${this.operand.gen()})`;
};

Variable.prototype.gen = function () {
  return `${jsName(this.id)}`;
};

VariableDeclaration.prototype.gen = function () {
  const formattedIds = [];
  const exps = this.exps.map(v => v.gen());
  console.log("IDS", this.ids);
  for (let i = 0; i < this.ids.length; i += 1) {
    formattedIds.push(`${jsName(this.ids[i])} = ${exps[i]}`);
  }
  return `let ${formattedIds.join(", ")}`;
};

WhileStatement.prototype.gen = function () {
  return `while (${this.test.gen()}) { ${generateBlock(this.body)} }`;
};

// TODO
// const FunctionDeclaration = require("../ast/function-declaration");

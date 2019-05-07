/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
const prettyJs = require("pretty-js");
const util = require("util");

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
const TernaryExpression = require("../ast/ternary-expression");
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
    if (!map.has(v)) {
      map.set(v, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${v.id}_${map.get(v)}`;
  };
})();

const builtin = {
  print([s]) {
    return `console.log(${s})`;
  },
  exit([code]) {
    return `process.exit(${code})`;
  },
  len([s]) {
    return `${s}.length`;
  },
  substring([s, start, end]) {
    return `${s}.substring(${start}, ${end})`;
  },
  charAt([s, i]) {
    return `${s}.charAt(${i})`;
  },
  ord([c]) {
    return `${c}.charCodeAt(0)`;
  },
  abs([n]) {
    return `Math.abs(${n})`;
  },
  sqrt([n]) {
    return `Math.sqrt(${n})`;
  },
  pi() {
    return `Math.PI`;
  },
  random([s, e]) {
    return `Math.floor(Math.random() * (Math.max(${s}, ${e}) - Math.min(${s}, ${e}) + 1) + Math.min(${s}, ${e}))`;
  },
  pow([x, y]) {
    return `Math.pow(${x}, ${y})`;
  },
};

function generateBlock(block) {
  return block.map(s => `${s.gen()};`).join("");
}

module.exports = function (exp) {
  return prettyJs(generateBlock(exp.statements), { indent: "  " });
};

Argument.prototype.gen = function () {
  return this.expression.gen();
};

AssignmentStatement.prototype.gen = function () {
  const formattedIds = [];
  const exps = this.exps.map(v => v.gen());
  for (let i = 0; i < this.ids.length; i += 1) {
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
  const args = this.args.map(a => a.gen());
  if (this.callee.ref.builtin) {
    return builtin[this.callee.id](args);
  }
  return `${this.callee.gen()}(${args.join(",")})`;
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
  const id = jsName(this.id);
  const expressions = this.expressions.map(v => v.gen());
  const increments = this.increments.length ? this.increments[0].gen() : 1;
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

IdentifierExpression.prototype.gen = function () {
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
  return jsName(this);
};

ReturnStatement.prototype.gen = function () {
  return `return ${this.returnValue.gen()}`;
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

TernaryExpression.prototype.gen = function () {
  const test = this.test.gen();
  const consequent = this.consequent.gen();
  const alternate = this.alternate.gen();
  return `${test} ? ${consequent} : ${alternate}`;
};

UnaryExpression.prototype.gen = function () {
  return `(${makeOp(this.op)} ${this.operand.gen()})`;
};

Variable.prototype.gen = function () {
  const id = this.id.id === undefined ? this : this.id;
  return `${jsName(id)}`;
};

VariableDeclaration.prototype.gen = function () {
  const formattedIds = [];
  const exps = this.exps.map(v => v.gen());
  for (let i = 0; i < this.ids.length; i += 1) {
    formattedIds.push(`${jsName(this.ids[i])} = ${exps[i]}`);
  }
  return `let ${formattedIds.join(", ")}`;
};

WhileStatement.prototype.gen = function () {
  return `while (${this.test.gen()}) { ${generateBlock(this.body)} }`;
};

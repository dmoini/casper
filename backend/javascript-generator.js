const prettyJs = require("pretty-js");

const Context = require("../semantics/context");
const Program = require("../ast/program");
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

const prettyJs = require('pretty-js');

function makeOp(op) {
  return { not: "!", and: "&&", or: "||", "==": "===", "!=": "!==" }[op] || op;
}

const jsName = (() => {
  let lastId = 0;
  const map = new Map();
  return (v) => {
    if (!map.has(v)) {
      map.set(v, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${v.id}_${map.get(v)}`;
  };
})();

function generateLibraryFunctions() {
  function generateLibraryStub(name, params, body) {
    const entity = Context.INITIAL.locals.get(name);
    return `function ${javaScriptId(entity)}(${params}) {${body}}`;
  }
  return [
    generateLibraryStub('print', 's', 'console.log(s);'),
    generateLibraryStub('ord', 's', 'return s.charCodeAt(0);'),
    generateLibraryStub('charAt', 'index', 'return String.charAt(index);'),
    generateLibraryStub('len', 'l', 'return l.length;'),
    generateLibraryStub('substring', 's, i, j', 'return s.substr(i, n);'),
    generateLibraryStub('concat', 's, t', 'return s.concat(t);'),
    generateLibraryStub('not', 's', 'return !s;'),
    generateLibraryStub('exit', 'code', 'process.exit(code);'),
  ].join('');
}

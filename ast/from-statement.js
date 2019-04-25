// const BooleanLiteral = require("./boolean-literal");
const check = require("../semantics/check");
const VariableDeclaration = require("./variable-declaration");
const { NumType } = require("../semantics/builtins");
const Variable = require("./variable");
const util = require("util");

module.exports = class FromStatement {
  // change to for statement at some point
  constructor(id, expressions, increments, blocks) {
    Object.assign(this, { id, expressions, increments, blocks });
  }

  analyze(context) {
    // console.log(this.expressions);
    // console.log(this.increments);
    this.expressions.forEach(exp => exp.analyze(context));
    this.expressions.forEach(exp => check.isNumber(exp));
    const bodyContext = context.createChildContextForLoop();
    this.id = new Variable(NumType, this.id);
    bodyContext.add(this.id);
    this.blocks.forEach(b => b.analyze(bodyContext));
  }
};

const check = require("../semantics/check");
const { NumType } = require("../semantics/builtins");
const Variable = require("./variable");

module.exports = class FromStatement {
  constructor(id, expressions, increments, blocks) {
    Object.assign(this, { id, expressions, increments, blocks });
  }

  analyze(context) {
    this.expressions.forEach(exp => exp.analyze(context));
    this.expressions.forEach(exp => check.isNumber(exp));
    const bodyContext = context.createChildContextForLoop();
    this.id = new Variable(NumType, this.id);
    bodyContext.add(this.id);
    this.blocks.forEach(b => b.analyze(bodyContext));
  }
};

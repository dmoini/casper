// const BooleanLiteral = require("./boolean-literal");
const check = require("../semantics/check");
const VariableDeclaration = require("./variable-declaration");

module.exports = class FromStatement {
  // change to for statement at some point
  constructor(id, expressions, increments, block) {
    Object.assign(this, { id, expressions, increments, block });
  }

  // TODO: Check for Correctness
  analyze(context) {
    this.expressions.analyze(context);
    check.isNumber(this.expressions);
    this.increments.analyze(context);
    check.isNumber(this.increments);
    const bodyContext = context.createChildContextForLoop();
    this.id = new VariableDeclaration(this.expressions.type, this.id);
    bodyContext.add(this.id);
    this.block.analyze(bodyContext);
  }
};

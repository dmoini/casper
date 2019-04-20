// const BooleanLiteral = require("./boolean-literal");
// const NumericLiteral = require("./numeric-literal");

module.exports = class UnaryExpression {
  constructor(op, operand) {
    Object.assign(this, { op, operand });
  }

  analyze(context) {
    this.operand.analyze(context);
  }
};

// const BooleanLiteral = require("./boolean-literal");
// const NumericLiteral = require("./numeric-literal");
const util = require("util");

module.exports = class UnaryExpression {
  constructor(op, operand) {
    Object.assign(this, { op, operand });
  }

  analyze(context) {
    this.operand.analyze(context);
    this.type = this.operand.type;
  }
};

const check = require("../semantics/check");
const { BooleanType, NumType } = require("../semantics/builtins");
const BooleanLiteral = require("../ast/boolean-literal");
const NumericLiteral = require("../ast/numeric-literal");

module.exports = class UnaryExpression {
  constructor(op, operand) {
    Object.assign(this, { op, operand });
  }

  analyze(context) {
    this.operand.analyze(context);
    if (["!", "not"].includes(this.op)) {
      check.isBoolean(this.operand);
      this.type = BooleanType;
    } else {
      check.isNumber(this.operand);
      this.type = NumType;
    }
  }

  optimize() {
    this.operand = this.operand.optimize();
    if ((this.op === 'not' || this.op === '!') && this.operand instanceof BooleanLiteral) {
      return new BooleanLiteral(!this.operand.value);
    }
    if (this.op === '-' && this.operand instanceof NumericLiteral) {
      return new NumericLiteral(-this.operand.value);
    }
    return this;
  }
};

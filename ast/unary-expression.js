const check = require("../semantics/check");
const { BooleanType, NumType } = require("../semantics/builtins");

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
    return this;
  }
};

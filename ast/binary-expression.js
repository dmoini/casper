const check = require("../semantics/check");
const { NumType } = require("../semantics/builtins");

module.exports = class BinaryExpression {
  constructor(op, left, right) {
    Object.assign(this, { op, left, right });
  }

  analyze(context) {
    this.left.analyze(context);
    this.right.analyze(context);
    if (/(\/\/)|[-*/%]/.test(this.op)) {
      check.isNumber(this.left);
      check.isNumber(this.right);
    } else if (/<=?|>=?/.test(this.op)) {
      check.expressionsHaveTheSameType(this.left, this.right);
      check.isNumberOrString(this.left);
      check.isNumberOrString(this.right);
    } else if (/[+]/.test(this.op)) {
      check.isNumberOrString(this.left);
      check.isNumberOrString(this.right);
    } else {
      check.expressionsHaveTheSameType(this.left, this.right);
    }
    // this.type(NumType);
    this.type = NumType;
  }
};

const check = require('../semantic/check');

module.exports = class BinaryExpression {
  constructor(op, left, right) {
    Object.assign(this, { op, left, right });
  }
  analyze(context) {
    this.left.analyze(context);
    this.right.analyze(context);
  if(/[-*/&|]/.test(this.op)) {
      check.isNum(this.left);
      check.isNum(this.right);
    } else if(/<=?|>=?/.test(this.op)){
      check.expressionsHaveTheSameType(this.left, this.right);
      check.isNumOrString(this.left);
      check.isNumOrString(this.right);
    } else if(/+/.test(this.op)) {
      check.isNumOrString(this.left);
      check.isNumOrString(this.right);
    } else {
      check.expressionsHaveTheSameType(this.left, this.right);
    }
    this.type(NumType)
  }
};

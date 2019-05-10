const check = require("../semantics/check");

module.exports = class TernaryStatement {
  constructor(test, consequent, alternate) {
    Object.assign(this, { test, consequent, alternate });
  }

  analyze(context) {
    this.test.analyze(context);
    check.isBoolean(this.test);
    this.consequent.analyze(context);
    this.alternate.analyze(context);
    check.sameType(this.consequent.type, this.alternate.type);
    this.type = this.consequent.type;
  }

  optimize() {
    this.test = this.test.optimize();
    this.consequent = this.consequent.optimize();
    this.alternate = this.alternate.optimize();
    return this;
  }
};

const check = require("../semantics/check");

module.exports = class TernaryStatement {
  constructor(test, trueTest, falseTest) {
    Object.assign(this, { test, trueTest, falseTest });
  }

  // TODO: make ternary expressions work for assignment
  analyze(context) {
    // this.exp.analyze(context);
    this.test.analyze(context);
    check.isBoolean(this.test);
    this.trueTest.analyze(context);
    this.trueTestType = this.trueTest.type;
    this.falseTest.analyze(context);
    this.falseTestType = this.falseTest.type;
  }
};

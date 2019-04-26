module.exports = class TernaryStatement {
  constructor(test, trueTest, falseTest) {
    Object.assign(this, { test, trueTest, falseTest });
  }

  // TODO: make ternary expressions work
  analyze(context) {
    this.exp.analyze(context);
  }
};

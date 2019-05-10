const check = require("../semantics/check");

module.exports = class IfStatement {
  constructor(tests, consequents, alternate) {
    Object.assign(this, { tests, consequents, alternate });
  }

  analyze(context) {
    this.tests.forEach(test => {
      test.analyze(context);
      check.isBoolean(test);
    });
    this.consequents.forEach(block => {
      const blockContext = context.createChildContextForBlock();
      block.forEach(statement => statement.analyze(blockContext));
    });
    if (this.alternate) {
      const alternateBlock = context.createChildContextForBlock();
      this.alternate.forEach(s => s.analyze(alternateBlock));
    }
  }

  optimize() {
    for (let i = 0; i < this.tests.length; i += 1) {
      this.tests[i] = this.tests[i].optimize();
    }
    for (let i = 0; i < this.consequents.length; i += 1) {
      for (let j = 0; j < this.consequents[i].length; j += 1) {
        this.consequents[i][j] = this.consequents[i][j].optimize();
      }
    }
    return this;
  }
};

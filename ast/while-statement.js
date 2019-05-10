module.exports = class WhileStatement {
  constructor(test, body) {
    Object.assign(this, { test, body });
  }

  analyze(context) {
    this.test.analyze(context);
    const bodyContext = context.createChildContextForLoop();
    this.body.forEach(s => s.analyze(bodyContext));
  }

  optimize() {
    this.test = this.test.optimize();
    this.body.forEach((b, i) => {
      this.body[i] = this.body[i].optimize();
    });
    return this;
  }
};

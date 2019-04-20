module.exports = class WhileStatement {
  constructor(test, body) {
    Object.assign(this, { test, body });
  }

  analyze(context) {
    this.text.analyze(context);
    const bodyContext = context.createChildContextForLoop();
    this.body.forEach(s => s.analyze(bodyContext));
  }
};

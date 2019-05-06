module.exports = class Argument {
  constructor(expression) {
    Object.assign(this, { expression });
  }

  analyze(context) {
    console.log("ARG ANALYZE:", this.expression);
    this.expression.analyze(context);
  }
};

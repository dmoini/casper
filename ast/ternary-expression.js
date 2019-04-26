module.exports = class TernaryStatement {
  constructor(exp) {
    Object.assign(this, { exp });
  }

  // TODO: make ternary expressions work
  analyze(context) {
    this.exp.analyze(context);
  }
};

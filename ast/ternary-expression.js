module.exports = class TernaryStatement {
  constructor(exp) {
    Object.assign(this, { exp });
  }

  // TODO: not sure if this is correct, please check it
  analyze(context) {
    this.exp.analyze(context);
  }
};

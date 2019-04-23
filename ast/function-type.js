module.exports = class FunctionType {
  constructor(args) {
    Object.assign(this, { args });
  }

  // TODO: Check for Correctness
  analyze(context) {
    this.args.analyze(context);
  }
};

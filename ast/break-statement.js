module.exports = class BreakStatement {
  // eslint-disable-next-line class-methods-use-this
  analyze(context) {
    // eslint-disable-line class-methods-use-this
    if (!context.inLoop) {
      throw new Error("Break outside of loop");
    }
  }

  optimize() {
    return this;
  }
};

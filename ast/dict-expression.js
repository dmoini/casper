module.exports = class DictExpression {
  constructor(members) {
    this.members = members;
  }

  // TODO: Check for correctness
  analyze(context) {
    // this.members.forEach(p => p.analyze(context)); ?
    this.members.analyze(context);
  }
};

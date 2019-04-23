module.exports = class SetExpression {
  constructor(members) {
    this.members = members;
  }

  // TODO: Check for correctness
  analyze(context) {
    this.members.forEach(m => m.analyze(context));
  }
};

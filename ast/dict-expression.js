module.exports = class DictExpression {
  constructor(members) {
    this.members = members;
  }

  analyze(context) {
    this.members.forEach(m => m.analyze(context));
    this.type = this.members[0].type;
    this.members.forEach;
    for (let i = 1; i < members.length; i += 1) {
      if (this.members[i].type != this.type) {
        throw new Error("Incompatible types within Dictionary");
      }
    }
  }
};

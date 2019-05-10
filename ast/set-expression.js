const check = require("../semantics/check");
const SetType = require("./set-type");

module.exports = class SetExpression {
  constructor(members) {
    this.members = members;
  }

  analyze(context) {
    this.members.forEach(m => m.analyze(context));
    if (this.members.length) {
      this.type = new SetType(this.members[0].type);
      for (let i = 1; i < this.members.length; i += 1) {
        check.sameType(this.members[i].type, this.type.memberType);
      }
    }
  }

  optimize() {
    for (let i = 0; i < this.members.length; i += 1) {
      this.members[i] = this.members[i].optimize();
    }
    return this;
  }
};

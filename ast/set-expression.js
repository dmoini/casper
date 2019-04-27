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
        if (JSON.stringify(this.members[i].type) !== JSON.stringify(this.type.memberType)) {
          throw new Error("Set mixed types");
        }
      }
    } else {
      // TODO: assign type to empty set
    }
  }
};

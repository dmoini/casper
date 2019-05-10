const check = require("../semantics/check");
const ListType = require("./list-type");

module.exports = class ListExpression {
  constructor(members) {
    this.members = members;
  }

  analyze(context) {
    this.members.forEach(m => m.analyze(context));
    if (this.members.length) {
      this.type = new ListType(this.members[0].type);
      for (let i = 1; i < this.members.length; i += 1) {
        check.sameType(this.members[i].type, this.type.memberType);
      }
    }
  }

  optimize() {
    return this;
  }
};

const check = require("../semantics/check");

module.exports = class ListExpression {
  constructor(members) {
    this.members = members;
    this.type = undefined;
  }

  analyze(context) {
    this.members.forEach(m => m.analyze(context));
    this.type = this.members[0].type;
    for (let i = 1; i < members.length; i += 1) {
      if (this.members[i].type != this.type) {
        throw new Error("Incompatible types within list");
      }
    }
  }
};

const check = require("../semantics/check");

module.exports = class ListExpression {
  constructor(members) {
    this.members = members;
  }

  analyze(context) {
    this.members.forEach(m => m.analyze(context));
    // this.type = this.members[0].type;
    // for 1 ..
    //   if this.members[i].type != this.type
    //     throw error
    // got to the end, I'm ok
    }
};

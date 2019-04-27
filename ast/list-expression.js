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
        if (JSON.stringify(this.members[i].type) !== JSON.stringify(this.type.memberType)) {
          throw new Error("List mixed types");
        }
      }
    } else {
      // // TODO: assign type to empty list
    }
  }
};

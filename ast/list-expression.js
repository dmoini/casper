const check = require("../semantics/check");

module.exports = class ListExpression {
  constructor(members) {
    this.members = members;
  }

  analyze(context) {
    this.members.forEach(m => m.analyze(context));
    // this.values.forEach(v => check.expressionsHaveTheSameType(v, t));
  }
};

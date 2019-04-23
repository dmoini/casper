const check = require("../semantics/check");

module.exports = class ListExpression {
  constructor(members) {
    this.members = members;
  }

  analyze(context) {
    this.members.forEach(m => m.analyze(context));
    // TODO: Make sure it compiles
    // we do not have lookupType function
    const t = context.lookupType(this.type); // <-- Does this work? we don't have a type assigned to the expression
    // isn't expressionsHaveTheSameType correct?
    this.values.forEach(v => check.expressionsHaveTheSameType(v, t));
  }
};

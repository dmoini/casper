// const check = require("../semantics/check");

module.exports = class ListExpression {
  constructor(members) {
    this.members = members;
  }

  // TODO
  analyze(context) {
    this.members.forEach(m => m.analyze(context));
    // figure out how to check type inference
  }
};

const util = require("util");

module.exports = class IdentifierExpression {
  constructor(id) {
    this.id = id;
  }

  analyze(context) {
    console.log(this.id);
    // console.log("CONTEXT: " + util.format(context));
    this.ref = context.lookupValue(this.id); // TODO: Make sure we lookup VALUE
    this.type = this.ref.type;
  }
};

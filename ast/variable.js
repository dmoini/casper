const check = require("../semantics/check");

module.exports = class Variable {
  constructor(type, id) {
    this.type = type;
    this.id = id;
  }

  analyze(context) {
    this.id.analyze(context);
    if (this.type) {
      this.type = context.lookupType(this.type);
      check.isAssignableTo(this.id, this.type);
    } else {
      this.type = this.id.type;
    }
    context.add(this);
  }
};

// TODO: figure out how to add types to this
const check = require('../semantics/check');

module.exports = class Variable {
  constructor(id) {
    this.id = id;
  }

  analyze(context) {
    this.init.analyze(context);
    if (this.type) {
      this.type = context.lookupType(this.type);
      check.isAssignableTo(this.init, this.type);
    } else {
      // Yay! type inference!
      this.type = this.init.type;
    }
    context.add(this);
  }
};

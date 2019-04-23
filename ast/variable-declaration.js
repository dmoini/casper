const Variable = require("./variable");
const check = require('../semantics/check');

module.exports = class VariableDeclaration {
  constructor(type, ids, initializers) {
    Object.assign(this, { type, ids, initializers });
  }

  analyze(context) {
    if (this.ids.length !== this.initializers.length) {
      throw new Error('Number of variables does not equal number of initializers');
    }

    this.initializers.forEach(i => i.analyze(context));

    this.variables = this.ids.map(id => new Variable(id));
    this.variables.forEach(variable => context.add(variable));

    this.initializers.analyze(context);
    if (this.type) {
      this.type = context.lookupType(this.type);
      check.isAssignableTo(this.initializers, this.type);
    } else {
      this.type = this.initializers.type;
    }
    context.add(this);
  }
};

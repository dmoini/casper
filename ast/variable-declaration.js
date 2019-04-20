const Variable = require("./variable");

module.exports = class VariableDeclaration {
  constructor(ids, initializers) {
    Object.assign(this, { ids, initializers });
  }

  analyze(context) {
    if (this.ids.length !== this.initializers.length) {
      throw new Error('Number of variables does not equal number of initializers');
    }

    this.initializers.forEach(i => i.analyze(context));

    this.variables = this.ids.map(id => new Variable(id));
    this.variables.forEach(variable => context.add(variable));
  }
};

const Variable = require("./variable");
const check = require("../semantics/check");

module.exports = class VariableDeclaration {
  constructor(type, ids, initializers) {
    Object.assign(this, { type, ids, initializers });
  }

  analyze(context) {
    console.log("ID length: " + this.ids.length);
    console.log("Intializers length: " + this.initializers.length);
    if (this.ids.length !== this.initializers.length) {
      throw new Error(
        "Number of variables does not equal number of initializers"
      );
    }

    this.initializers.forEach(i => i.analyze(context));

    this.variables = this.ids.map(id => new Variable(this.type, id));
    this.variables.forEach(variable => context.add(variable)); // Enable/disable for AST generation
  }
};

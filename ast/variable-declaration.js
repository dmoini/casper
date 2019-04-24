const Variable = require("./variable");
const AssignmentStatement = require("./assignment-statement");

module.exports = class VariableDeclaration {
  constructor(type, ids, exps) {
    Object.assign(this, { type, ids, exps });
  }

  analyze(context) {
    this.type = context.lookupType(this.type);
    this.variables = this.ids.map(id => new Variable(this.type, id));
    this.variables.forEach(variable => context.add(variable)); // Enable/disable for AST generation
    const a = new AssignmentStatement(this.ids, this.exps);
    a.analyze(context);
  }
};

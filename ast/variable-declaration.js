const Variable = require("./variable");
const AssignmentStatement = require("./assignment-statement");

module.exports = class VariableDeclaration {
  constructor(type, ids, exps) {
    Object.assign(this, { type, ids, exps });
  }

  analyze(context) {
    this.variables = this.ids.map(id => new Variable(this.type, id));
    this.variables.forEach(variable => context.add(variable, variable.id.id));
    const a = new AssignmentStatement(this.ids, this.exps);
    a.analyze(context);
    // console.log("VARDEC", a);
  }
};

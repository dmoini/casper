const Variable = require("./variable");
const AssignmentStatement = require("./assignment-statement");
const util = require("util");

module.exports = class VariableDeclaration {
  constructor(type, ids, exps) {
    Object.assign(this, { type, ids, exps });
  }

  analyze(context) {
    this.variables = this.ids.map(id => new Variable(this.type, id));
    console.log("HELLO" + util.format(this.variables));
    this.variables.forEach(variable => context.add(variable, variable.id.id));
    const a = new AssignmentStatement(this.ids, this.exps);
    a.analyze(context);
  }
};

const Variable = require("./variable");
const util = require("util");
const NumType = require("../semantics/builtins");
const ReturnStatement = require("./return-statement");

module.exports = class FunctionObject {
  constructor(type, id, params, body) {
    Object.assign(this, { type, id, params, body });
  }

  isAssignableTo(exp, type) {
    if (JSON.stringify(exp.type) !== JSON.stringify(type)) {
      console.log(
        `${util.format(exp.type)} and ${util.format(type)} are not compatible`
      );
      throw new Error("Incorrect function return type");
    }
  }

  analyze(context) {
    // thank you justin
    this.params = this.params.map(p => new Variable(p.type, p.id));
    this.params.forEach(p => context.add(p, p.id.id));
    this.body.forEach(s => s.analyze(context));

    const returnStatement = this.body.filter(
      b => b.constructor === ReturnStatement
    );
    if (returnStatement.length === 0 && this.type !== "void") {
      throw new Error("no return statement found");
    } else if (returnStatement.length > 0) {
      if (this.type === "void") {
        throw new Error("void functions cannot have return statements");
      }
      this.isAssignableTo(returnStatement[0].returnValue, this.type);
    }
  }
};

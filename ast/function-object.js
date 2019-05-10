const Parameter = require("./parameter");
const ReturnStatement = require("./return-statement");

module.exports = class FunctionObject {
  constructor(type, id, params, body) {
    Object.assign(this, { type, id, params, body });
  }

  // eslint-disable-next-line class-methods-use-this
  isAssignableTo(exp, type) {
    if (JSON.stringify(exp) !== JSON.stringify(type)) {
      throw new Error("Incorrect function return type");
    }
  }

  analyze(context) {
    // Thank you Justin <3
    this.params = this.params.map(p => new Parameter(p.type, p.id));
    this.params.forEach(p => p.analyze(context));
    this.body.forEach(s => s.analyze(context));

    const returnStatement = this.body.filter(
      b => b.constructor === ReturnStatement,
    );
    if (returnStatement.length === 0 && this.type !== "void") {
      throw new Error("No return statement found");
    } else if (returnStatement.length > 0) {
      if (this.type === "void") {
        throw new Error("Void functions cannot have return statements");
      }
      this.isAssignableTo(returnStatement[0].returnValue.type, this.type);
    }
  }

  optimize() {
    for (let i = 0; i < this.body.length; i += 1) {
      this.body[i] = this.body[i].optimize();
    }
    return this;
  }
};

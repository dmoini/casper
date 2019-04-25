const Variable = require("./variable");
const util = require("util");
const NumType = require("../semantics/builtins");
const ReturnStatement = require("./return-statement");

module.exports = class FunctionObject {
  constructor(type, id, params, body) {
    Object.assign(this, { type, id, params, body });
  }

  get isExternal() {
    return !this.function.body;
  }

  isAssignableTo(exp, type) {
    if (JSON.stringify(exp.type) !== JSON.stringify(type)) {
      throw new Error("Types are not compatible");
    }
  }

  // TODO: Based off of Tiger, please check
  analyze(context) {
    // context.add()
    // thank you justin
    // console.log("TYPE: " + util.format(this.type));
    this.params = this.params.map(id => new Variable(this.type, id));
    this.params.forEach(p => context.add(p, p.id.id));
    context.add(this.id);
    if (this.body) {
      this.body.forEach(s => s.analyze(context));
      this.body
        .filter(b => b.constructor === ReturnStatement)
        .forEach(b => {
          this.isAssignableTo(b.returnValue, this.type);
        });
    }
  }
};

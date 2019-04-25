const Variable = require("./variable");
const ReturnStatement = require("./return-statement");
const util = require("util");
const check = require("../semantics/check");
const NumType = require("../semantics/builtins");

module.exports = class FunctionObject {
  constructor(type, id, params, body) {
    Object.assign(this, { type, id, params, body });
  }

  get isExternal() {
    return !this.function.body;
  }

  // TODO: Based off of Tiger, please check
  analyze(context) {
    // context.add()
    console.log("TYPE: " + util.format(this.type));

    this.params = this.params.map(id => new Variable(this.type, id));
    this.params.forEach(p => context.add(p, p.id.id));
    context.add(this.id);
    if (this.body) {
      //   console.log("BODY: " + util.format(this.body[0].returnValue.type));
      this.body.forEach(s => s.analyze(context));
    }
  }
};

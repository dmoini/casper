const check = require("../semantics/check");

module.exports = class CallExpression {
  constructor(callee, args) {
    Object.assign(this, { callee, args });
  }

  analyze(context) {
    this.callee.analyze(context);
    this.args.forEach(arg => arg.analyze(context));
    this.type = this.callee.ref.type;
    console.log("Callee ", this.callee.ref);
    console.log("Args ", this.args);
    context.assertIsFunction(this.callee.ref);
    if (this.args.length !== this.callee.ref.params.length) {
      throw new Error("incorrect number of arguments");
    }
    this.args.forEach((a, i) => {
      const paramType = this.callee.ref.params[i].type;
      if (a.expression.type !== paramType && paramType !== "void") {
        throw new Error("argument and parameter types do not match");
      }
    });
    console.log("args", this.args);
  }
};

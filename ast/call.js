const check = require("../semantics/check");

module.exports = class CallExpression {
  constructor(callee, args) {
    Object.assign(this, { callee, args });
  }

  analyze(context) {
    this.callee.analyze(context);
    this.args.forEach(arg => arg.analyze(context));
    this.type = this.callee.ref.type;
    console.log("Callee", this.callee);
    context.assertIsFunction(this.callee.ref);
    if (this.args.length !== this.callee.ref.params.length) {
      throw new Error("incorrect number of arguments");
    }
    this.args.forEach((a, i) => {
      if (a.expression.type !== this.callee.ref.params[i].type) {
        throw new Error("argument and parameter types do not match");
      }
    });
    console.log("args", this.args);
  }
};

const check = require("../semantics/check");

module.exports = class CallExpression {
  constructor(callee, args) {
    Object.assign(this, { callee, args });
  }

  analyze(context) {
    this.callee.analyze(context);
    this.args.forEach(arg => arg.analyze(context));
    this.type = this.callee.ref.type;
    context.assertIsFunction(this.callee.ref);
    if (this.args.length !== this.callee.ref.params.length) {
      throw new Error("Incorrect number of arguments");
    }
    this.args.forEach((a, i) => {
      const paramType = this.callee.ref.params[i].type;
      if (check.isCollectionType(paramType)) {
        if (a.expression.type.constructor !== paramType.constructor && paramType !== "void") {
          throw new Error("Argument and parameter types do not match");
        }
      } else if (a.expression.type !== paramType && paramType !== "void") {
        throw new Error("Argument and parameter types do not match");
      }
    });
  }

  optimize() {
    return this;
  }
};

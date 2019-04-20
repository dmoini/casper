module.exports = class CallExpression {
  constructor(callee, args) {
    Object.assign(this, { callee, args });
  }

  analyze(context) {
    this.callee.analyze(context);
    context.assertIsFunction(this.callee.referent);
    this.checkArgumentMatching(this.callee.referent);
    this.args.forEach(arg => arg.analyze(context));
  }
};

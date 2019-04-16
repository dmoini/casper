module.exports = class CallExpression {
  constructor(callee, args) {
    Object.assign(this, { callee, args });
  }
  analyze() {}
};

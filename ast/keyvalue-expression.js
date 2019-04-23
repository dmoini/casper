module.exports = class KeyValueExpression {
  constructor(id, expression) {
    Object.assign(this, { id, expression });
  }
  analyze(context) {
    this.id.analyze(context);
    this.expression.analyze(context);
  }
};

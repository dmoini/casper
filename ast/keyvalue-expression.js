module.exports = class KeyValueExpression {
  constructor(key, value) {
    Object.assign(this, { key, value });
  }

  analyze(context) {
    this.key.analyze(context);
    this.value.analyze(context);
  }
};

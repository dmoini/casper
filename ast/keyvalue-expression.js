module.exports = class KeyValueExpression {
  constructor(key, value) {
    Object.assign(this, { key, value });
  }

  analyze(context) {
    this.key.analyze(context);
    // console.log("KEY TYPE:", this.key);
    this.value.analyze(context);
  }
};

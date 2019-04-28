const check = require("../semantics/check");
const DictType = require("./dict-type");

module.exports = class DictExpression {
  constructor(exp) {
    Object.assign(this, { exp });
  }

  // eslint-disable-next-line no-unused-vars
  analyze(context) {
    // this.values.forEach(value => value.analyze(context));
    this.exp.forEach(e => {
      e.key.analyze(context);
      e.value.analyze(context);
    });
    if (this.exp.length) {
      const keyType = this.exp[0].key.type;
      const valueType = this.exp[0].value.type;
      this.type = new DictType(keyType, valueType);
      for (let i = 1; i < this.exp.length; i += 1) {
        if (
          JSON.stringify(this.exp[i].key.type) !==
            JSON.stringify(this.keyType) ||
          JSON.stringify(this.exp[i].value.type) !==
            JSON.stringify(this.valueType)
        ) {
          throw new Error("Incompatible types within dictionary");
        }
      }
    }
  }
};

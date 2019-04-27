const check = require("../semantics/check");
const DictType = require("./dict-type");

module.exports = class DictExpression {
  constructor(exp) {
    Object.assign(this, { exp });
  }

  // eslint-disable-next-line no-unused-vars
  analyze(context) {
    // this.values.forEach(value => value.analyze(context));
    this.exp.forEach((e) => {
      // console.log("e:", e);
      e.key.analyze(context);
      e.value.analyze(context);
    });
    // console.log("EXP:", this.exp);
    // console.log("e[0]:", this.exp[0].key);
    // console.log(this.exp[0].key.type.name === 'num');
    // const keyType = context.lookupType(this.exp[0].key);
    if (this.exp.length > 0) {
      console.log("this.exp.length:", this.exp.length);
      this.keyType = this.exp[0].key.type;
      this.valueType = this.exp[0].value.type;
      // TODO: case if empty dictionary
      this.type = new DictType(this.keyType, this.valueType);
      console.log("this.type:", this.type);
      for (let i = 1; i < this.exp.length; i += 1) {
        if (JSON.stringify(this.exp[i].key.type) !== JSON.stringify(this.keyType)
          || JSON.stringify(this.exp[i].value.type) !== JSON.stringify(this.valueType)) {
          throw new Error("Incompatible types within dictionary");
        }
      }
    } else {
      // TODO: assign type to empty dictionary
      console.log("ELSE");
      console.log(context.lookupType(this.exp));
    }
  }
};

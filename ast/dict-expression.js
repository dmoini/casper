const check = require("../semantics/check");
const DictType = require("./dict-type");
const KeyValueExpression = require("./keyvalue-expression");

module.exports = class DictExpression {
  constructor(exp) {
    Object.assign(this, { exp });
  }

  analyze(context) {
    // this.values.forEach(value => value.analyze(context));

    this.type = new DictType(this.keyVals[0].type, this.values[0].type);
    for (let i = 1; i < this.keyVals.length; i += 1) {
      if (
        JSON.stringify(this.keyVals[i].type) !==
          JSON.stringify(this.type.keyType) &&
        JSON.stringify(this.values[i].type) !==
          JSON.stringify(this.type.valueType)
      ) {
        throw new Error("Incompatible types within Dictionary");
      }
    }
  }
};

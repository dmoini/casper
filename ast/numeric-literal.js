const { NumType } = require("../semantics/builtins");

module.exports = class NumericLiteral {
  constructor(value) {
    this.value = value;
    this.type = undefined;
  }

  analyze(context) {
    this.type = NumType;
  }
};

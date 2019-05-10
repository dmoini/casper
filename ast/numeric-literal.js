const { NumType } = require("../semantics/builtins");

module.exports = class NumericLiteral {
  constructor(value) {
    this.value = value;
  }

  // eslint-disable-next-line no-unused-vars
  analyze(context) {
    this.type = NumType;
  }

  optimize() {
    return this;
  }
};

const { NumType } = require('../semantics/builtins');

module.exports = class NumericLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze() {
    this.type = NumType;
  }
};

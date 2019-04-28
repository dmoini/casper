const { BooleanType } = require("../semantics/builtins");

module.exports = class BooleanLiteral {
  constructor(value) {
    this.value = value;
  }

  // eslint-disable-next-line no-unused-vars
  analyze(context) {
    this.type = BooleanType;
  }
};

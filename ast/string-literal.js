const { StringType } = require("../semantics/builtins");

module.exports = class StringLiteral {
  constructor(value) {
    this.value = value;
  }

  // eslint-disable-next-line no-unused-vars
  analyze(context) {
    this.type = StringType;
  }

  optimize() {
    return this;
  }
};

const { StringType } = require("../semantics/builtins");

module.exports = class StringLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze(context) {
    this.type = StringType;
  }
};

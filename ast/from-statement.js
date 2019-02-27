const BooleanLiteral = require("./boolean-literal");

module.exports = class FromStatement {
  constructor(tests, increments, block) {
    Object.assign(this, { tests, increments, block });
  }
};

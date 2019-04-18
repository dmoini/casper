const BooleanLiteral = require("./boolean-literal");

module.exports = class FromStatement {
  constructor(id, tests, increments, block) {
    Object.assign(this, {id, tests, increments, block });
  }
  analyze() {}
};

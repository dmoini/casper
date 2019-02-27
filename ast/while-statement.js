const BooleanLiteral = require('./boolean-literal');

module.exports = class WhileStatement {
  constructor(test, body) {
    Object.assign(this, { test, body });
  }
};

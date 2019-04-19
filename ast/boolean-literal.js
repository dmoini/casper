const check = require('../semantics/check');

module.exports = class BooleanLiteral {
  constructor(value) {
    this.value = value;
  }
  analyze() { // eslint-disable-line class-methods-use-this
    // toal says empty - ask him
  }
};

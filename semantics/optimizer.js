const NumericLiteral = require('../ast/numeric-literal');
const StringLiteral = require('../ast/string-literal');
const BooleanLiteral = require('../ast/boolean-literal');

module.exports = {
  isZero(e) {
    return e instanceof NumericLiteral && e.value === 0;
  },

  isOne(e) {
    return e instanceof NumericLiteral && e.value === 1;
  },

  bothNumericLiterals(e) {
    return e.left instanceof NumericLiteral && e.right instanceof NumericLiteral;
  },

  bothStringLiterals(e) {
    return e.left instanceof StringLiteral && e.right instanceof StringLiteral;
  },

  bothBooleanLiterals(e) {
    return e.left instanceof BooleanLiteral && e.right instanceof BooleanLiteral;
  },
};

const NumLiteral = require('../ast/numeric-literal');

module.exports = {
  isZero(e) {
    return e instanceof NumLiteral && e.value === 0;
  },

  isOne(e) {
    return e instanceof NumLiteral && e.value === 1;
  },

  bothLiterals(b) {
    return b.left instanceof NumLiteral && b.right instanceof NumLiteral;
  },
};

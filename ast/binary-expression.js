const check = require("../semantics/check");
const { NumType, BooleanType, StringType } = require("../semantics/builtins");
const { isZero, isOne, bothNumericLiterals, bothStringLiterals, bothBooleanLiterals } = require('../semantics/optimizer');
const NumericLiteral = require('../ast/numeric-literal');
const StringLiteral = require('../ast/string-literal');
const BooleanLiteral = require('../ast/boolean-literal');

module.exports = class BinaryExpression {
  constructor(op, left, right) {
    Object.assign(this, { op, left, right });
  }

  analyze(context) {
    this.left.analyze(context);
    this.right.analyze(context);
    if (["<=", ">=", "<", ">"].includes(this.op)) {
      // Relational operators
      check.isNumber(this.left);
      check.isNumber(this.right);
      this.type = BooleanType;
    } else if (["!=", "==", "is"].includes(this.op)) {
      // Equality operators
      check.sameType(this.left.type, this.right.type);
      this.type = BooleanType;
    } else if (["and", "or"].includes(this.op)) {
      // Truthy and Falsy
      check.isBoolean(this.left);
      check.isBoolean(this.right);
      this.type = BooleanType;
    } else if (this.op === "+") {
      check.sameType(this.left.type, this.right.type);
      check.isNumberOrString(this.left);
      check.isNumberOrString(this.right);
      this.type = this.left.type === NumType ? NumType : StringType;
    } else {
      // Math Operations:  - * // / %
      check.sameType(this.left.type, this.right.type);
      this.type = NumType;
    }
  }

  optimize() {
    this.left = this.left.optimize();
    this.right = this.right.optimize();
    if (this.op === '!=') return new BooleanLiteral(this.left.value !== this.right.value);
    if (this.op === '==') return new BooleanLiteral(this.left.value === this.right.value);
    // eslint-disable-next-line
    if (this.op === 'is') return new BooleanLiteral(this.left.value == this.right.value);
    if ((this.op === '+' || this.op === '-') && isZero(this.right)) return this.left;
    if ((this.op === '+' || this.op === '-') && isZero(this.left)) return this.right;
    if (this.op === '*' && (isZero(this.left) || isZero(this.right))) return new NumericLiteral(0);
    if (this.op === '*' && isOne(this.right)) return this.left;
    if (this.op === '*' && isOne(this.left)) return this.right;
    if (bothNumericLiterals(this)) {
      const [x, y] = [this.left.value, this.right.value];
      if (this.op === '+') return new NumericLiteral(x + y);
      if (this.op === '-') return new NumericLiteral(x - y);
      if (this.op === '*') return new NumericLiteral(x * y);
      if (this.op === '/') return new NumericLiteral(x / y);
      if (this.op === '//') return new NumericLiteral(Math.floor(x / y));
      if (this.op === '%') return new NumericLiteral(x % y);
      if (this.op === '<=') return new BooleanLiteral(x <= y);
      if (this.op === '<') return new BooleanLiteral(x < y);
      if (this.op === '>=') return new BooleanLiteral(x >= y);
      if (this.op === '>') return new BooleanLiteral(x > y);
    } else if (bothStringLiterals(this)) {
      const [x, y] = [this.left.value, this.right.value];
      if (this.op === '+') {
        const xy = (x + y).replace(/["]+/g, '');
        return new StringLiteral(`"${xy}"`);
      }
    } else if (bothBooleanLiterals(this)) {
      const [x, y] = [this.left.value, this.right.value];
      if (this.op === 'and') return new BooleanLiteral(x && y);
      if (this.op === 'or') return new StringLiteral(x || y);
    }
    return this;
  }
};

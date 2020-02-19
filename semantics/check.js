const { NumType, StringType, BooleanType } = require("./builtins");
const ListType = require("../ast/list-type");
const SetType = require("../ast/set-type");
const DictType = require("../ast/dict-type");
const NumericLiteral = require("../ast/numeric-literal");
const StringLiteral = require("../ast/string-literal");
const BooleanLiteral = require("../ast/boolean-literal");

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

module.exports = {
  
  isListOrDict(expression) {
    doCheck(
      expression.type.constructor === ListType
        || expression.type.constructor === DictType,
      "Not a list or dictionary",
    );
    return expression.type.constructor;
  },

  isCollectionType(expression) {
    return expression.constructor === ListType
      || expression.constructor === SetType
      || expression.constructor === DictType;
  },

  isNumber(exp) {
    doCheck(exp.type === NumType, "Not a number");
  },

  isNumberOrString(exp) {
    doCheck(
      exp.type === NumType || exp.type === StringType,
      "Not an Number or string",
    );
  },

  isBoolean(exp) {
    doCheck(exp.type === BooleanType, "Not a boolean");
  },

  isAssignableTo(exp, type) {
    doCheck(
      JSON.stringify(exp.type) === JSON.stringify(type),
      "Types are not compatible",
    );
  },

  sameType(t1, t2) {
    doCheck(
      JSON.stringify(t1) === JSON.stringify(t2),
      "Types are not compatible",
    );
  },

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

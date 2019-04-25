const util = require("util");
const { NumType, StringType, BooleanType } = require("./builtins");
const ListType = require("../ast/list-type");
const SetType = require("../ast/set-type");
const DictType = require("../ast/dict-type");
const Function = require("../ast/function-object");

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function expressionsHaveTheSameType(e1, e2) {
  if (isPrimitiveType(e1) && isPrimitiveType(e2)) {
    doCheck(e1.type === e2.type, "Types must match exactly");
  } else if (isListType(e1.type) && isListType(e2.type)) {
    expressionsHaveTheSameType(e1.type, e2.type); //Type Param?
  } else if (isSetType(e1) && isSetType(e2)) {
    expressionsHaveTheSameType(e1.type, e2.type); //Type Param??
  } else if (isDictType(e1) && isDictType(e2)) {
    // TODO: check keys and values
    expressionsHaveTheSameType(e1.keyType, e2.keyType);
    expressionsHaveTheSameType(e1.valueType, e2.valueType);
  } else {
    doCheck(false, "Types must match exactly");
  }
}

module.exports = {
  isPrimitiveType(type) {
    doCheck(
      type.constructor === NumType ||
        type.constructor === StringType ||
        type.constructor === BooleanType,
      "Not a primitive type"
    );
  },

  isListType(type) {
    doCheck(type.constructor === ListType, "Not a list type");
  },

  isSetType(type) {
    doCheck(type.constructor === SetType, "Not a set type");
  },

  isDictType(type) {
    doCheck(type.constructor === DictType, "Not a dictionary type");
  },

  isList(expression) {
    doCheck(expression.type.constructor === ListType, "Not a list");
  },

  isSet(expression) {
    doCheck(expression.type.constructor === SetType, "Not a set");
  },

  isDict(expression) {
    doCheck(expression.type.constructor === DictType, "Not a dictionary");
  },

  isListOrDict(expression) {
    doCheck(
      expression.type.constructor === ListType ||
        expression.type.constructor === DictType,
      "Not a list or dictionary"
    );
    return expression.type.constructor;
  },

  isNumber(exp) {
    doCheck(exp.type === NumType, "Not a number");
  },

  isString(exp) {
    doCheck(exp.type === StringType, "Not a string");
  },

  isNumberOrString(exp) {
    doCheck(
      exp.type === NumType || exp.type === StringType,
      "Not an Number or string"
    );
  },

  isBoolean(exp) {
    doCheck(exp.type === BooleanType, "Not a boolean");
  },

  isFunction(val) {
    doCheck(val.constructor === Function, "Not a function");
  },

  isAssignableTo(exp, type) {
    console.log(exp.type);
    doCheck(
      JSON.stringify(exp.type) === JSON.stringify(type),
      `Expression of type ${util.format(
        exp.type
      )} not compatible with type ${util.format(type)}`
    );
  },

  legalArguments(args, params) {
    doCheck(
      args.length === params.length,
      `Expected ${params.length} args in call, got ${args.length}`
    );
    args.forEach((arg, i) => this.isAssignableTo(arg, params[i].type));
  },
};

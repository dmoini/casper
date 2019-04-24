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

  // TODO: isFieldOfRecord equivalent
  // NOTE: would this be checking if there exists a value within a dict?

  // expressionsHaveTheSameType(e1, e2) {
  //   doCheck(e1.type === e2.type, 'Types must match exactly');
  // },

  // TODO: check to see if works
  expressionsHaveTheSameType(e1, e2) {
    if (this.isPrimitiveType(e1) && this.isPrimitiveType(e2)) {
      doCheck(e1.type === e2.type, "Types must match exactly");
    } else if (this.isListType(e1.type) && this.isListType(e2.type)) {
      this.expressionsHaveTheSameType(e1.type, e2.type); //Type Param?
    } else if (this.isSetType(e1) && this.isSetType(e2)) {
      this.expressionsHaveTheSameType(e1.type, e2.type); //Type Param??
    } else if (this.isDictType(e1) && this.isDictType(e2)) {
      // TODO: check keys and values
      this.expressionsHaveTheSameType(e1.keyType, e2.keyType);
      this.expressionsHaveTheSameType(e1.valueType, e2.valueType);
    } else {
      doCheck(false, "Types must match exactly");
    }
  },

  isAssignableTo(exp, type) {
    doCheck(
      exp.type === type,
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

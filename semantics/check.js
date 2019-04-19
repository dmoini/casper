const util = require('util');

const {
  NumType, StringType, BooleanType,
} = require('./builtins');

const ListType = require('../ast/list-type');
const SetType = require('../ast/set-type');
const Function = require('../ast/function-object');


function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

module.exports = {
  isListType(type) {
    doCheck(type.constructor === ListType, 'Not a list type');
  },

  isSetType(type) {
    doCheck(type.constructor === SetType, 'Not a set type');
  },

  // TODO: add isDictType

  // TODO: add isRecordType (objects

  // TODO: add isFieldOfRecord

  isNumber(type) {
    doCheck(type.constructor === NumType, 'Not a number');
  },

  isString(exp) {
    doCheck(exp.type === StringType, 'Not a string');
  },

  isNumberOrString(exp) {
    doCheck(
      exp.type === NumType || exp.type === StringType,
      'Not an Number or string',
    );
  },
  isBoolean(exp) {
    doCheck(exp.type === BooleanType, 'Not a boolean');
  },

  isFunction(val) {
    doCheck(val.constructor === Function, 'Not a function');
  },

  expressionsHaveTheSameType(e1, e2) {
    doCheck(e1.type === e2.type, 'Types must match exactly');
  },

  isAssignableTo(exp, type) {
    doCheck(exp.type === type, `Expression of type ${util.format(exp.type)} not compatible with type ${util.format(type)}`);
  },
  // Do we need isNotReadOnly?

  legalArguments(args, params) {
    doCheck(args.length === params.length,
      `Expected ${params.length} args in call, got ${args.length}`);
    args.forEach((arg, i) => this.isAssignableTo(arg, params[i].type));
  },

};

const PrimitiveType = require("../ast/primitive-types");

const NumType = new PrimitiveType("num");
const StringType = new PrimitiveType("string");
const BooleanType = new PrimitiveType("boo");
const VoidType = new PrimitiveType("void");

const StandardFunctions = [];

module.exports = {
  StandardFunctions,
  NumType,
  StringType,
  BooleanType,
  VoidType,
};

const PrimitiveType = require("../ast/primitive-types");
const Func = require("../ast/function-object");
const Param = require("../ast/parameter");

const NumType = new PrimitiveType("num");
const StringType = new PrimitiveType("string");
const BooleanType = new PrimitiveType("boo");

const StandardFunctions = [
  new Func("void", "print", [new Param(StringType, "s")]),
  new Func("void", "exit", [new Param(NumType, "code")]),
];

const StringFunctions = [
  new Func(
    StringType,
    "substring",
    [
      new Param("s", StringType),
      new Param("start", NumType),
      new Param("end", NumType),
    ],
    StringType
  ),
];

const MathFunctions = [
  new Func(NumType, "abs", [new Param(NumType, "n")]),
  new Func(NumType, "sqrt", [new Param(NumType, "n")]),
  new Func(NumType, "pi", []),
  new Func(NumType, "random", [
    new Param(NumType, "start"),
    new Param(NumType, "end"),
  ]),
  new Func(NumType, "pow", [new Param(NumType, "x"), new Param(NumType, "y")]),
];

// const ListFunctions;

// const SetFunctions;

// const DictFunctions;

module.exports = {
  NumType,
  StringType,
  BooleanType,
  StandardFunctions,
  StringFunctions,
  MathFunctions,
};

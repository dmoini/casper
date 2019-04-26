/*
 * Semantic Analysis Tests
 *
 * Tests that the semantic analysis phase decorates the AST as expected for
 * semantically correct programs, and enforces static semantic rules by
 * throwing the expected errors.
 */

const argument = require("../../ast/argument");
const assignmentStatement = require("../../ast/assignment-statement");

const errors = {
  "break-outside-of-loop.error": "break outside of loop",
  "incompatible-func-return-types.error": "Incorrect function return type",
  "list-incorrect-type.error": "Types are not compatible",
  "list-mixed-types.error": "list mixed type",
  "num-assigned-to-list.error": "Types are not compatible",
  "num-assigned-to-string": "Types are not compatible",
  "num-plus-string.error": "Types are not compatible",
  "reused-var-declaration.error": "Identifier already declared in this scope",
  "string-assigned-to-list.error": "Types are not compatible",
  "string-assigned-to-num.error": "Types are not compatible",
  "binary-exp.error": "Not a number",
  "var-incorrect-type-reassignment.error": "Types are not compatible",
  "var-not-declared.error": "Variable has not been declared",
  "var-out-of-function-scope.error": "Variable has not been declared",
  "var-redeclared-in-function.error":
    "Identifier already declared in this scope",
  "set-improper.error": "set mixed type",
  "subscripted-wrong-type.error": "Not a list or dictionary",
  "while-loop-break.error": "break outside of loop",
  "unary-wrong-type.error": "improper type of operand",
};

const Context = require("../../semantics/context");

const fs = require("fs");
const parse = require("../../syntax/parser");

describe("The semantic analyzer", () => {
  fs.readdirSync(__dirname).forEach(name => {
    if (name.endsWith(".error")) {
      test(`detected in ${name}`, done => {
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, "utf-8"));
        const errorPattern = errors[name];
        expect(() =>
          program.analyze(Context.INITIAL.createChildContextForBlock())
        ).toThrow(errorPattern);
        done();
      });
    } else if (name.endsWith(".boo")) {
      test(`should analyze ${name} without errors`, done => {
        // For now, we are happy to know that these files pass semantic analysis.
        // We eventually need to check that the ASTs are properly decorated.
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, "utf-8"));
        program.analyze(Context.INITIAL.createChildContextForBlock());
        done();
      });
    }
  });
});

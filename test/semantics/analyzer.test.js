/*
 * Semantic Analysis Tests
 *
 * Tests that the semantic analysis phase decorates the AST as expected for
 * semantically correct programs, and enforces static semantic rules by
 * throwing the expected errors.
 */

const fs = require("fs");
const parse = require("../../syntax/parser");
const Context = require("../../semantics/context");

const errors = {
  "argument-parameter-types-mismatch": "Argument and parameter types do not match",
  "break-outside-of-loop": "Break outside of loop",
  "function-no-return": "No return statement found",
  "incompatible-func-return-types": "Incorrect function return type",
  "incorrect-number-of-arguments": "Incorrect number of arguments",
  "incorrect-binary-exp": "Not a number",
  "list-incorrect-type": "Types are not compatible",
  "list-mixed-types": "List mixed types",
  "mismatched-assignment-length": "Number of ids does not equal number of exps",
  "num-assigned-to-list": "Types are not compatible",
  "num-assigned-to-string": "Types are not compatible",
  "num-plus-string": "Types are not compatible",
  "return-outside-of-function": "Return statement not in function",
  "reused-var-declaration": "Identifier already declared in this scope",
  "set-improper": "Set mixed types",
  "string-assigned-to-list": "Types are not compatible",
  "string-assigned-to-num": "Types are not compatible",
  "subscripted-wrong-type": "Not a list or dictionary",
  "ternary-test-not-boolean": "Not a boolean",
  "unary-wrong-boo-type": "Not a boolean",
  "unary-wrong-num-type": "Not a number",
  "var-incorrect-type-reassignment": "Types are not compatible",
  "var-not-declared": "Variable has not been declared",
  "var-out-of-function-scope": "Variable has not been declared",
  "var-redeclared-in-function": "Identifier already declared in this scope",
  "void-function-with-return": "Void functions cannot have return statements",
  "while-loop-break": "Break outside of loop",
};


describe("The semantic analyzer", () => {
  fs.readdirSync(__dirname).forEach((name) => {
    if (name.endsWith(".error")) {
      test(`detected in ${name}`, (done) => {
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, "utf-8"));
        const errorPattern = errors[name.slice(0, name.length - 6)];
        // eslint-disable-next-line no-undef
        expect(() => program.analyze(Context.INITIAL.createChildContextForBlock()))
          .toThrow(errorPattern);
        done();
      });
    } else if (name.endsWith(".boo")) {
      test(`should analyze ${name} without errors`, (done) => {
        // For now, we are happy to know that these files pass semantic analysis.
        // We eventually need to check that the ASTs are properly decorated.
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, "utf-8"));
        program.analyze(Context.INITIAL.createChildContextForBlock());
        done();
      });
    }
  });
});

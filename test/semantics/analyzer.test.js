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
  "break-outside-of-loop": "Break outside of loop",
  "incompatible-func-return-types": "Incorrect function return type",
  "list-incorrect-type": "Types are not compatible",
  "list-mixed-types": "List mixed types",
  "num-assigned-to-list": "Types are not compatible",
  "num-assigned-to-string": "Types are not compatible",
  "num-plus-string": "Types are not compatible",
  "reused-var-declaration": "Identifier already declared in this scope",
  "mismatched-assignment-length": "Number of ids does not equal number of exps",
  "string-assigned-to-list": "Types are not compatible",
  "string-assigned-to-num": "Types are not compatible",
  "incorrect-binary-exp": "Not a number",
  "var-incorrect-type-reassignment": "Types are not compatible",
  "var-not-declared": "Variable has not been declared",
  "var-out-of-function-scope": "Variable has not been declared",
  "var-redeclared-in-function":
    "Identifier already declared in this scope",
  "set-improper": "Set mixed types",
  "subscripted-wrong-type": "Not a list or dictionary",
  "while-loop-break": "Break outside of loop",
  "unary-wrong-boo-type": "Not a boolean",
  "unary-wrong-num-type": "Not a number",
  "incorrect-number-of-arguments": "Incorrect number of arguments",
  "argument-parameter-types-mismatch": "Argument and parameter types do not match",
  "void-function-with-return": "Void functions cannot have return statements",
  "function-no-return": "No return statement found",
  "return-outside-of-function": "Return statement not in function",
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

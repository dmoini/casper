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
  //   "list-incorrect-type.error": "Incorrect list type",
  //   "list-mixed-types.error": "Incorrect list type",
};

const Context = require("../../semantics/context");

const fs = require("fs");
const parse = require("../../syntax/parser");

describe("The semantic analyzer", () => {
  fs.readdirSync(__dirname).forEach(name => {
    if (name.endsWith(".error")) {
      test(`detects a ${errors[name]}`, done => {
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, "utf-8"));
        const errorPattern = errors[name];
        expect(() => program.analyze(Context.INITIAL)).toThrow(errorPattern);
        done();
      });
    }
    // else if (name.endsWith(".boo")) {
    //   test(`should analyze ${name} without errors`, done => {
    //     // For now, we are happy to know that these files pass semantic analysis.
    //     // We eventually need to check that the ASTs are properly decorated.
    //     const program = parse(fs.readFileSync(`${__dirname}/${name}`, "utf-8"));
    //     program.analyze(Context.INITIAL);
    //     done();
    //   });
    // }
  });
});

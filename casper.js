#!/usr/bin/env node

/*
 * A Casper Compiler
 *
 * This is a command line application that compiles a Casper program from
 * a file. Synopsis:
 *
 * ./casper.js -a <filename>
 *     writes out the AST and stops
 *
 * ./casper.js -i <filename>
 *     writes the decorated AST then stops
 *
 * ./casper.js <filename>
 *     compiles the Casper program to JavaScript, writing the generated
 *     JavaScript code to standard output.
 *
 * ./casper.js -o <filename>
 *     optimizes the intermediate code before generating target JavaScript.
 *
 * Output of the AST and decorated AST uses the object inspection functionality
 * built into Node.js.
 */

const fs = require("fs");
const util = require("util");
const yargs = require("yargs");
const parse = require("./syntax/parser");
const Context = require("./semantics/context");
const generate = require("./backend/javascript-generator");
// require('./backend/javascript-generator');

// If compiling from a string, return the AST, IR, or compiled code as a string.
function compile(sourceCode, { astOnly, frontEndOnly, shouldOptimize }) {
  let program = parse(sourceCode);
  if (astOnly) {
    return util.inspect(program, { depth: null });
  }
  program.analyze(Context.INITIAL);
  if (shouldOptimize) {
    program = program.optimize();
  }
  if (frontEndOnly) {
    return util.inspect(program, { depth: null });
  }
  return generate(program);
}

// If compiling from a file, write to standard output.
function compileFile(filename, options) {
  fs.readFile(filename, "utf-8", (error, sourceCode) => {
    if (error) {
      console.error(error);
      return;
    }

    console.log(compile(sourceCode, options));
  });
}

module.exports = { compile, compileFile };

// If running as a script, we have a lot of command line processing to do. The source
// program will come from the file who name is given as the command line argument.
if (require.main === module) {
  const { argv } = yargs
    .usage("$0 [-a] [-o] [-i] filename")
    .boolean(["a", "o", "i"])
    .describe("a", "show abstract syntax tree after parsing then stop")
    .describe("o", "do optimizations")
    .describe(
      "i",
      "generate and show the decorated abstract syntax tree then stop",
    )
    .demand(1);
  compileFile(argv._[0], {
    astOnly: argv.a,
    frontEndOnly: argv.i,
    shouldOptimize: argv.o,
  });
}

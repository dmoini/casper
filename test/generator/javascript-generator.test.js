
/*
 * JavaScript Code Generator Tests
 *
 * These tests check that the JavaScript generator produces the target
 * JavaScript that we expect.
 */

const parse = require('../../syntax/parser');
// const analyze = require('../../ast/index');
const generate = require('../../backend/javascript-generator');
const Context = require("../../semantics/context");

const fixture = {
  // hello: [
  //   String.raw`print("Hello, world\n")`,
  //   String.raw`console.log("Hello, world\n")`,
  // ],

  arithmetic: [
    String.raw`5 * -2 + 8`,
    String.raw`((5 * (-2)) + 8);`,
  ],

  letAndAssign: [
    String.raw`num x = 2
x = 3`,
    /let x_(\d+) = 2;\s*x_\1 = 3;/,
  ],

  call: [
    String.raw`num f(num x, string y):
    return x
f(1, "")`,
    /function f_(\d+)\(x_(\d+), y_\d+\) \{\s*return x_\2;\s*\};\s*f_\1\(1, ""\);/,
  ],

  whileLoop: [
    String.raw`while(true):
  break`,
    /while \(true\) \{\s*break;\s*\};/,
  ],

  forLoop: [
    String.raw`for i from 0 to 10 by 2:
  num j = 2`,
    /for \(let i_(\d+) = 0; i_\1 <= 10; i_\1 \+= 2\) \{\s*let j_\d+ = 2\s*\};/,
  ],

  ifStatement: [
    String.raw`if 1 < 2:
  1`,
    /if \(\(1 < 2\)\) \{\s*1;\s*\};/,
  ],

  ifElseIfStatement: [
    String.raw`if 1 < 2:
  1
else if 1 > 2:
  2`,
    /if \(\(1 < 2\)\) \{\s*1;\s*\} else if \(\(1 > 2\)\) \{\s*2;\s*\};/,
  ],

  ifElseIfElseStatement: [
    String.raw`if 1 < 2:
  1
else if 1 > 2:
  2
else:
  3`,
    /if \(\(1 < 2\)\) \{\s*1;\s*\} else if \(\(1 > 2\)\) \{\s*2;\s*\} else \{\s*3;\s*\};/,
  ],

  // member: [
  //   String.raw`let type r = {x:string} var p := r{x="@"} in print(p.x) end`,
  //   /let p_(\d+) = \{\s*x: "@"\s*\};\s*console.log\(p_\1\.x\)/,
  // ],

  // subscript: [
  //   String.raw`let type r = array of string var a := r[3] of "" in print(a[0]) end`,
  //   /let a_(\d+) = Array\(3\).fill\(""\);\s*console.log\(a_\1\[0\]\)/,
  // ],

  // letInFunction: [
  //   String.raw`let function f():int = let var x:= 1 in x end in () end`,
  //   /function f_(\d+)\(\) \{\s*let x_(\d+) = 1;\s*return x_\2\s*\};/,
  // ],

  // letAsValue: [
  //   String.raw`print(let var x := "dog" in concat(x, "s") end)`,
  //   /console.log\(\(\(\) => \{\s*let x_(\d+) = "dog";\s*return x_\1.concat\("s"\);\s*\}\)\(\)\)/,
  // ],

  // returnExpressionSequence: [
  //   String.raw`let function f():int = let var x:= 1 in (1;nil;3) end in () end`,
  //   /function f_(\d+)\(\) {\s*let x_(\d+) = 1;\s*1;\s*null;\s*return 3\s*\};/,
  // ],

  // moreBuiltIns: [
  //   String.raw`(ord("x"); chr(30); substring("abc", 0, 1))`,
  //   /\("x"\).charCodeAt\(0\);\s*String.fromCharCode\(30\);\s*"abc".substr\(0, 1\)/,
  // ],

  // evenMoreBuiltIns: [
  //   String.raw`(not(1) ; size(""); exit(3))`,
  //   /\(!\(1\)\);\s*"".length;\s*process\.exit\(3\)/,
  // ],
};

describe('The JavaScript generator', () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct output for ${name}`, (done) => {
      const ast = parse(source);
      // console.log('AST   ', ast);
      ast.analyze(Context.INITIAL);
      console.log("GENERATE", generate(ast));
      console.log("EXPECTED", expected);
      // eslint-disable-next-line no-undef
      expect(generate(ast)).toMatch(expected);
      // console.log('GENERATE     ', generate(ast));
      done();
    });
  });
});

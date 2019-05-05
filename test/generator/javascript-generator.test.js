/*
 * JavaScript Code Generator Tests
 *
 * These tests check that the JavaScript generator produces the target
 * JavaScript that we expect.
 */

// const parse = require('../../syntax/parser');
// const analyze = require('../../ast/index');
// const generate = require('../../backend/javascript-generator');
// const Context = require("../../semantics/context");

// const fixture = {
//   hello: [
//     String.raw`print("Hello, world\n")`,
//     String.raw`console.log("Hello, world\n")`,
//   ],

// arithmetic: [
//   String.raw`5 * -2 + 8`,
//   String.raw`((5 * (-(2))) + 8)`,
// ],

// letAndAssign: [
//   String.raw`let var x := 3 in x := 2 end`,
//   /let x_(\d+) = 3;\s+x_\1 = 2/,
// ],

// call: [
//   String.raw`let function f(x: int, y: string) = () in f(1, "") end`,
//   /function f_(\d+)\(x_\d+, y_\d+\) \{\s*};\s*f_\1\(1, ""\)/,
// ],

// whileLoop: [
//   String.raw`while 7 do break`,
//   /while \(7\) \{\s*break\s*\}/,
// ],

// forLoop: [
//   String.raw`for i := 0 to 10 do ()`,
//   /let hi_(\d+) = 10;\s*for \(let i_(\d+) = 0; i_\2 <= hi_\1; i_\2\+\+\) \{\s*\}/,
// ],

// ifThen: [
//   String.raw`if 3 then 5`,
//   '((3) ? (5) : (null))',
// ],

// ifThenElse: [
//   String.raw`if 3 then 5 else 8`,
//   '((3) ? (5) : (8))',
// ],

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
// };

// describe('The JavaScript generator', () => {
//   Object.entries(fixture).forEach(([name, [source, expected]]) => {
//     test(`produces the correct output for ${name}`, (done) => {
//       const ast = parse(source);
//       console.log(ast);
//       ast.analyze(Context.INITIAL);
//       // eslint-disable-next-line no-undef
//       expect(generate(ast)).toMatch(expected);
//       console.log(generate(ast));
//       done();
//     });
//   });
// });

/*
 * Generator Tests
 *
 * Tests that the generated target code, when run, produces the expected output.
 */

const fs = require('fs');
// const assert = require('assert');
const { spawn } = require('child_process');
const { compile } = require('../../casper');

describe('The code generator', () => {
  fs.readdirSync(__dirname).forEach((name) => {
    if (name.endsWith('.boo')) {
      test(`produces a behaviorally correct target for ${name}`, (done) => {
        fs.readFile(`${__dirname}/${name}`, 'utf-8', (err, input) => {
          const target = compile(input, {});
          const child = spawn('node', ['-e', target]);
          let output = '';
          child.stdout.on('data', (data) => { output += data; });
          child.on('close', () => {
            fs.readFile(`${__dirname}/${name}.expected`, 'utf-8', (_err, expected) => {
              // eslint-disable-next-line no-undef
              expect(output).toEqual(expected);
              // assert.deepEqual(output, expected);
              done();
            });
          });
        });
      });
    }
  });
});

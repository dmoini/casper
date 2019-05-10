const parse = require('../../syntax/parser');
const generate = require('../../backend/javascript-generator');
const Context = require("../../semantics/context");

const fixture = {
  mathBinaryOps: [
    String.raw`num x = 2 + 3 - 4 * 5 / 2`,
    /let x_(\d+) = -5;/,
  ],

  ifBoolOperationss: [
    String.raw`if(4>3):
  5<3`,
    /if \(true\) {\s*false;\s*};/,
  ],

  andOr: [
    String.raw`boo twoThreeFour = (2 < 3 and 3 < 4)
boo trueOrFalse = true or false`,
    /let twoThreeFour_\d+ = true;\s*let trueOrFalse_\d+ = true;/,
  ],

  noOptimization: [
    String.raw`boo nothing = true`,
    /let nothing_\d+ = true;/,
  ],

  stringConcatenation: [
    String.raw`string truth = "forney " + "is " + "a " + "hustler!"`,
    /let truth_\d+ = "forney is a hustler!";/,
  ],

  allBinaryExpressions: [
    String.raw`if ("toal" == "cool"):
  0 != 0
  1 == 1
  2 is 2
  0 + 0
  1 + 0
  0 + 2
  0 * 3
  3 * 0
  3 * 1
  1 * 3
  2 + 2
  8 - 3
  3 * 2
  14 / 2
  16 // 2
  19 % 10
  2 <= 3
  2 < 3
  2 >= 3
  2 > 3
  "toal = " + "cool"
  true and true
  false or false`,
    /if \(false\) \{\s*false;\s*true;\s*true;\s*0;\s*1;\s*2;\s*0;\s*0;\s*3;\s*3;\s*4;\s*5;\s*6;\s*7;\s*8;\s*9;\s*true;\s*true;\s*false;\s*false;\s*"toal = cool";\s*true;\s*false;\s*\};/,
  ],

  unaryExpressions: [
    String.raw`while (!false):
  not true
  3 + -2 - -9
  -3 * 3`,
    /while \(true\) {\s*false;\s*10;\s*- 9;\s*\};/,
  ],

  variableDeclarationAndAssignment: [
    String.raw`num a = 12 * 10
string b = "apple" + "sauce"
boo c = true and false
a = 8 / 4
b = "sauce" + "apple"
c = true or false`,
    /let a_(\d+) = 120;\s*let b_(\d+) = "applesauce";\s*let c_(\d+) = false;\s*a_\1 = 2;\s*b_\2 = "sauceapple";\s*c_\3 = true;/,
  ],

  callArguments: [
    String.raw`num sum(num x, num y, num z):
  return x + y + z

sum(2 * 4, 6 - 9, 12 % 5)`,
    /function sum_(\d+)\(x_(\d+), y_(\d+), z_(\d+)\) \{\s*return \(\(x_\2 \+ y_\3\) \+ z_\4\);\s*\};\s*sum_\1\(8, -3, 2\);/,
  ],

  fromLoop: [
    String.raw`for i from (3 - 3) to (20 / 2) by 2:
  print(2 - 3)
  print("toal is" + " cool")`,
    /for \(let i_(\d+) = 0; i_\1 <= 10; i_\1 \+= 2\) \{\s*console\.log\(-1\);\s*console\.log\("toal is cool"\);\s*\};/,
  ],

  listDeclarationAndSubscriptedExpression: [
    String.raw`list<num> l = [1 - 1, -2 + 3, 5 // 2]
l[12 - 10] = 12 % 7`,
    /let l_(\d+) = \[\s*0,\s*1\s*,\s*2\s*\];\s*l_\1\[2\] = 5;/,
  ],

  breakStatement: [
    String.raw`for i from 0 to 1:
  break`,
    /for \(let i_(\d+) = 0; i_\1 <= 1; i_\1 \+= 1\) \{\s*break;\s*\};/,
  ],

  dictExpression: [
    String.raw`dict<num, num> numbersAreCool = {1:2, 3:4}`,
    /let numbersAreCool_\d+ = \{\s*1: 2,\s*3: 4\s*\};/,
  ],

  setExpression: [
    String.raw`set<num> superSet = set(1 + 4, 3 + 3, 12 * 4)`,
    /let superSet_\d+ = new Set\(\[\s*5,\s*6,\s*48\s*\]\);/,
  ],

  functionAndReturn: [
    String.raw`num arithmetic():
  return 1 + 4 - (3 * 3) / (4 // 3)`,
    /function arithmetic_\d+\(\) \{\s*return -4;\s*\};/,
  ],

  ternary: [
    String.raw`12 / 4 if (true and false) else 82 // 5`,
    String.raw`false ? 3 : 16;`,
  ],
};

describe('The Optimize JavaScript generator', () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct output for ${name}`, (done) => {
      let ast = parse(source);
      ast.analyze(Context.INITIAL);
      ast = ast.optimize();
      // eslint-disable-next-line no-undef
      expect(generate(ast)).toMatch(expected);
      done();
    });
  });
});

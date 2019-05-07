
/*
 * JavaScript Code Generator Tests
 *
 * These tests check that the JavaScript generator produces the target
 * JavaScript that we expect.
 */

const parse = require('../../syntax/parser');
const generate = require('../../backend/javascript-generator');
const Context = require("../../semantics/context");

const fixture = {
  argument: [
    String.raw`string concat(string s, string t):
  return s + t

concat("hello", "world")`,
    /function concat_(\d+)\(s_(\d+), t_(\d+)\) {\s*return \(s_\2 \+ t_\3\);\s*\};\s*concat_\1\("hello", "world"\);/,
  ],

  letAndAssignment: [
    String.raw`num x = 2
x = 3`,
    /let x_(\d+) = 2;\s*x_\1 = 3;/,
  ],

  assignment: [
    String.raw`num compilers = 2
compilers = 3
list<num> listy = [1, 2, 3]
listy[0] = 9001`,
    /let compilers_(\d+) = 2;\s*compilers_\1 = 3;\s*let listy_(\d+) = \[\s*1,\s*2,\s*3\s*\];\s*listy_\2\[0\] = 9001;/,
  ],

  binary: [
    String.raw`2 <= 5
4 != 12
true and true
"hello" + "World"
2 + 10
(9 / 3) + ((2 * 6) % 4) - 1`,
    String.raw`(2 <= 5);
(4 != 12);
(true && true);
("hello" + "World");
(2 + 10);
(((9 / 3) + ((2 * 6) % 4)) - 1);`,
  ],

  whileLoopWithBreak: [
    String.raw`while(true):
  break`,
    /while \(true\) \{\s*break;\s*\};/,
  ],

  call: [
    String.raw`num f(num x, string y):
    return x
f(1, "")`,
    /function f_(\d+)\(x_(\d+), y_\d+\) \{\s*return x_\2;\s*\};\s*f_\1\(1, ""\);/,
  ],

  dictExpression: [
    String.raw`dict<string, string> d = {"forney": "hustler", "toal": "wizard"}`,
    /let d_\d+ = \{\s*forney: "hustler",\s*toal: "wizard"\s*\};/,
  ],

  forLoop: [
    String.raw`for i from 0 to 10:
  print("Hi Toal :)")`,
    /for \(let i_(\d+) = 0; i_\1 <= 10; i_\1 \+= 1\) \{\s*console.log\("Hi Toal :\)"\)\s*\};/,
  ],

  forLoopWithIncrement: [
    String.raw`for i from 0 to 10 by 2:
  print("Hi Toal :)")`,
    /for \(let i_(\d+) = 0; i_\1 <= 10; i_\1 \+= 2\) \{\s*console.log\("Hi Toal :\)"\)\s*\};/,
  ],

  functionDeclaration: [
    String.raw`boo isEven(num x):
  return x % 2 == 0`,
    /function isEven_\d+\(x_(\d+)\) \{\s*return \(\(x_\1 % 2\) === 0\);\s*\};/,
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

  listExpression: [
    String.raw`list<num> sortedGrades = [100, 98, 93, 88, 86]
num highestGrade = sortedGrades[0]`,
    /let sortedGrades_(\d+) = \[\s*100,\s*98,\s*93,\s*88,\s*86\s*\];\s*let highestGrade_\d+ = sortedGrades_\1\[0\];/,
  ],

  setExpression: [
    String.raw`set<string> coolProfessors = set("Dondi", "Toal", "BJ")`,
    /let coolProfessors_\d+ = new Set\(\[\s*"Dondi",\s*"Toal",\s*"BJ"\s*\]\);/,
  ],

  ternaryExpression: [
    String.raw`print(2) if 2 < 3 else print(3)`,
    String.raw`(2 < 3) ? console.log(2) : console.log(3);`,
  ],

  print: [
    String.raw`print("Can we get an extra point back :)")`,
    String.raw`console.log("Can we get an extra point back :)");`,
  ],

  exit: [
    String.raw`exit(0)`,
    String.raw`process.exit(0);`,
  ],

  len: [
    String.raw`string s = "apple"
num s_len = len(s)`,
    /let s_(\d+) = "apple";\s*let s_len_\d+ = s_\1.length;/,
  ],

  substring: [
    String.raw`string c = "casper"
string casp = substring(c, 0, 4)`,
    /let c_(\d+) = "casper";\s*let casp_\d+ = c_\1\.substring\(0, 4\);/,
  ],

  charAt: [
    String.raw`string alpha = "abcde"
string a = charAt(alpha, 0)`,
    /let alpha_(\d+) = "abcde";\s*let a_\d+ = alpha_\1\.charAt\(0\);/,
  ],

  ord: [
    String.raw`num n = ord("z")`,
    /let n_\d+ = "z"\.charCodeAt\(0\);/,
  ],

  abs: [
    String.raw`num ten = abs(-10)`,
    /let ten_\d+ = Math\.abs\(\(-10\)\);/,
  ],

  sqrt: [
    String.raw`num sixteen = sqrt(256)`,
    /let sixteen_\d+ = Math\.sqrt\(256\);/,
  ],

  piAndPow: [
    String.raw`num areaOfCircle(num r):
  return pi() * pow(r, 2)`,
    /function areaOfCircle_\d+\(r_(\d+)\) \{\s*return \(Math\.PI \* Math\.pow\(r_\1, 2\)\);\s*\};/,
  ],

  random: [
    String.raw`num r = random(0, 100)`,
    /let r_\d+ = Math\.floor\(Math\.random\(\) \* \(Math\.max\(0, 100\) - Math\.min\(0, 100\) \+ 1\) \+ Math\.min\(0, 100\)\);/,
  ],

  helloWorld: [
    String.raw`void helloWorld():
  print("Hello world!")`,
    /function helloWorld_\d+\(\) \{\s*console\.log\("Hello world!"\);\s*\};/,
  ],

  averageGrade: [
    String.raw`num average(list<num> l):
  num sum = 0
  for i from 0 to len(l):
    sum = sum + l[i]
  return sum / len(l)
list<num> grades = [100, 90, 80, 70, 60]
num averageGrade = average(grades)`,
    /function average_(\d+)\(l_(\d+)\) \{\s*let sum_(\d+) = 0;\s*for \(let i_(\d+) = 0; i_\4 <= l_\2\.length; i_\4 \+= 1\) \{\s*sum_\3 = \(sum_\3 \+ l_\2\[i_\4\]\)\s*\};\s*return \(sum_\3 \/ l_\2\.length\);\s*\};\s*let grades_(\d+) = \[\s*100,\s*90,\s*80,\s*70,\s*60\s*\];\s*let averageGrade_\d+ = average_\1\(grades_\5\);/,
  ],
};

describe('The JavaScript generator', () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct output for ${name}`, (done) => {
      const ast = parse(source);
      ast.analyze(Context.INITIAL);
      // eslint-disable-next-line no-undef
      expect(generate(ast)).toMatch(expected);
      done();
    });
  });
});

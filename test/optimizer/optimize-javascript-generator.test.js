const parse = require('../../syntax/parser');
const generate = require('../../backend/javascript-generator');
const Context = require("../../semantics/context");
// const optimize = require("../../semantics/optimizer"); 

const fixture = {
  mathBinaryOps: [
    String.raw`num x = 2 + 3 - 4 * 5 / 2`,
    /let x_(\d+) = -5;/,
  ],
  ifBoolOps: [String.raw`if(4>3):
  5<3`,
  /if \(true\) {\s*false;\s*};/,
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

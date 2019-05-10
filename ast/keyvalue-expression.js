/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
module.exports = class KeyValueExpression {
  constructor(key, value) {
    Object.assign(this, { key, value });
  }


  analyze(context) {
    // NOTE: Intentionally left blank
  }

  // optimize() {
  //   return this;
  // }
};

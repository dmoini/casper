/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
module.exports = class PrimitiveType {
  constructor(name) {
    Object.assign(this, { name });
  }

  analyze(context) {
    // NOTE: intentionally left blank
  }

  optimize() {
    return this;
  }
};

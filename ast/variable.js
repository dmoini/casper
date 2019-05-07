/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
module.exports = class Variable {
  constructor(type, id) {
    Object.assign(this, { type, id });
  }

  analyze(context) {
    // NOTE: left intentionally blank
    // context.add(this);
  }
};

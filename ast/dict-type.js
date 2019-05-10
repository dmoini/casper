/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
module.exports = class DictType {
  constructor(keyType, valueType) {
    Object.assign(this, { keyType, valueType });
  }

  analyze(context) {
    // NOTE: intentionally left blank
  }

  optimize() {
    return this;
  }
};

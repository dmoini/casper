/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
module.exports = class SetType {
  constructor(memberType) {
    Object.assign(this, { memberType });
  }

  analyze(context) {
    // NOTE: intentionally left blank
  }

  // optimize() {
  //   return this;
  // }
};

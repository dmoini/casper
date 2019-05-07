/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
module.exports = class ListType {
  constructor(memberType) {
    Object.assign(this, { memberType });
  }

  analyze(context) {
    // this.memberType = context.lookupType(this.memberType);
    // NOTE: intentionally left blank
  }
};

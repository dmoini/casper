module.exports = class ListType {
  constructor(memberType) {
    Object.assign(this, { memberType });
  }

  analyze(context) {
    this.memberType = context.lookupType(this.memberType);
  }
};

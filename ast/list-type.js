module.exports = class ListType {
  constructor(memberType) {
    Object.assign(this, { memberType });
  }

  analyze() {
    this.memberType = context.lookupType(this.memberType);
  }
};

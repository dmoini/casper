module.exports = class ListType {
  constructor(memberType) {
    Object.assign(this, { memberType });
  }

  // TODO
  analyze() {
    this.memberType = context.lookupType(this.memberType);
  }
};

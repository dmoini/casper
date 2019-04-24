module.exports = class SetType {
  constructor(memberType) {
    Object.assign(this, { memberType });
  }

  analyze() {
    this.memberType = context.lookupType(this.memberType);
  }
};

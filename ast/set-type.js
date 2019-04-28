module.exports = class SetType {
  constructor(memberType) {
    Object.assign(this, { memberType });
  }

  analyze(context) {
    this.memberType = context.lookupType(this.memberType);
  }
};

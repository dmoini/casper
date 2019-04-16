module.exports = class ListType {
  constructor(memberType) {
    Object.assign(this, { memberType });
  }
  analyze() {}
};

// Do we need this?

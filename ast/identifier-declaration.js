/* eslint-disable no-unused-vars */
module.exports = class IdentifierDeclaration {
  constructor(id) {
    this.id = id;
  }


  // eslint-disable-next-line class-methods-use-this
  analyze(context) {
    // NOTE: intentionally left blank
  }

  optimize() {
    return this;
  }
};

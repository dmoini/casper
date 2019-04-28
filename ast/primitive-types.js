module.exports = class PrimitiveType {
  constructor(name) {
    Object.assign(this, { name });
  }

  // eslint-disable-next-line class-methods-use-this
  analyze(context) {
    // Note: intentionally left blank
  }
};

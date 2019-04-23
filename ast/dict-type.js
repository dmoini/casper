module.exports = class DictType {
  constructor(keyType, valueType) {
    Object.assign(this, { keyType, valueType });
  }

  // TODO: Check for correctness
  analyze(context) {
    this.keyType.analyze(context);
    this.valueType.analyze(context);
  }
};

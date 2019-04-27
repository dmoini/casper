module.exports = class DictType {
  constructor(keyType, valueType) {
    Object.assign(this, { keyType, valueType });
  }

  analyze(context) {
    this.keyType = context.lookupType(this.keyType);
    console.log("KEYTYPE:", this.keyType);
    this.valueType = context.lookupType(this.valueType);
  }
};

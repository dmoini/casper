module.exports = class IdentifierExpression {
  constructor(id) {
    this.id = id;
  }

  analyze(context) {
    this.ref = context.lookupValue(this.id);
    this.type = this.ref.type;
  }

  optimize() {
    return this;
  }
};

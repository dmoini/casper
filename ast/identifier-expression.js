module.exports = class IdentifierExpression {
  constructor(id) {
    this.id = id;
  }

  analyze(context) {
    console.log(this.id);
    this.ref = context.lookupValue(this.id);
    this.type = this.ref.type;
  }
};

module.exports = class IdentifierExpression {
  constructor(id) {
    this.id = id;
  }

  analyze(context) {
    this.ref = context.lookup(this.id); // TODO: Make sure we lookup VALUE
    this.type = this.ref.type;
  }
};

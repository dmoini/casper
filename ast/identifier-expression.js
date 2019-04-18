module.exports = class IdentifierExpression {
  constructor(id) {
    this.id = id;
  }
  analyze(context) {
    this.referent = context.lookup(this.id);
  }
};

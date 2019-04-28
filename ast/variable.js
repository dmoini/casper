module.exports = class Variable {
  constructor(type, id) {
    this.type = type;
    this.id = id;
  }

  analyze(context) {
    context.add(this);
  }
};

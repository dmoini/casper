// A function declaration binds a function object to a name.
module.exports = class IdDeclaration {
  constructor(type, id) {
    this.id = id;
    this.type = type;
  }

  // TODO: check
  analyze(context) {
    this.type.analyze(context);
  }
};

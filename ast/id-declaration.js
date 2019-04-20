// A function declaration binds a function object to a name.
module.exports = class IdDeclaration {
  constructor(type, id) {
    this.id = id;
    this.type = type;
  }

  analyze(context) {
    this.type.analyze(context);
  }
};

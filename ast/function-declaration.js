const FunctionObject = require("./function-object");

// A function declaration binds a function object to a name.
module.exports = class FunctionDeclaration {
  constructor(type, id, params, body) {
    this.id = id;
    this.function = new FunctionObject(type, id, params, body);
  }
};

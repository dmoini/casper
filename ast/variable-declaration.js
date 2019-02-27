const Variable = require('./variable');

module.exports = class VariableDeclaration {
  constructor(ids, initializers) {
    Object.assign(this, { ids, initializers });
  }
};

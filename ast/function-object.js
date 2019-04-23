const check = require('../semantics/check');

module.exports = class FunctionObject {
  constructor(type, id, params, body) {
    Object.assign(this, { type, id, params, body });
  }

  get isExternal() {
    return !this.function.body;
  }

  // TODO: Based off of Tiger, please check
  analyze(bodyContext) {
    this.body.analyze(bodyContext);
    check.isAssignableTo(this.body, this.returnType, 'Type mismatch in function return');
  }
};

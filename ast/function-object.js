module.exports = class FunctionObject {
  constructor(type, id, params, body) {
    Object.assign(this, { type, id, params, body });
  }

  get isExternal() {
    return !this.function.body;
  }

  // TODO
  analyze() {}
};

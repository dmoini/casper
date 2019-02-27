module.exports = class FunctionObject {
  constructor(type, id, params, body) {
    Object.assign(this, { type, id, params, body });
  }
};

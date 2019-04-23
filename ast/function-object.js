const check = require("../semantics/check");

module.exports = class FunctionObject {
  constructor(type, id, params, body) {
    Object.assign(this, { type, id, params, body });
  }

  get isExternal() {
    return !this.function.body;
  }

  // TODO: Based off of Tiger, please check
  analyze(context) {
    this.params.forEach(p => p.analyze(context));
    this.requiredParameterNames = new Set();
    this.allParameterNames = new Set();
    this.params.forEach(p => {
      this.allParameterNames.add(p.id);
      if (p.isRequired) {
        this.requiredParameterNames.add(p.id);
        if (this.requiredParameterNames.size < this.allParameterNames.size) {
          throw new Error(
            "Required parameter cannot appear after an optional parameter"
          );
        }
      }
    });
    if (this.body) {
      this.body.forEach(s => s.analyze(context));
    }
  }
};

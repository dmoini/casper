const check = require("../semantics/check");

module.exports = class AssignmentStatement {
  constructor(ids, exps) {
    Object.assign(this, { ids, exps });
  }

  analyze(context) {
    this.exps.forEach(exp => exp.analyze(context));
    this.ids.forEach(id => id.analyze(context));
    console.log("ASSIGNMENT:", this);
    if (this.ids.length !== this.exps.length) {
      throw new Error("Number of ids does not equal number of exps");
    }

    // Make sure that the types of expressions are compatible with the ids
    this.ids.forEach((id, index) => {
      const variable = context.lookupValue(id.id);
      check.isAssignableTo(this.exps[index], variable.type);
    });
  }
};

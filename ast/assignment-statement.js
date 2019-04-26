const check = require("../semantics/check");
const util = require("util");
console.log("assignment check: ", check);

module.exports = class AssignmentStatement {
  constructor(ids, exps) {
    Object.assign(this, { ids, exps });
  }

  analyze(context) {
    // console.log("assignment: " + util.format(context));

    this.exps.forEach(exp => exp.analyze(context));
    this.ids.forEach(id => id.analyze(context));
    if (this.ids.length !== this.exps.length) {
      throw new Error("Number of ids does not equal number of exps");
    }
    console.log("EXPS", this.exps);
    console.log("IDS", this.ids);

    // Make sure that the types of expressions are compatible with the ids
    this.ids.forEach((id, index) => {
      //   console.log("EXPS" + util.format(this.exps));
      const variable = context.lookupValue(id.id);
      check.isAssignableTo(this.exps[index], variable.type);
    });
  }
};

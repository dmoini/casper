/* eslint-disable no-case-declarations */
/* eslint-disable prefer-destructuring */
const check = require("../semantics/check");
const ListType = require("../ast/list-type");
const SetType = require("../ast/set-type");
const DictType = require("../ast/dict-type");

module.exports = class AssignmentStatement {
  constructor(ids, exps) {
    Object.assign(this, { ids, exps });
  }

  analyze(context) {
    this.exps.forEach(exp => exp.analyze(context));
    this.ids.forEach(id => id.analyze(context));
    
    if (this.ids.length !== this.exps.length) {
      throw new Error("Number of ids does not equal number of exps");
    }

    // Make sure that the types of expressions are compatible with the ids
    console.log("IDS", this.ids);
    this.ids.forEach((id, index) => {
      console.log("INNER ID", id.id);
      console.log("CONTEXT", context.lookupValue("z"));

      const variable = context.lookupValue(id.id);
      console.log("VARIABLE", variable);
      const variableType = variable.type.constructor;
      const emptyListorSet = (variableType === ListType || variableType === SetType)
        && (this.exps[index].members && this.exps[index].members.length === 0);
      const emptyDict = variableType === DictType && this.exps[index].exp.length === 0;

      if (emptyListorSet || emptyDict) {
        switch (variable.type.constructor) {
          case ListType:
            this.exps[index].type = new ListType(variable.type.memberType);
            break;
          case SetType:
            this.exps[index].type = new SetType(variable.type.memberType);
            break;
          default: // case DictType
            const keyType = variable.type.keyType;
            const valueType = variable.type.valueType;
            this.exps[index].type = new DictType(keyType, valueType);
        }
      } else {
        check.isAssignableTo(this.exps[index], variable.type);
      }
    });
  }
};

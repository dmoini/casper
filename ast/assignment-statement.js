/* eslint-disable no-case-declarations */
/* eslint-disable prefer-destructuring */
const check = require("../semantics/check");
const ListType = require("../ast/list-type");
const SetType = require("../ast/set-type");
const DictType = require("../ast/dict-type");
const SubExp = require("../ast/subscripted-expression");

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

    this.ids.forEach((id, index) => {
      const variable = id.constructor === SubExp
        ? context.lookupValue(id.id.id)
        : context.lookupValue(id.id);
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
          default:
            // case DictType
            const keyType = variable.type.keyType;
            const valueType = variable.type.valueType;
            this.exps[index].type = new DictType(keyType, valueType);
        }
      } else {
        check.isAssignableTo(
          this.exps[index],
          id.constructor === SubExp ? variable.type.memberType : variable.type,
        );
      }
    });
  }

  optimize() {
    return this;
  }
};

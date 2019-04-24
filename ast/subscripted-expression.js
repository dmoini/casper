const check = require("../semantics/check");
const ListType = require("../ast/list-type");
// const DictType = require('../ast/dict-type');

module.exports = class SubscriptedExpression {
  constructor(variable, subscript) {
    Object.assign(this, { variable, subscript });
  }

  // TODO: Check for dictionaries. Check to see if it compiles
  analyze(context) {
    const variableType = check.isListOrDict(this.variable);
    this.subscript.analyze(context);
    if (variableType.constructor === ListType) {
      check.isNumber(this.subscript);
      this.type = this.variable.type.memberType;
    } else {
      // NOTE(dmoini): i think this is correct (referencing the keytype)????
      check.expressionsHaveTheSameType(
        this.subscript,
        this.variableType.keyType
      );
    }
  }
};

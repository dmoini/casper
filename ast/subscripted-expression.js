const check = require("../semantics/check");
const ListType = require("../ast/list-type");
// const DictType = require('../ast/dict-type');

module.exports = class SubscriptedExpression {
  constructor(id, subscript) {
    Object.assign(this, { id, subscript });
  }

  analyze(context) {
    this.subscript.analyze(context);
    this.id.analyze(context);
    const variableType = check.isList(this.id);
    if (variableType === ListType) {
      check.isNumber(this.subscript);
      this.type = this.id.type.memberType;
    } else {
      // TODO: Check for dictionaries
    }
  }
};

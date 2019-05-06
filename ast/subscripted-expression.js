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
    const variableType = check.isListOrDict(this.id);
    console.log(variableType);
    if (variableType === ListType) {
      check.isNumber(this.subscript);
      this.type = this.id.type.memberType;
      console.log("TYPE", this.type);
    } else {
      // console.log(this.id.type.keyType);
      // console.log(this.subscript.type);
      check.sameType(this.id.type.keyType, this.subscript.type);
      this.type = this.id.type.memberType;
      console.log("CHECKING FOR DICTIONARY");
    }
  }
};

const check = require("../semantics/check");
const ListType = require("../ast/list-type");
// const DictType = require('../ast/dict-type');

module.exports = class SubscriptedExpression {
  constructor(variable, subscript) {
    Object.assign(this, { variable, subscript });
  }

  analyze(context) {
    console.log("Variable", this.variable);
    this.subscript.analyze(context);
    this.variable.analyze(context);
    // console.log("SUBSCRIPT VAR", this.variable);
    const variableType = check.isListOrDict(this.variable);
    if (variableType === ListType) {
      check.isNumber(this.subscript);
      this.type = this.variable.type.memberType;
    } else {
      // TODO: Check for dictionaries
    }
  }
};

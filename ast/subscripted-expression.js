const check = require('../semantics/check');

module.exports = class SubscriptedExpression {
  constructor(variable, subscript) {
    Object.assign(this, { variable, subscript });
  }

  // TODO: Add for dictionaries
  analyze(context) {
    this.variable.analyze(context);
    check.isList(this.variable)
    this.subscript.analyze(context);  
    check.isNumber(this.subscript);
    this.type = this.variable.type.memberType;
  }
};

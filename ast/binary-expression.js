const check = require("../semantics/check");
const { NumType, BooleanType, StringType } = require("../semantics/builtins");

module.exports = class BinaryExpression {
  constructor(op, left, right) {
    Object.assign(this, { op, left, right });
  }

  analyze(context) {
    this.left.analyze(context);
    this.right.analyze(context);
    console.log("LEFT: ", this.left);
    console.log("RIGHT: ", this.right);
    if (["<=", ">=", "<", ">"].includes(this.op)) {
      //Relational operators
      check.isNumber(this.left);
      check.isNumber(this.right);
      this.type = BooleanType;
    } else if (["!=", "==", "is"].includes(this.op)) {
      //Equality operators
      check.sameType(this.left.type, this.right.type);
      this.type = BooleanType;
    } else if (["and", "or"].includes(this.op)) {
      //Truthy and Falsy
      check.isBoolean(this.left);
      check.isBoolean(this.right);
      this.type = BooleanType;
      // this.type = this.left.type === (NumType ? NumType : StringType);
    } else {
      //Math Operations
      // [// / - * %]
      // console.log("if4");
      check.sameType(this.left, this.right);
      this.type = NumType;
    }
  }
};

const util = require("util");

module.exports = class ReturnStatement {
  constructor(returnValue) {
    this.returnValue = returnValue;
  }

  analyze(context) {
    if (this.returnValue) {
      this.returnValue.analyze(context);
      console.log("RETURN VAL: " + util.format(this.returnValue));
      console.log("CONTEXT: " + util.format(context));
    }
    context.assertInFunction("Return Statement not in Function");
  }
};

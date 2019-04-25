module.exports = class CallExpression {
  constructor(callee, args) {
    Object.assign(this, { callee, args });
  }

  analyze(context) {
    this.callee.analyze(context);
    console.log("Callee", this.callee);
    context.assertIsFunction(this.callee.ref);
    this.checkArgumentMatching(this.callee.ref);
    this.args.forEach(arg => arg.analyze(context));
    console.log("args", this.args);
  }

  checkArgumentMatching(callee) {
    // let keywordArgumentSeen = false;
    // const matchedParameterNames = new Set([]);
    // this.args.forEach((arg, index) => {
    //   if (index >= callee.params.length) {
    //     throw new Error("Too many arguments in call");
    //   }
    //   const parameterName = arg.id ? arg.id : callee.params[index].id;
    //   if (!callee.allParameterNames.has(parameterName)) {
    //     throw new Error(
    //       `Function does not have a parameter called ${parameterName}`
    //     );
    //   }
    //   if (matchedParameterNames.has(parameterName)) {
    //     throw new Error(`Multiple arguments for parameter ${parameterName}`);
    //   }
    //   matchedParameterNames.add(parameterName);
    // });
    // // Look for and report a required parameter that is not matched
    // const miss = [...callee.requiredParameterNames].find(
    //   name => !matchedParameterNames.has(name)
    // );
    // if (miss) {
    //   throw new Error(`Required parameter ${miss} is not matched in call`);
    // }
  }
};

const check = require('../semantics/check');
module.exports = class AssignmentStatement {
  constructor(targets, sources) {
    Object.assign(this, { targets, sources });
  }
  analyze(context) {
    this.source.analyze(context);
    this.targets.analyze(context); // need to make this for multiple
    check.isAssignableTo(this.source, this.targets.type);
  }
};

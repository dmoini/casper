const check = require('../semantics/check');

module.exports = class AssignmentStatement {
  constructor(targets, sources) {
    Object.assign(this, { targets, sources });
  }

  // TODO: Make this work for multiple targets
  analyze(context) {
    this.source.analyze(context);
    this.targets.analyze(context);
    check.isAssignableTo(this.source, this.targets.type);
  }
};

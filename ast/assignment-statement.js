const check = require('../semantics/check');

module.exports = class AssignmentStatement {
  constructor(targets, sources) {
    Object.assign(this, { targets, sources });
  }

  // TODO
  analyze(context) {
    this.source.analyze(context);
    this.targets.analyze(context); // TODO: need to make this for multiple
    check.isAssignableTo(this.source, this.targets.type);
  }
};

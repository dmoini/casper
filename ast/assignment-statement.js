module.exports = class AssignmentStatement {
    constructor(targets, sources) {
      Object.assign(this, { targets, sources });
    }
};
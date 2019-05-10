module.exports = class Program {
  constructor(statements) {
    this.statements = statements;
  }

  analyze(context) {
    this.statements.forEach((stmt) => {
      stmt.analyze(context);
    });
  }

  optimize() {
    this.statements.map(s => s.optimize()).filter(s => s !== null);
    return this;
  }
};

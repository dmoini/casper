module.exports = class Program {
  constructor(statements) {
    this.statements = statements;
  }

  analyze() {
    this.statements.forEach((stmt) => {
      stmt.analyze();
    });
  }
};

module.exports = class Program {
  constructor(statements) {
    this.statements = statements;
  }

  analyze(context) {
    this.statements.forEach(stmt => {
      stmt.analyze(context);
    });
  }
};

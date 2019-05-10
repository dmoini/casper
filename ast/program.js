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
    for (let i = 0; i < this.statements.length; i += 1) {
      this.statements[i] = this.statements[i].optimize();
    }
    this.statements.filter(s => s !== null);
    return this;
  }
};

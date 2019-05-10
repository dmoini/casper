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
    console.log("OPTIMIZE PROGRAM");
    this.statements.map(s => s.optimize()).filter(s => s !== null);
    this.statements.map(s => console.log(s));
    return this;
  }
};

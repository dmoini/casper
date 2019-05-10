module.exports = class Parameter {
  constructor(type, id) {
    Object.assign(this, { type, id });
  }

  analyze(context) {
    context.add(this);
  }

  // optimize() {
  //   return this;
  // }
};

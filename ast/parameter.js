module.exports = class Parameter {
  constructor(type, id) {
    Object.assign(this, { type, id });
  }

  // TODO: translate this from PlainScript to Casper
  // get isRequired() {
  //   return this.
  // }

  // TODO: Taken from tiger, check to see if works better
  analyze(context) {
    this.type = context.lookupType(this.type);
    context.add(this);
  }
};

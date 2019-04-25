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
    if (this.type) {
      this.type = context.lookupType(this.type);
      check.isAssignableTo(this.id, this.type);
    } else {
      this.type = this.id.type;
    }
    context.add(this);
  }
};

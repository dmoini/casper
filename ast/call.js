module.exports = class Call {
  constructor(callee, args) {
    Object.assign(this, { callee, args });
  }
};

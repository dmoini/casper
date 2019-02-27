module.exports = class Case {
  constructor(test, body) {
    Object.assign(this, { test, body });
  }
};

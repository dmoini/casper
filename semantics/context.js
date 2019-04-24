// When doing semantic analysis we pass around context objects.

// A context object holds:

//   1. A reference to the parent context (or null if this is the root context).
//      This allows to search for declarations from the current context outward.

//   2. A reference to the current function we are analyzing, if any. If we are
//      inside a function, then return expressions are legal, and we will be
//      able to type check them.

//   3. Whether we are in a loop (to know that a `break` is okay).

//   4. A map for looking up types declared in this context.

//   5. A map for looking up vars and functions declared in this context.

// The reason for the two maps is that in Tiger, types are kept in a separate
// namespace from all of the variables and functions. So you could declare a
// type called "list" and a variable called "list" in the same scope. But you
// probably shouldn't.

const FunctionDeclaration = require('../ast/function-declaration');
const FunctionObject = require('../ast/function-object');
const Parameter = require('../ast/parameter');

class Context {
  constructor({ parent = null, currentFunction = null, inLoop = false } = {}) {
    Object.assign(this, { parent, currentFunction, inLoop, declarations: Object.create(null) });
  }

  createChildContextForFunctionBody(currentFunction) {
    // When entering a new function, we're not in a loop anymore
    return new Context({ parent: this, currentFunction, inLoop: false });
  }

  createChildContextForLoop() {
    // When entering a loop body, just set the inLoop field, retain others
    return new Context({ parent: this, currentFunction: this.currentFunction, inLoop: true });
  }

  createChildContextForBlock() {
    // For a simple block (i.e., in an if-statement), we have to retain both
    // the function and loop settings.
    return new Context({
      parent: this,
      currentFunction: this.currentFunction,
      inLoop: this.inLoop,
    });
  }

  // Call this to add a new entity (which could be a variable, a function,
  // or a parameter) to this context. It will check to see if the entity's
  // identifier has already been declared in this context. It does not need
  // to check enclosing contexts because in this language, shadowing is always
  // allowed. Note that if we allowed overloading, this method would have to
  // be a bit more sophisticated.
  add(entity) {
    if (entity.id in this.declarations) {
      throw new Error(`Identifier ${entity.id} already declared in this scope`);
    }
    this.declarations[entity.id] = entity;
  }

  addType(typeDec) {
    if (typeDec.id in this.typeMap) {
      throw new Error(`Type ${typeDec.id} already declared in this scope`);
    }
    this.typeMap[typeDec.id] = typeDec.type;
  }

  // Returns the entity bound to the given identifier, starting from this
  // context and searching "outward" through enclosing contexts if necessary.
  lookupType(id) {
    for (let context = this; context !== null; context = context.parent) {
      if (id in context.typeMap) {
        return context.typeMap[id];
      }
    }
    throw new Error(`Type ${id} has not been declared`);
  }

  lookupValue(id) {
    if (id in this.declarations) {
      return this.declarations[id];
    }
    if (this.parent === null) {
      throw new Error(`Identifier ${id} has not been declared`);
    }
    return this.parent.lookup(id);
  }

  assertInFunction(message) {
    if (!this.currentFunction) {
      throw new Error(message);
    }
  }

  assertIsFunction(entity) { // eslint-disable-line class-methods-use-this
    if (entity.constructor !== FunctionObject) {
      throw new Error(`${entity.id} is not a function`);
    }
  }
}

// TODO(dmoini): how do we do builtins here???
// Context.INITIAL = new Context();
// new FunctionDeclaration('print', [new Parameter('_', null)], null).analyze(Context.INITIAL);
// new FunctionDeclaration('sqrt', [new Parameter('_', null)], null).analyze(Context.INITIAL);

module.exports = Context;

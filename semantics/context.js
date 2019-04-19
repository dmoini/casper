// When doing semantic analysis we pass around context objects.
//
// A context object holds:
//
//   1. A reference to the parent context (or null if this is the root context).
//      This allows to search for declarations from the current context outward.
//
//   2. A reference to the current function we are analyzing, if any. If we are
//      inside a function, then return expressions are legal, and we will be
//      able to type check them.
//
//   3. Whether we are in a loop (to know that a `break` is okay).
//
//   4. A map for looking up types declared in this context.
//
//   5. A map for looking up vars and functions declared in this context.
//
// The reason for the two maps is that in Tiger, types are kept in a separate
// namespace from all of the variables and functions. So you could declare a
// type called "list" and a variable called "list" in the same scope. But you
// probably shouldn't.

// const {
//   standardFunctions,
//   IntType,
//   StringType,
//   BooleanType,
//   VoidType,
// } = require("./builtins");

// class Context {
//   constructor({ parent = null, currentFunction = null, inLoop = false } = {}) {
//     Object.assign(this, {
//       parent,
//       currentFunction,
//       inLoop,
//       typeMap: Object.create(null),
//       valueMap: Object.create(null),
//     });
//   }
// }

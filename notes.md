- For DeclId, either start with "let/var/val/..." or have to say type.
  - Otherwise we can't tell the diff b/w declaration and assignment
  - ^^^ We have this already
- subscripted-expression.js
  - add is list or dictionary
  - var variable type = types of list/dict
  - dict: check the value of key and value
  - Check type of key, value and match with type of instantiated key, value dict
  - import ListType and DictType to subscripted-expression

Semantic Analysis

- How do we do the analyze functions for type-related things?
- How to do analyze functions for listType, dictType etc?
- Do we need an analyze function for primitive types?
- Are our analyze functions correct?

* Figure out how to do type inference on dictionaries, sets, and lists, etc.

NEED TO:

- fix expressionsHaveSameType in check.js and add it to isAssignableTo
- in fixing that ^, make it work for lists, dicts, and sets
- check to see if our var decl semantic analysis works
- write TESTS!!!!!!!!!!

TO-DO 4/24
- Add list of semantic errors to README
- Dictionaries???
- Make tests pass
- Add tests where necessary

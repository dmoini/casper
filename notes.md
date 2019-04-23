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

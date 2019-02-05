# casper: the Friendly Programming Language

[logo here]

## introduction

Casper is a friendly scripting language designed to make high level programming a light and comfortable experience!

## features

- Scripting language
- Statically typed
- Partial type inference
- Optional parameters

## type

### primitive types

- String
- Boolean/Boo
- Num
- List
- Tuple

### variable Declaration

`num x is 5`

`string y is "ian sucks"`

`boo z is true`

`list a is [3, "donovan", false]`

### function Declaration

```casper
fn foobar() =>
	scream("hello world!")

fn barfoo(#x) =>
	for 0 to x:
		scream("help")
```

## operators

- add `+`
- subtract `-`
- multiply `*`
- divide `/`
- integer division `//`
- modulus `%`
- equal `=`
- not equal `!=`
- less than `<`
- greater than `>`
- less than or equal `<=`
- greater than or equal `>=`
- logical AND `and`
- logical OR `or`
- logical NOT `!`
- logical XOR? `xor`

## declaration and assignment

already done?

 ## function declaration

already done?

## ternary

`do A if B else C`

## conditional

```casper
if blah:
	scream("maddie")
else if basketball:
	scream("leave me alone")
else:
	scream("")
```

## loop

```casper
for 0 to x:
	scream("help")
```

## comments

```casper
~ this is a comment!

~~ this is a
multiline comment ~~
```



## examples

```casper
fn fibonacci(#x) =>
	if (x <= 1):
		return 1
	return fibonacci(x - 1) + fibonacci(x - 2)
```

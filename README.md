# casper

![Casper Logo](/images/casper-logo.png)

## Introduction

Welcome to the repository for Casper: The Friendly Programming Language.
Casper is a friendly scripting language designed to make high level programming a light and comfortable experience!

## Features

- scripting language
- Statically typed
- Partial type inference
- Optional parameters

## Type

### Primitive types

- string
- boolean/boo
- num
- list
- tuple

### Variable Declaration

`num x is 5`

`string y is "ianlizards@icould.com"`

`boo z is true`

`list a is [3, "donovan", false]`

### Function Declaration

```casper
fn foobar() ->
    write("hello world!")

fn barfoo(num x) ->
    from 0 to x:
        write("help")
```

## Operators

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

## Declaration and assignment

already done?

## Function declaration

already done?

## Ternary

`do a if b else c`

## Conditional

```casper
if (big = true):
    write("big if true")
else if (big = false):
    write("bigly")
else:
    write("covfefe")
```

## Loop

```casper
from 0 to x:
    write(x)
```

```casper
while (true):
    write("big chungus")
```

## Comments

```casper
~ this is a comment!

~~
this is a
multiline comment
~~
```

## Examples

### Fibonacci Program

```casper
fn fibonacci(num x) ->
	if (x <= 1) ->
		return 1
	return fibonacci(x - 1) + fibonacci(x - 2)
```

### Greatest Common Divisor

```casper
fn computeGCD(num x, num y) ->
   while(y) ->
       x is y
       y is x % y
   return x
```

### First Factorial

```casper
fn FirstFactorial(num) ->
  if (num is 0 or num is 1) ->
    return 1
  else ->
    return num * FirstFactorial(num - 1)
```

### Greatest Common Divisor

```casper
fn computeGCD(num x, num y) ->
   while(y):
       x is y
       y is x % y
   return x
```

### Greatest Common Divisor

```casper
fn computeGCD(num x, num y) ->
   while(y):
       x = y
       y = x % y
   return x
```

### Greatest Common Divisor

```casper
fn computeGCD(num x, num y) ->
   while(y):
       x = y
       y = x % y
   return x
```

### Greatest Common Divisor

```casper
fn computeGCD(num x, num y) ->
   while(y):
       x = y
       y = x % y
   return x
```

### Greatest Common Divisor

```casper
fn computeGCD(num x, num y) ->
   while(y):
       x = y
       y = x % y
   return x
```

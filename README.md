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
```Javascript
function fibonacci(x) {
    if (x <= 1) {
        return 1
    }
    return fibonacci(x - 1) + fibonacci(x - 2)
}
```

### Greatest Common Divisor

```casper
fn gcd(num x, num y) ->
   while(y) ->
       x is y
       y is x % y
   return x
```
```Javascript
function gcd(x, y) {
    while(y) {
        x = y
        y = x % y
    }
    return x
}
```

### First Factorial

```casper
fn firstFactorial(num) -> 
    if (num equals 0 or num equals 1) ->
        return 1
    else ->
        return num * firstFactorial(num - 1)
```
```JavaScript
function firstFactorial(num) { 
    if (num === 0 || num === 1) {
        return 1;
    }
    else {
        return num * firstFactorial(num - 1); 
    }      
}
```


### Even or Odd

```casper
fn evenOrOdd(num n) ->
    if (n % 2 == 0) ->
        return true
    else ->
        return false
```
```JavaScript
function evenOrOdd(n) {
    if (n % 2 === 0) {
        return true
    } else {
        return false
    }
}
```

### Area of a Circle

```casper
fn areaOfCircle(num r) ->
   num pi = 3.14159265
   num area = pi * r * r
   return area
```
```JavaScript
function areaOfCircle(r) {
    pi = 3.14159265
    area = pi * r * r
    return area
}
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

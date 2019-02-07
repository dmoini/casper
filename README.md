# casper

![casper logo](/images/casper-logo.png)

## Introduction

Welcome to casper: a friendly scripting language designed to make high level programming a light and comfortable experience!

casper is brought to you by Teddy Chu, Alexia Filler, Ian Lizarda, Donovan Moini, and Serena Zafiris.

## Features

- Scripting language
- Statically typed
- Partial type inference
- Higher order functions
- Optional parameters

## Type

### Primitive types

- string
- boolean/boo
- num
- list
- tuple
- set
- dictionary

### Variable Declaration and Assignment

`num x is 5`

`string y is "ianlizards@icould.com"`

`boo z is true`

`list a is [3, "donovan", false]`

`x is 6`

`y is "ianlizarda@icloud.com"`

`z is false`

### Function Declaration

```casper
fn foobar() ->
    write("hello world!")

fn barfoo(num x) ->
    from 0 to x->
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

## Ternary

`do a if b else c`

## Conditional

```casper
if (big equals true)->
    write("big if true")
else if (big equals false)->
    write("bigly")
else->
    write("covfefe")    
```

## Loop

```casper
from 0 to x ->
    write(x)
```

```casper
while (true) ->
    write("I love casper")
```

## Higher Order Functions

```casper
fn doTwice(f,x) ->
    return f(f(x))
```

## Optional Parameters

```casper
fn multiples(num x, num y is 2) ->
    from 0 to y->
        x is x * x
```

## Comments

```casper
~ this is a comment!

~~
this is a
multi-line comment
~~
```

## Examples

### Fibonacci Program

```casper
fn fibonacci(num x) ->
    if (x <is 1) ->
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
fn firstFactorial(num x) -> 
    if (x equals 0 or x equals 1) ->
        return 1
    else ->
        return x * firstFactorial(x - 1)
```
```JavaScript
function firstFactorial(x) { 
    if (x === 0 || x === 1) {
        return 1
    }
    else {
        return x * firstFactorial(x - 1)
    }      
}
```

### Even or Odd

```casper
fn evenOrOdd(num x) ->
    if (x % 2 equals 0) ->
        return true
    else ->
        return false    
```
```JavaScript
function evenOrOdd(x) {
    if (x % 2 === 0) {
        return true
    } else {
        return false
    }
}
```

### Area of a Circle

```casper
fn areaOfCircle(num r) ->
   num pi is 3.14159265
   num area is pi * r * r
   return area
```
```JavaScript
function areaOfCircle(r) {
    pi = 3.14159265
    area = pi * r * r
    return area
}
```

### Largest Number of Three

```casper
fn largestNum(num x, num y, num z) ->
    if (x >= y and x >= z) ->
        return x
    else if (y >= x and y >= z) ->
        return y
    else ->
        return z
```
```JavaScript
function largestNum(x, y, z) {
    if (x >= y && x >= z) {
        return x
    } else if (y >= x && y >= z) {
        return y
    } else {
        return z
    }
}
```

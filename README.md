# casper

<p align="center"><img src="images/casper-logo.png" alt="casper logo" width="350"/></p>

## Introduction

Welcome to casper, a friendly scripting language designed to make high level programming a light and comfortable experience. This language incorporates a speech-like, easy-to-use syntax that eliminates unnecessary verboseness from the programming experience. casper is reminiscent of Python with nuanced features and syntax designed to make its meaning as transparent as possible and make programming an entirely pleasant affair.

casper is brought to you by Teddy Chu, Alexia Filler, Ian Lizarda, Donovan Moini, and Serena Zafiris.

If you like to see more about casper, please check out casper's official website at (https://szafiris.github.io/casper-website/)[https://szafiris.github.io/casper-website/].

## Features

- Scripting language
- Statically typed
- Partial type inference
- Parallel declaration and assignment
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

`num x = 5`

`string y = "ianlizards@icloud.com"`

`boo z = true`

`list a = [3, "donovan", false]`

`x = 6`

`y = "ianlizarda@icloud.com"`

`z = false`

`num m, num n = 1, 2`

`m, n = 3, 4`

### Function Declaration

```casper
void foobar():
    write("hello world!")

void barfoo(num x):
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
- equal `==`
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
if (big equals true):
    write("big if true")
else if (big equals false):
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
    write("I love casper")
```

## Higher Order Functions

```casper
num doTwice(num f:(num z),num x):
    return f(f(x))
```

## Optional Parameters

```casper
num multiples(num x, num y = 2):
    from 0 to y:
        x = x * x
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
num fibonacci(num x):
    if (x <= 1):
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
num gcd(num x, num y):
   while(y):
       x = y
       y = x % y
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
num firstFactorial(num x):
    if (x equals 0 or x equals 1):
        return 1
    else:
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
boo evenOrOdd(num x):
    if (x % 2 equals 0):
        return true
    else:
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
num areaOfCircle(num r):
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

### Largest Number of Three

```casper
num largestNum(num x, num y, num z):
    if (x >= y and x >= z):
        return x
    else if (y >= x and y >= z):
        return y
    else:
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

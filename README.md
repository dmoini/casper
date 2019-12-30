# Casper: The Friendly Programming Language

<p align="center"><img src="images/casper-logo.png" alt="casper logo" width="350"/></p>

## Introduction

Welcome to Casper, a friendly scripting language designed to make high level programming a light and comfortable experience. This language incorporates a speech-like, easy-to-use syntax that eliminates unnecessary verboseness from the programming experience. Casper is reminiscent of Python with nuanced features and syntax designed to make its meaning as transparent as possible and make programming an entirely pleasant affair.

Casper is brought to you by Teddy Chu, Alexia Filler, Ian Lizarda, Donovan Moini, and Serena Zafiris.

If you like to see more about Casper, please check out Casper's official website at https://dmoini.github.io/casper/.  
  
Check out our grammar: https://github.com/dmoini/casper/blob/master/syntax/casper.ohm

## Features

- Scripting language
- Statically typed
- Partial type inference
- Parallel declaration and assignment
- Higher order functions
- Optional parameters

## Types

### Primitive types

- string
- boo (boolean)
- num
- list
- set
- dict (dictionary)

## Variable Declaration and Assignment

#### Declaration

`num x = 5`

`string y = "ianlizards@icould.com"`

`boo z = true`

`list<string> teamMembers = ["Donovan", "Ian", "Teddy", "Serena", "Alexia", "Eddie from Playroll"]`

`set<string> awesomeLanguages = set("Casper", "Python", "JavaScript", "Nebula")`

`dict<string, string> professors = {"hustler": "Forney", "wizard": "Toal", "hates tests": "Dondi"}`

`num m, n = 1, 2`

#### Assignment

`x = 6`

`y = "ianlizards@icould.com"`

`z = false`

`m, n = 3, 4`

### Function Declaration

```casper
void helloWorld():
    print("Hello world!")

void help(num x):
    for i from 0 to 10:
        print("help")
```

## Operators

- add `+`
- subtract `-`
- multiply `*`
- divide `/`
- integer division `//`
- modulus `%`
- strict equality `==` or `!=`
- reference equality `is`
- less than `<`
- greater than `>`
- less than or equal `<=`
- greater than or equal `>=`
- logical AND `and`
- logical OR `or`
- logical NOT `not` or `!`

## Ternary

`a if b else c`

`print("isBig" if size > 9000 else "isSmall")`

## Conditional

```casper
if teamMembersAmount > 5:,
    print("Too many team members")
else if teamMembersAmount < 5:
    print("Not enough team members")
else:
    print("Just the right number of team members")
```

## Loop

```casper
for x from 0 to 10:
    print(x)

for y from 0 to 10 by 2:
    print(y)
```

```casper
while true:
    print("I love casper")
```

<!-- TODO(after we survive junior year): implement higher order functions and optional parameters -->
<!-- ## Higher Order Functions

```casper
num doTwice(num f:(num z),num x):
    return f(f(x))
```

## Optional Parameters

```casper
num multiples(num x, num y = 2):
    for _ from 0 to y:
        x = x * x
``` -->

## Comments

```casper
~ this is a comment!

~*
this is a
multi-line comment
*~
```

## Types of Static Semantic Errors

- Argument and parameter types do not match
- Break outside of loop
- Call is not a function
- Identifier already declared in this scope
- Incorrect function return type
- Incorrect number of arguments
- No return statement found
- Not a boolean
- Not a list or dictionary
- Not a number
- Number of ids does not equal number of exps
- Return statement not in function
- Set mixed types
- Types are not compatible
- Variable has not been declared
- Void functions cannot have return statements

## Code Examples

### Fibonacci Program

```casper
num fibonacci(num x):
    if (x <= 1):
        return x
    return fibonacci(x - 1) + fibonacci(x - 2)
```

```Javascript
function fibonacci(x) {
    if (x <= 1) {
        return x;
    }
    return fibonacci(x - 1) + fibonacci(x - 2);
}
```

### Greatest Common Divisor

```casper
num gcd(num x, num y):
    num a = abs(x)
    num b = abs(y)
    while(b > 0):
        num t = b
        b = a % b
        a = t
    return a
```

```Javascript
function gcd(x, y) {
    let a = Math.abs(x);
    let b = Math.abs(y);
    while(b > 0) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}
```

### First Factorial

```casper
num firstFactorial(num x):
    if (x == 0 or x == 1):
        return 1
    else:
        return x * firstFactorial(x - 1)
```

```JavaScript
function firstFactorial(x) {
    if (x === 0 || x === 1) {
        return x
    }
    else {
        return x * firstFactorial(x - 1)
    }
}
```

### Even or Odd

```casper
boo evenOrOdd(num x):
    return x % 2 == 0
```

```JavaScript
function evenOrOdd(x) {
    return x % 2 == 0;
}
```

### Area of a Circle

```casper
num areaOfCircle(num r):
   return pi() * r * r
```

```JavaScript
function areaOfCircle(r) {
    return Math.PI * r * r;
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
        return x;
    } else if (y >= x && y >= z) {
        return y;
    } else {
        return z;
    }
}
```

### [Two Sum](<[https://link](https://leetcode.com/problems/two-sum/)>)

```casper
list<num> twoSum(list<num> nums, num target):
    if len(nums) == 2:
        return [0, 1]
    list<num> ans = []
    dict<num, num> hashTable = {}
    for i from 0 to len(hashTable):
        num complement = target - nums[i]
        num find = hashTable[complement]
        if hashTable.getValue(complement) != none:
            ans = [find, i]
            break
        hashTable[nums[i]] = i
    return ans
```

```JavaScript
function twoSum(nums, target) {
    if (nums.length === 2) {
        return [0, 1];
    }
    let ans = [];
    let hashTable = {};
    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i];
        let find = hashTable[complement];
        if (find !== undefined) {
            ans = [find, i];
            break;
        }
        hashTable[nums[i]] = i;
    }
	return ans;
};
```

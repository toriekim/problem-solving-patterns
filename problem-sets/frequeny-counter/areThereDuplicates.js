// Implement a function called `areThereDuplicates` which accepts a variable number of arguments, and checks whether there are any duplicates among the arguments passed in. You can solve this using the frequency counter pattern OR the multiple pointers pattern.

// Have you seen this before: ...args?
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
const areThereDuplicates = (...args) => {
  // Your code here
}

// Examples:
areThereDuplicates(1, 2, 3) // false
areThereDuplicates(1, 2, 2) // true
areThereDuplicates('a', 'b', 'c' , 'a') // true

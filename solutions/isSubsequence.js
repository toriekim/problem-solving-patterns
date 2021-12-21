// Write a function called `isSubsequence` which takes in two striings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.

// Iterative
const isSubsequence = (str1, str2) => {
  if (!str1) return true
  // i points to str1
  let i = 0
  // j points to str2
  let j = 0

  while (j < str2.length) {
    if (str2[j] === str1[i]) i++
    if (i === str1.length) return true
    j++
  }
  return false
}

// Recursive, but not O(1) space
// const isSubsequence = (str1, str2) => {
//   if(str1.length === 0) return true
//   if(str2.length === 0) return false
//   if(str2[0] === str1[0]) return isSubsequence(str1.slice(1), str2.slice(1))
//   return isSubsequence(str1, str2.slice(1))
// }

// Examples:
isSubsequence('hello', 'hello world') // true
isSubsequence('sing', 'sting') // true
isSubsequence('abc', 'abracadabra') // true
isSubsequence('abc', 'acb') // false

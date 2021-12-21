// Given two strings, write a function to determine if the second string is an anagram of the first. An anagram is a word, phrase, or name formed by rearranging the letters of another such as cinema, formed from iceman.

// 2 frequency counters & comparing values
const validAnagram = (str1, str2) => {
  if (str1.length !== str2.length) return false;

  // make 2 objs to keep track of letters in each string
  let str1freq = {},
    str2freq = {};

  // loop through each string to populate freq counters
  for (const letter of str1) {
    str1freq[letter] = (str1freq[letter] || 0) + 1;
  }
  for (const letter of str2) {
    str2freq[letter] = (str2freq[letter] || 0) + 1;
  }

  // loop through first freq obj & compare values
  for (const key in str1freq) {
    if (!str2freq[key]) return false;
    if (str1freq[key] !== str2freq[key]) return false;
  }

  return true;
}

// 1 counter & deducting
// const validAnagram = (str1, str2) => {
//   if (str1.length !== str2.length) return false

//   // make freq counter obj
//   let frequency = {}

//   // loop through first str to populate counter
//   for (const letter of str1) {
//     frequency[letter] = (frequency[letter] || 0) + 1
//   }

//   // loop through second str & check against freq counter
//   for (const letter of str2) {
//     if (!frequency[letter]) return false
//     else frequency[letter]--
//   }

//   return true
// }

// Examples:
validAnagram('', ''); // true
validAnagram('aaz', 'zza'); // false
validAnagram('anagram', 'nagaram'); // true
validAnagram('rat', 'car'); // false

// Write a function called `findLongestSubstring`, which accepts a string and returns the length of the longest substring with all distinct characters.

const findLongestSubstring = (str) => {
  let store = {}
  let longest = 0;
  let start = 0;

  for (let i = 0; i < str.length; i++) {
    let letter = str[i]
    if (store[letter]) {
      start = Math.max(start, store[letter])
    }
    // index - beginning of substrign + 1 (to include current in count)
    longest = Math.max(longest, i - start + 1)
    // store the index of the next char so as to not doubl count
    store[letter] = i + 1
  }
  return longest
}

// Examples:
findLongestSubstring('') // 0
findLongestSubstring('bbbbbb') // 1
findLongestSubstring('lalala') // 2
findLongestSubstring('rithmschool') // 7
findLongestSubstring('thisisawesome') // 6
findLongestSubstring('thecatinthehat') // 7

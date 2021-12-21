// Implement a function called `countUniqueValues`, which accepts a **sorted** array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted.

const countUniqueValues = (arr) => {
  if (!arr.length) return 0

  // set up pointer for i ("base")
  let i = 0

  // loop through arr while j < arr.length
  // j is the "scout", ahead of i by 1
  for (let j = 1; j < arr.length; j++) {
    // if the values are not the same
    // increment i & replace value with arr[j]
    if (arr[i] !== arr[j]) {
      i++
      arr[i] = arr[j]
    }
  }
  // unique values = i + 1
  return i + 1
}

// Examples:
countUniqueValues([1,1,1,1,1,2]) // 2
countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]) // 7
countUniqueValues([]) // 0
countUniqueValues([-2,-1,-1,0,1]) // 4

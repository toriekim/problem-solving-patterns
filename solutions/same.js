// Write a function `same`, which accepts two arrays. The function should return **true** if every value in the array has its corresponding value squared in the second array. The frequency of values must be the same.

const same = (arr1, arr2) => {
  if(arr1.length !== arr2.length) return false;

  // use objs to count freq of vals in arrays
  let freq1 = {}, freq2 = {}

  // loop over each array to populate the objs
  for(let val of arr1){
    freq1[val] = (freq1[val] || 0) + 1
  }
  for(let val of arr2){
    freq2[val] = (freq2[val] || 0) + 1
  }
  // loop over first counter
  for(let key in freq1){
    // if squared key isn't in second counter
    if(!(key ** 2 in freq2)) return false
    // if the # of freq doesn't match up
    if(freq2[key ** 2] !== freq1[key]) return false
  }
  return true
}

// Using Map - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// const same = (arr1, arr2) => {
//   if(arr1.length !== arr2.length) return false

//   const freq1 = new Map(), freq2 = new Map()

//   for(const val of arr1) {
//     freq1.has(val) ?
//       freq1.set(val, freq1.get(val) + 1) :
//       freq1.set(val, 1)
//   }
//   for(const val of arr2) {
//     freq2.has(val) ?
//       freq2.set(val, freq2.get(val) + 1) :
//       freq2.set(val, 1)
//   }

//   for(const [key, value] of freq1){
//     if(!(freq2.has(key ** 2))) return false
//     if(freq2.get(key ** 2) !== freq1.get(key)) return false
//   }
//   return true
// }

// Examples:
same([1,2,3], [4,1,9]) // true
same([1,2,3], [1,9]) // false
same([1,2,1], [4,4,1]) // false (must be same frequency)

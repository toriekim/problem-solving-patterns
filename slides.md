---
# try also 'default' to start simple
theme: apple-basic
fonts:
  sans: 'Montserrat'
  serif: 'Bitter'
  mono: 'Roboto Mono'
layout: intro-image
image: https://images.unsplash.com/photo-1544237529-10b958ec0461?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80
---

<div class="absolute top-10">
  <span class="font-700">
    Torie Kim | 2111 FSA/GH Async Week
  </span>
</div>

<div class="absolute bottom-10">
  <h1>Common Problem Solving Patterns</h1>
  <p>An introduction to REACTOs & solving algos</p>
</div>

---

# Goals

<ul class=list>
  <li>To understand what REACTO stands for problem-solving approach</li>
  <li>To learn some common problem-solving patterns w/ examples</li>
  <ul id="sublist">
    <li>Frequency Counter
</li>
    <li>Pointers</li>
    <li>Sliding Window</li>
    <li>Divide & Conquer</li>
  </ul>
</ul>

<style>
  .list {
    list-style-type: disc;
    padding: 0;
    margin: 0;
}
  #sublist {
    list-style-type: lower-alpha;
    padding-left: 3em;
  }
</style>

---

# Objectives

After this workshop, students should be able to:

<ul>
  <li>Understand what the REACTO problem-solving approach is</li>
  <li>Approach an algorithm w/ REACTO</li>
  <li>Recognize which problem-solving pattern to use when presented with a particular algorithm</li>
</ul>

---
layout: image-right
image: 'https://images.unsplash.com/photo-1515347272087-685ce5a1fc8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80'
---

# Frequency Counter

_Uses objects or sets to collect values/frequencies of values_

* This can often avoid the need for nested loops or O(n^2) operations with arrays & strings

* Breakdown the array/string into a frequency -- can use Map[^1]

* Multiple separate loops are infinitely better than nested loops

* Examples: `same`, `validAnagram`, `areThereDuplicates`

[^1]: Read more: [MDN Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

---

# Frequency Counter

## Example #1: `same`
<br />

<div grid="~ cols-2 gap-3" m="-t-2">

<div>

Write a function `same`, which accepts two arrays. The function should return **true** if every value in the array has its corresponding value squared in the second array. The frequency of values must be the same.

### Examples:
```js
same([1,2,3], [4,1,9]) // true
same([1,2,3], [1,9]) // false
same([1,2,1], [4,4,1]) // false (must be same frequency)
```
</div>

<div>

### Naive Solution:

```js{all|7|all}
const same = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for(let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2)
    // if it's not in the array, return false
    if (correctIndex === -1) {
      return false;
    }
    // if it is in the array, get rid of that value
    arr2.splice(correctIndex,1)
  }
  return true
}
```

<p v-click style="text-align: right">Time complexity: O(n^2)</p>

</div>
</div>

---
layout: intro-image
image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1791&q=80'
---

## Frequency Counter

<div grid="~ cols-2 gap-3" m="-t-2">

### Refactored Solution:

### Using Map:

```js{all|4-5|7-10|7,11-13|14-15|16-17|18-19|all}
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
```

```js
const same = (arr1, arr2) => {
  if(arr1.length !== arr2.length) return false

  const freq1 = new Map(), freq2 = new Map()

  for(const val of arr1) {
    freq1.has(val) ?
      freq1.set(val, freq1.get(val) + 1) :
      freq1.set(val, 1)
  }
  for(const val of arr2) {
    freq2.has(val) ?
      freq2.set(val, freq2.get(val) + 1) :
      freq2.set(val, 1)
  }

  for(const [key, value] of freq1){
    if(!(freq2.has(key ** 2))) return false
    if(freq2.get(key ** 2) !== freq1.get(key)) return false
  }
  return true
}
```

</div>

<!-- Multiple loops is infinitely better than nested loops.
The refactored with Map is O(3n) -> O(n)
-->

---
layout: image-right
image: 'https://images.unsplash.com/photo-1515347272087-685ce5a1fc8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80'
---

# Frequency Counter
<br />

## Example #2: `validAnagram`

Given two strings, write a function to determine if the second string is an anagram of the first. An anagram is a word, phrase, or name formed by rearranging the letters of another such as cinema, formed from iceman.

### Examples:
```js
validAnagram('', '') // true
validAnagram('aaz', 'zza') // false
validAnagram('anagram', 'nagaram') // true
validAnagram('rat', 'car') // false
```

---
layout: default
---

# Frequency Counter

#### Example #2: `validAnagram`
<br />

<div grid="~ cols-2 gap-3" m="-t-2">
<div>

### 2 freq counters & comparing values

```js{all}
const validAnagram = (str1, str2) => {
  if (str1.length !== str2.length) return false

  // make 2 objs to keep track of letters in each string
  let str1freq = {}, str2freq = {}

  // loop through each string to populate freq counters
  for (const letter of str1) {
      str1freq[letter] = (str1freq[letter] || 0) + 1
  }
  for (const letter of str2) {
      str2freq[letter] = (str2freq[letter] || 0) + 1
  }

  // loop through first freq obj & compare values
  for (const key in str1freq) {
      if (!str2freq[key]) return false
      if (str1freq[key] !== str2freq[key]) return false
  }
  return true
}
```
</div>

<div>

### 1 Counter & Deducting from Counter

```js
const validAnagram = (str1, str2) => {
  if (str1.length !== str2.length) return false

  // make freq counter obj
  let frequency = {}

  // loop through first str to populate counter
  for (const letter of str1) {
    frequency[letter] = (frequency[letter] || 0) + 1
  }

  // loop through second str & check against freq counter
  for (const letter of str2) {
    if (!frequency[letter]) return false
    else frequency[letter]--
  }

  return true
}
```

</div>
</div>

---
layout: image-right
image: 'https://images.unsplash.com/photo-1550345283-f456c85af8d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
---

# Pointers

_Creating **pointers** or values that correspond to an **index** or **position**_

* Pointers move towards the beginning, end, or middle based on a certain condition

* **Very** efficient for solving problems with minimal space complexity as well

* Different types: 2 pointers, multiple pointers, fast & slow pointers (linked lists)

* Examples: `sumZero`, `twoSum`, `countUniqueValues`, & `isSubsequence`

---
layout: image-right
image: 'https://images.unsplash.com/photo-1550345283-f456c85af8d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
---
# Pointers
<br />

## Example #1: `sumZero`

Write a function called `sumZero` which accepts a sorted array of integers. The function should find the first pair where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist.

### Examples:
```js
sumZero([-3,-2,-1,0,1,2,3]) // [-3,3]
sumZero([-2,0,1,3]) // undefined
sumZero([1,2,3]) // undefined
```

---

# Pointers

#### Example #1: `sumZero`
<br />

<div grid="~ cols-2 gap-3" m="-t-2">

### Naive Solution

### Solution w/ Two Pointers

```js
const sumZero = (arr) => {
  for(let i = 0; i < arr.length; i++) {
    for(let j = i + 1; j < arr.length; j++){
      if(arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]]
      }
    }
  }
}
```
<!-- Time Complexity O(n^2) & Space Complexity O(1) -->

```js{all|2|3|5|6|7-13|2-3,5,10,12|all}
const sumZero = (arr) => {
  let left = 0
  let right = arr.length - 1

  while(left < right) {
    const sum = arr[left] + arr[right]
    if (sum === 0) {
      return [arr[left], arr[right]]
    } else if (sum > 0) {
      right--
    } else {
      left++
    }
  }
}
```

<p v-click >Time Complexity: O(n^2)</p>

<p v-click>Time Complexity: O(n)</p>

</div>

---

# Pointers

## Example #2: `countUniqueValues`
<br />

<div grid="~ cols-2 gap-5" m="-t-2">

<div>

Implement a function called `countUniqueValues`, which accepts a **sorted** array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted.

### Examples:
```js
countUniqueValues([1,1,1,1,1,2]) // 2
countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]) // 7
countUniqueValues([]) // 0
countUniqueValues([-2,-1,-1,0,1]) // 4
```
</div>

<div>

### Pointers as "base" & "scout"

```js{all|4-5|7-9|10-15|13-14|all}
function countUniqueValues(arr) {
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
```

<p v-click>Time Complexity: O(n)</p>

</div>
</div>

---
layout: image-right
image: 'https://images.unsplash.com/photo-1496092607007-ca127e0b6a10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1820&q=80'
---

# Sliding Window

_This pattern involves creating a **window** which can either be an **array** or **number** from one position to another_

* Depending on a certain condition, the window either **increases** or **closes** (and a new window is created)

* Very useful for keeping track of a **subset of data** in an array/string, etc.

* Kadane's algorithm aka Maximum Subarray Problem

* Examples: `maxSubarraySum`, `minSubArrayLen`, & `findLongestSubstring`

---
layout: image-right
image: 'https://images.unsplash.com/photo-1496092607007-ca127e0b6a10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1820&q=80'
---

# Sliding Window
<br />

## Example #1: `maxSubarraySum`

Write a function called `maxSubarraySum` which accepts an array of integers and a number called n. The function should calculate the maximum sum of n consecutive elements in the array.

### Examples:
```js
maxSubarraySum([1,2,5,2,8,1,5],2) // 10
maxSubarraySum([1,2,5,2,8,1,5],4) // 17
maxSubarraySum([4,2,1,6],1) // 6
maxSubarraySum([4,2,1,6,2],4) // 13
maxSubarraySum([],4) // null
```

---

# Sliding window

#### Example #1: `maxSubarraySum`
<br />

<div grid="~ cols-2 gap-3" m="-t-2">

### Naive Solution

### Solution w/ Sliding Window

```js
const maxSubarraySum = (arr, num) => {
  if (num > arr.length) return null

  // start at a very small number to account
  // for negative nums in the array
  let max = -Infinity;

	// goes until end minus the num
  // to account for consecutives
  for (let i = 0; i < arr.length - num + 1; i ++) {
    temp = 0;
    for (let j = 0; j < num; j++) {
      temp += arr[i + j];
    }
    if (temp > max) {
      max = temp;
    }
  }
  return max;
}
```
<!-- Time Complexity O(n^2) & Space Complexity O(1) -->

```js{all|all}
const maxSubarraySum = (arr, num) => {
  // set up variables for "window"
  let maxSum = 0;
  let tempSum = 0;

  if (arr.length < num) return null;

  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }

  tempSum = maxSum;

  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}
```

</div>

---

# Sliding Window

## Example #2: `findLongestSubstring`
<br/>

<div grid="~ cols-2 gap-5" m="-t-2">
<div>


Write a function called `findLongestSubstring`, which accepts a string and returns the length of the longest substring with all distinct characters.

### Examples:
```js
findLongestSubstring('') // 0
findLongestSubstring('bbbbbb') // 1
findLongestSubstring('lalala') // 2
findLongestSubstring('rithmschool') // 7
findLongestSubstring('thisisawesome') // 6
findLongestSubstring('thecatinthehat') // 7
```
</div>

<div>

```js
const findLongestSubstring = (str) => {
  let store = {}
  let longest = 0;
  let start = 0;

  for (let i = 0; i < str.length; i++) {
    let letter = str[i]
    if (store[letter]) {
      start = Math.max(start, store[letter])
    }
    longest = Math.max(longest, i - start + 1)
    store[letter] = i + 1
  }
  return longest
}
```

<p v-click>Time Complexity: O(n)</p>

</div>

</div>

---
layout: image-right
image: 'https://images.unsplash.com/photo-1601294079875-dbd9497d80b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
---

# Divide & Conquer

_Involves **dividing** a data set into **smaller chucks** & then **repeating** a process with a subset of data_

* This pattern can tremendously decrease time complexity

* Examples: `search`, binary search problems

---
layout: image-right
image: 'https://images.unsplash.com/photo-1601294079875-dbd9497d80b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
---

# Divide & Conquer
<br />

## Example #1: `search`

Given a **sorted** array of integers, write a function called `search`, that accepts a value and returns the index where the value passed to the function is located. If the value is not found, return -1.

### Examples:
```js
search([1,2,3,4,5,6],4) // 3
search([1,2,3,4,5,6],6) // 5
search([1,2,3,4,5,6],11) // -1
```

---

# Divide & Conquer

#### Example: `search`
<br />

<div grid="~ cols-2 gap-3" m="-t-2">

### Naive Solution

### Refactored D & C

```js
const search = (arr, val) => {
  for(let i = 0; i < arr.length; i++){
    if (arr[i] === val){
      return i;
    }
  }
  return -1;
}
```
<!-- Time Complexity O(n^2) & Space Complexity O(1) -->

```js{all|all}
const search = (arr, val) {
  let start = 0, end = arr.length - 1

  while (start <= end) {
    let mid = Math.floor((start + end) / 2) // mid idx

    if (arr[middle] < val) {
      // move start to middle
      start = middle + 1;
    }
    else if (arr[middle] > val) {
      // move end to position before mid
      end = middle - 1;
    }
    // middle element is equal to target
    else return middle;
  }
  return -1;
}
```

</div>



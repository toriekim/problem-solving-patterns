// Given a **sorted** array of integers, write a function called `search`, that accepts a value and returns the index where the value passed to the function is located. If the value is not found, return -1.

const search = (arr, val) => {
  let start = 0, end = arr.length - 1

  while (start <= end) {
    let mid = Math.floor((start + end) / 2) // mid idx

    if (arr[mid] < val) {
      // move start to one after middle
      start = mid + 1;
    } else if (arr[mid] > val) {
      // move end to position one before middle
      end = mid - 1;
    }
    // middle element is equal to target
    else return mid;
  }

  return -1;
}

// Examples:
search([1,2,3,4,5,6],4) // 3
search([1,2,3,4,5,6],6) // 5
search([1,2,3,4,5,6],11) // -1

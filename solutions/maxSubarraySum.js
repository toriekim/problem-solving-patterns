// Write a function called `maxSubarraySum` which accepts an array of integers and a number called n. The function should calculate the maximum sum of n consecutive elements in the array.

const maxSubarraySum = (arr, num) => {
  // set up variables for comparing data values
  let maxSum = 0;
  let tempSum = 0;

  if (arr.length < num) return null;
  // initiate the window
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  // "slide" the window down the input array
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    // update value with new window's value
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}

// Examples:
maxSubarraySum([1,2,5,2,8,1,5],2) // 10
maxSubarraySum([1,2,5,2,8,1,5],4) // 17
maxSubarraySum([4,2,1,6],1) // 6
maxSubarraySum([4,2,1,6,2],4) // 13
maxSubarraySum([],4) // null

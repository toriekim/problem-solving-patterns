const areThereDuplicates = (...args) => {
  let frequency = {}
  for (let i = 0; i < args.length; i++) {
    let elem = args[i]
    if (!frequency[elem]) frequency[elem] = 1
    else return true
  }
  return false
}

// const areThereDuplicates = (...args) => {
//   // Two pointers
//   args.sort((a,b) => a > b);
//   let start = 0;
//   let next = 1;
//   while(next < args.length){
//     if(args[start] === args[next]){
//         return true
//     }
//     start++
//     next++
//   }
//   return falses
// }

// Using Set - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// const areThereDuplicates = () => {
//   return new Set(arguments).size !== arguments.length;
// }

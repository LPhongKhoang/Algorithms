// The Next greater Element for an element x is 
//  the first greater element on the right side of x in the array. 
// Elements for which no greater element exist, consider the next greater element as -1. 
/**
 * 
 * @param {number[]} arr 
 */
function nextGreaterElement(arr) {
    const stack = [];
    const result = [];

    stack.push(arr[0]);

    for(let i = 1; i < arr.length; i++) {
      while(stack.length && arr[i] >  stack[stack.length-1]) {
        console.log(stack[stack.length-1], ": ", arr[i]);
        stack.pop();
        
      }

      stack.push(arr[i]);
    }

    while(stack.length) {
      console.log(stack.pop(), ": ", -1);
    }
}

/**
 * 
 * @param {number[]} arr 
 */
function nextGreaterElement2(arr) {
  if(arr.length === 0) return [];

  const res = Array(arr.length).fill(-1);

  let maxNum = arr[arr.length-1];

  for(let i = arr.length - 2; i >= 0; i--) {
    // handle max value
    if(maxNum < arr[i]) maxNum = arr[i];

    if(arr[i] < arr[i+1]) {
      res[i] = arr[i+1];
    } else {
      if(arr[i] < res[i+1]) {
        res[i] = res[i+1];
      }else {
        if(arr[i] >= maxNum) {
          res[i] = -1;
        }else {
          let k = i+1;
          while(arr[i] >= arr[k]) {
            
            k++;
          }
          console.log(`i = ${i}, k = ${k}`);
          res[i] = arr[k];
        }
      }
    }
  }

  return res;
}

function main() {
  // nextGreaterElement([34, 25, 12, 28, 30, 42, 5, 10]);
  // console.log(nextGreaterElement2([34, 25, 12, 28, 30, 42, 5, 10]));
  // 34, 25, 61, 51, 41, 38, 27, 26, 25, 30, 40, 50, 60, 70, 102, 5, 10;
  // console.log(nextGreaterElement([34, 25, 61, 51, 41, 38, 27, 26, 25, 30, 40, 50, 60, 70, 102, 5, 10]));
  // console.log(nextGreaterElement2([73, 71, 61, 51, 41, 38, 27, 26, 25, 30, 40, 50, 60, 70, 72, 74, 102, 5, 10]));
  console.log(nextGreaterElement2([85, 83, 81, 79, 77, 75, 73, 71, 72, 74, 76, 78, 80, 82, 84, 86]));
  // console.log(nextGreaterElement2([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 100]));
}
main();

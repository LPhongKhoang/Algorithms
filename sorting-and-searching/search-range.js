// Ref: https://www.youtube.com/watch?v=Peq4GCPNC5c&list=WL&index=18
// Current solution is not 100% completed --> need to improve
/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number[]}
 * @description first problems using binary search algorithm
 */
var searchRange = function (arr, target) {
  let first = binarySearch(arr, 0, arr.length-1, target-1);
  if (arr[first+1] === target) {
    let second = binarySearch(arr, first+1, arr.length-1, target+1);
    return [first+1, second - 1];
  } else {
    return [-1, -1];
  }
};

/**
 *
 * @param {number[]} arr sorted array
 * @param {number} x can be float number
 */
function binarySearch(arr, x) {
  let left = 0, right = arr.length -1, mid;
  do {
    mid = Math.floor((left + right) / 2);
    console.log('left , mid, right', left, mid, right);
    if (arr[mid] === x) {
      console.log('mid: ', mid);
      return mid;
    }
    else if (arr[mid] < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  } while (left <= right);

  console.log('left: ', left);
  return left;
}

function main() {
  // console.log(binarySearch([3], 0.5));
  console.log(binarySearch([1, 2, 4, 6], 15));
  // console.log(searchRange([1, 2, 3, 4, 5, 6, 7, 12, 12, 12, 12, 12, 23, 2, 5, 27, 29], 12));
}

main();

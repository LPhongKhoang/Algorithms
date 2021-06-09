/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * @description first problems using binary search algorithm
 */
var searchRange = function (nums, target) {
  let first = binarySearch(nums, target - 0.5);
  if (nums[first] === target) {
    let second = binarySearch(nums, target + 0.5);
    return [first, second - 1];
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
  let mid,
    left = 0,
    right = arr.length - 1;

  do {
    mid = Math.floor((left + right) / 2);
    if (arr[mid] === x) break;
    else if (arr[mid] < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  } while (left <= right);

  return left;
}

function main() {
  console.log(binarySearch([3], 0.5));
  console.log(binarySearch([1, 2, 3], 1.5));
}

main();

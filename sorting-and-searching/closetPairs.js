const quickSort = require("./quickSort");

/**
 *
 * @param {number[]} sortedArr
 */
function binarySearchClosest(sortedArr, x) {
  let mid,
    left = 0,
    right = sortedArr.length - 1;

  while (left <= right) {
    mid = Math.floor((right + left) / 2);

    if (sortedArr[mid] === x) return [mid];
    else if (sortedArr[mid] > x) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  if (right < 0) return [left];
  if (left >= sortedArr.length) return [right];

  if (x - sortedArr[right] < sortedArr[left] - x) {
    return [right];
  } else if (x - sortedArr[right] == sortedArr[left] - x) {
    return [right, left];
  }
  return [left];
}

function getPairClosest(arr1, arr2, target) {
  quickSort(arr2);

  const res = [];
  let min = Infinity;
  for (let i = 0; i < arr1.length; i++) {
    let x = target - arr1[i];
    let closetIndexOfXs = binarySearchClosest(arr2, x);
    let closetIndexOfX = closetIndexOfXs[0];

    let nextMin = Math.abs(arr1[i] + arr2[closetIndexOfX] - target);

    if (nextMin > min) continue;

    if (nextMin < min) {
      min = nextMin;
      res.length = 0; // clear array
    }
    res.push([arr1[i], arr2[closetIndexOfX]]);
    if (closetIndexOfXs.length === 2) {
      res.push(arr1[i], arr2[closetIndexOfXs[1]]);
    }
  }

  return res;
}

(function main() {
  // const arr = [5, 6, 7, 8, 10, 25, 29, 30, 34, 97, 100];
  // quickSort(arr); // Sort in ASC order
  // console.log(arr);
  // [0, 1, 2, 3, 4,  5,  6,  7,   8, 9,  10]
  // [5, 6, 7, 8, 10, 25, 29, 30, 34, 97, 100 ]
  // console.log(binarySearchClosest(arr, 1000));

  // const arr1 = [-1, 3, 8, 2, 9, 5];
  // const arr2 = [4, 1, 2, 10, 5, 20];
  const arr2 = [7, 4, 1, 10];
  const arr1 = [4, 5, 8, 7];
  console.log(getPairClosest(arr1, arr2, 13));
})();

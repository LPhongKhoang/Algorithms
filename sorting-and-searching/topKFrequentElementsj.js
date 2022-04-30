/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const countMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    countMap.set(nums[i], (countMap.get(nums[i]) || 0) + 1);
  }

  const arr = Array.from(countMap);

  // sort Value in map is DESC
  quickSort(arr, 0, arr.length - 1);

  const res = [];
  for (let i = 0; i < k; i++) {
    res.push(arr[i][0]);
  }

  return res;
};

/**
 *
 * @param {number[]} arr
 * @param {number} left
 * @param {number} right
 */
function quickSort(arr, left, right) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  const pivot = arr[mid];

  let i = left,
    j = right;

  while (i <= j) {
    while (arr[i][1] > pivot[1]) i++;
    while (arr[j][1] < pivot[1]) j--;

    if (i <= j) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;

      i++;
      j--;
    }
  }

  quickSort(arr, left, i - 1);
  quickSort(arr, i, right);
}

(function main() {
  console.log(topKFrequent([5, 2, 5, 3, 5, 3, 1, 1, 3], 2));
})();

/**
 *
 * @param {number[]} arr
 */
function mergeSort(arr) {
  mergeSortHelp(arr, 0, arr.length - 1);
  console.log(arr);
}

/**
 *
 * @param {number[]} arr
 * @param {number} left
 * @param {number} right
 */
function mergeSortHelp(arr, left, right) {
  if (left >= right) return;

  mergeSortHelp(arr, left, Math.floor((left + right) / 2));
  mergeSortHelp(arr, Math.floor((left + right) / 2) + 1, right);

  merge2SortedArr(arr, left, right);
}

/**
 *
 * @param {number[]} arr
 * @param {number} left
 * @param {number} right
 * @description first sorted arr is arr[left: mid]. Second sorted arr is arr[mid+1, right]
 */
function merge2SortedArr(arr, left, right) {
  const mid = Math.floor((left + right) / 2);

  let i = left,
    j = mid + 1;

  const arrTemp = [];

  while (i <= mid && j <= right) {
    if (arr[i] < arr[j]) {
      arrTemp.push(arr[i]);
      i++;
    } else {
      arrTemp.push(arr[j]);
      j++;
    }
  }

  while (i <= mid) arrTemp.push(arr[i++]);
  while (j <= right) arrTemp.push(arr[j++]);

  // copy arrTemp to origin array "arr"
  for (let x = left; x <= right; x++) {
    arr[x] = arrTemp[x - left];
  }
}
// ==== Merge sort in single link list =====
function mergeSortLinkedList(head) {}

(function main() {
  const arr = [8, 4, 6, 2, 9, 1, 7, 3, 5, 2];
  mergeSort(arr);
})();

/**
 *
 * @param {number[]} arr
 * @param {number} x first index
 * @param {number} y second index
 */
function swap(arr, x, y) {
  const temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
}
/**
 *
 * @param {number[]} arr
 */
function quickSort(arr) {
  quickSortHelp(arr, 0, arr.length - 1);
}
/**
 *
 * @param {number[]} arr
 * @param {number} left left index
 * @param {number} right right index
 */
function quickSortHelp(arr, left, right) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  const pivot = arr[mid];

  let i = left,
    j = right;

  while (i <= j) {
    while (arr[i] < pivot) i++;
    while (arr[j] > pivot) j--;

    if (i <= j) {
      swap(arr, i, j);
      i++;
      j--;
    }
  }

  quickSortHelp(arr, left, i - 1);
  quickSortHelp(arr, i, right);
}

function main() {
  const arr = [5, 1, 3, 2];
  /*
  5, 2, 3, 1
  */
  quickSort(arr);
}

module.exports = quickSort;

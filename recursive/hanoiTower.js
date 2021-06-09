/**
 *
 * @param {number} n n >= 1
 * @description move tower from A to C (A B C columns)
 */
function hanoiTower(n, source, temp, target) {
  if (n === 1) {
    console.log(`Move disk from ${source} to ${target}`);
    return;
  }

  hanoiTower(n - 1, source, target, temp);
  console.log(`Move disk from ${source} to ${target}`);
  hanoiTower(n - 1, temp, source, target);
}

/**
 *
 * @param {number[]} arr
 */
function printArr(arr, idx = 0) {
  if (idx >= arr.length) return;
  printArr(arr, idx + 1);
  console.log(arr[idx]);
}

(function main() {
  hanoiTower(1, "A", "B", "C");
})();

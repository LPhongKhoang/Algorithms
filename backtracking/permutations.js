/**
 *
 * @param {number} n
 * @returns {number[][]}
 */
function genPermutation(n) {
  const res = [];
  const curr = [];
  const currSet = new Set();

  myTry(0, n, curr, res, currSet);

  console.log(res);
}
/**
 *
 * @param {number} k current index try to put number
 * @param {number} n max index
 * @param {number[]} curr current array
 * @param {number[][]} res result
 * @param {Set<number>} currSet current visited number
 * @returns {void}
 */
function myTry(k, n, curr, res, currSet) {
  for (let i = 0; i <= n; i++) {
    if (!currSet.has(i)) {
      curr[k] = i;
      currSet.add(i);

      // check if k is last index
      if (k === n) {
        res.push([...curr]);
      } else {
        myTry(k + 1, n, curr, res, currSet);
      }
      currSet.delete(i);
    }
  }
}

/**
 *
 * @param {number[]} arr
 * @returns {number[][]}
 */
function genPermutationOffArr(arr) {
  const res = [];
  const curr = [];
  const currSet = new Set();

  myTryArr(0, arr, curr, res, currSet);

  console.log(res);
}
/**
 *
 * @param {number} k current index try to put number
 * @param {number[]} arr original array
 * @param {number[]} curr current array
 * @param {number[][]} res result
 * @param {Set<string>} currSet current visited index:number
 * @returns {void}
 */
function myTryArr(k, arr, curr, res, currSet) {
  for (let i = 0; i < arr.length; i++) {
    const key = i + ":" + arr[i];
    if (!currSet.has(key)) {
      curr[k] = arr[i];
      currSet.add(key);

      // check if k is last index
      if (k === arr.length - 1) {
        res.push([...curr]);
      } else {
        myTryArr(k + 1, arr, curr, res, currSet);
      }

      currSet.delete(key);
    }
  }
}

(function main() {
  // genPermutationOffArr([1, 2, 3]);
  genPermutation(2);
})();

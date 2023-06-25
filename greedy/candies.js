/** hacker rank */

/**
 *
 * @param {number[]} arr
 * @returns
 * @description: wrong solution
 */
function candies(arr) {
  const n = arr.length;
  if (n === 1) return 1;

  let lastPick = 1;

  const arrLastPick = [lastPick];
  let res = lastPick; // init res
  for (let i = 1; i < n; i++) {
    if (arr[i] > arr[i - 1]) {
      if (lastPick > 0) lastPick += 1;
      else lastPick = 2;
    } else if (arr[i] === arr[i - 1]) {
      lastPick = 1;
    } else if (arr[i] < arr[i - 1]) {
      lastPick -= 1;
      if (lastPick === 0) lastPick = -2;
      else if (lastPick > 0) lastPick = 1;
    }
    arrLastPick.push(lastPick);
    res += Math.abs(lastPick);
  }
  console.log('arr        ', arr);
  console.log('arrLastPick', arrLastPick);
  return res;
}

(function main() {
  console.log(candies([8, 9, 5, 2, 4, 2, 6, 1, 7, 8, 9, 9, 9, 4, 3, 2, 1]));
})();
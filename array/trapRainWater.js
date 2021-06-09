/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let res = 0;
  let i = 0;
  while (i < height.length - 1) {
    // Step 1: check if height[i] is not wal or not
    if (height[i] === 0) {
      i += 1;
      continue;
    }

    // total wall from i+1
    let totalWallInWater = 0,
      pickWallInWater = 0,
      x = i + 1;

    // loop from x to find next Col (nearest > i or max Col)
    let nextW = x;
    for (; x < height.length; x++) {
      if (height[x] > height[i]) {
        nextW = x;
        pickWallInWater = totalWallInWater;
        break;
      } else {
        // find max Col
        if (height[x] > height[nextW]) {
          nextW = x;
          pickWallInWater = totalWallInWater;
        }
      }

      totalWallInWater += height[x];
    }

    res +=
      (nextW - i - 1) * Math.min(height[i], height[nextW]) - pickWallInWater;

    i = nextW;
  }

  return res;
};

(function main() {
  console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
})();

/**9  8  7  6  5 6
 * 1 -2 -3 -4 -5
 * 5  4  3  2  1 1
 */

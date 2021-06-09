/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
  if (k === 0) return 0;

  let res = 0,
    left = 0,
    prod = 1;

  for (let i = 0; i < nums.length; i++) {
    prod *= nums[i];

    if (nums[i] !== 0) {
      while (prod >= k && left <= i) {
        prod /= nums[left];
        left += 1;
      }
      res += i - left + 1;
    } else {
      res += nums.length + i * (nums.length - 1 - i);
      left = i + 1;
      prod = 1;
    }
  }
  return res;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanKBruteForce = function (nums, k) {
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    let prod = 1;
    for (let j = i; j < nums.length; j++) {
      prod *= nums[j];
      if (prod < k) res += 1;
    }
  }
  return res;
};

console.log(numSubarrayProductLessThanKBruteForce([10, 0, 2, 6, 0, 30], 16));

console.log(numSubarrayProductLessThanK([10, 0, 2, 6, 0, 30], 16));

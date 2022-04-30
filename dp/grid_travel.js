/**
 * Grid mxn (m: row, n: column)
 * Path: Start from top left corner --> bottom right corner
 * Only go down, right
 * How many path?
 */

/**
 * Way 1: Naive approach
 * Time: O(2^(m+n)):
 * Space: O(m+m): high of the tree
 */

function naiveCanSum(m, n) {
  if(m===1 && n===1) return 1;
  if(m===0 || n === 0) return 0;
  return naiveCanSum(m-1, n) + naiveCanSum(m, n-1);
}

function main(){
  console.log(naiveCanSum(2, 3)); // 3
  console.log(naiveCanSum(4, 3)); // 10
  console.log(naiveCanSum(5, 6)); // 126
  console.log(naiveCanSum(18, 18)); // 126
};

main();
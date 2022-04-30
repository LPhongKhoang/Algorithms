/**
 * F1 = F2 = 1;
 * F(n) = F(n-1) + F(n-2), n >= 3;
 */

/**
 * way 1: native approach
 * Time: O(2^n)
 * Space: O(n)
 */
function naiveFib(n) {
  if(n<=2) return 1;
  return naiveFib(n-1) + naiveFib(n-2);
}

/**
 * Way 0: my first think
 * Time: O(n)
 * Space: O(1)
 */

function myFib(n) {
  if(n<=2) return 1;
  let fn_2 = fn_1 = 1;

  while(n>2) {
    const fn = fn_1 + fn_2;
    fn_2 = fn_1;
    fn_1 = fn;

    n-=1;
  }

  return fn_1;
}

/**
 * Way 2: Memoization
 * Time: O(n)
 * Space: O(n)
 */
function memoizationFib(n, memo={}) {
  if(n<=2) return 1;
  if(n in memo) return memo[n];

  memo[n] = memoizationFib(n-1, memo) + memoizationFib(n-2, memo);

  return memo[n];
}



function main() {
  // console.log(naiveFib(7));
  console.log(myFib(7));
  console.log(memoizationFib(7));
}

main();
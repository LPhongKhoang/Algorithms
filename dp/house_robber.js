/**
 *
 * @param {number[]} arr
 */
function houseRobber(arr) {
  if (arr.length === 1) return arr[0];

  let fn_1 = arr[0],
    fn = Math.max(fn_1, arr[1]);

  for (let i = 2; i < arr.length; i++) {
    const f_i = Math.max(fn, fn_1 + arr[i]);
    fn_1 = fn;
    fn = f_i;
  }

  return fn;
}

function main() {
  console.log(houseRobber([2, 7, 9, 3, 1, 100]));
}
/*
 2: 2
 7: 7 = 7
 9: 2, 9 = 11
 3: 2, 9 = 11
 1: 2, 9, 1 = 12
 100: 2, 9, 100 = 111
 */

main();

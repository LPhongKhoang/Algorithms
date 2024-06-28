// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

/**
 * 
 * @param {number} n 
 * @returns number
 */
function solution(n) {
  // Implement your solution here
  

  let res = 0;
  let curr = 0;
  let flag = false;

  while(n > 0) {
      const r = n%2;

      if(r == 1) {
          
          if(flag) {
              res = Math.max(res, curr);
              // reset curr
              curr = 0;
          }
          flag = true;
          
      }else {
          if(flag) curr += 1;
      }

      n = Math.floor(n/2);
  }


  return res;
}   


function main() {
  console.log(solution(32)); // 100000 - 0
  console.log(solution(6)); // 110 - 0
  console.log(solution(328));  // 101001000 - 2
  console.log(solution(42)); // 101010 - 1
  console.log(solution(51712)); // 110010100000000 - 2
  console.log(solution(20)); // 10100 - 1
  console.log(solution(561892)); // 10001001001011100100 - 3
}

main();
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
  /**
      consider each new number is node and the square formular is linked

      n -> n1 -> n2 -> ... -> nx


      if nx == 1 {
          // we have cycle linked-list at tail 
          // happy number
      } else {
          // we have cycle linked-list at somewhere in middle (not tail)
          // unhappy number
      }
   */

  let slow = n, fast = squareDigits(n)
  while (slow !== fast) {
      slow = squareDigits(slow)
      fast = squareDigits(squareDigits(fast))
  }

  return slow === 1

};

var squareDigits = function(n) {
  let sum = 0

  while (n!=0) {
      const remainder = n%10
      sum += remainder * remainder

      n = Math.floor(n/10)
  }
  

  return sum;
}


function main() {
  console.log(isHappy(19))

}

main();
const fs = require('fs');
const assert = require('assert');

/** Get index of given letter: A: 0, B:1, ...,Z: 25, a: 26, b: 27, ..., z: 51
 * c {string} character: lowercase or uppercase letter   
 */
 function getIndexOfLetter(c) {
  const code = c.charCodeAt(0);
  // check if c is UPPER
  if(code >= 65 && code <=90) {
      return code - 65;
  }else if(code >= 97 && code <= 122) {
      return code - 71;
  }
  return -1;
}
/**
* @param {string} s
* @return {number}
*/
var longestPalindrome = function(s) {
  const countArr = Array(52).fill(0);
  
  for(const c of s) {
      const idx = getIndexOfLetter(c);
      countArr[idx] += 1;
  }
  
  let sumEven = 0, hasOdd = false;
  for(const num of countArr) {
     if(num % 2 === 0) {
         sumEven += num;
     }else {
         sumEven += (num-1);
         hasOdd = true;
     }
  }
  
  return sumEven + (hasOdd ? 1 : 0);
};

var longestPalindrome2 = function(s) {
  const countMap = new Map();
  
  for(const c of s) {
      if(!countMap.has(c)) {
        countMap.set(c, 1);
      }else {
        countMap.set(c, countMap.get(c) + 1);
      }
  }
  
  let sumEven = 0, hasOdd = false;
  for(const num of countMap.values()) {
     if(num % 2 === 0) {
         sumEven += num;
     }else {
         sumEven += (num-1);
         hasOdd = true;
     }
  }
  
  return sumEven + (hasOdd ? 1 : 0);
};

async function main() {
  try {
    const input = fs.readFileSync('./data/input1.txt').toString();
    
    const res = longestPalindrome(input);
    const res2 = longestPalindrome2(input);
    
    assert.equal(res, 983);
    assert.equal(res2, 983);
  
  }catch(error) {
    console.error(error);
  }
}

main();
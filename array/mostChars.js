/**
 *
 * @param {string} str
 */
function mostCharacter(str) {
  if (str.length === 0) return '';

  const map = new Map();
  let res = str[0];

  for (let i = 0; i < str.length; i++) {
    const currCount = (map.get(str[i]) || 0) + 1;
    map.set(str[i], currCount);

    if (str[i] !== res && currCount > map.get(res)) {
      res = str[i];
    }
  }

  return res;
}

/**
 *
 * @param {number} max < 1b
 * @param this is the correct way
 * @returns number
 */
function sum(max) {
  if (max <= 1) return -1;

  /**
   = 1 + 2 + 3 + 4 + 5 + ... + n

   if n is even:

   = (1+n) + (2+n-1) + (n/2 + n/2 + 1)
   = (n+1) * n / 2;
   
   
   if n is odd:
   = (1+n) + (2+n-1) + ((n-1)/2 + (n-1)/2+2) + (n+1)/2
   = (1+n) * ((n-1)/2)  + (n+1)/2
    
   */

  if (max % 2 === 0) {
    return (max / 2) * (max + 1);
  } else {
    return ((max + 1) / 2) * max;
  }
}

/**
 *
 * @param {number} max
 * @description without BigInt: the original number is result false
 * @returns
 */
function sumOrigin(max) {
  let res = BigInt(0);
  for (let i = 1; i <= max; i++) {
    res += BigInt(i);
  }
  return res;
}

function main() {
  console.log('> ', mostCharacter(process.argv[2]));
  // console.log('>', sum(Number(process.argv[2])));
  // console.log('>', sumOrigin(Number(process.argv[2])));
}

main();

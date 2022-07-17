/**
 *
 * @param {number} n n >= 1
 * @description move tower from A to C (A B C columns)
 */
function hanoiTower(n, source, temp, target) {
  if (n === 1) {
    console.log(`Move disk from ${source} to ${target}`);
    return;
  }

  hanoiTower(n - 1, source, target, temp);
  console.log(`Move disk from ${source} to ${target}`);
  hanoiTower(n - 1, temp, source, target);
}

/**
 *
 * @param {number[]} arr
 */
function printArr(arr, idx = 0) {
  if (idx >= arr.length) return;
  printArr(arr, idx + 1);
  console.log(arr[idx]);
}


// let counter = 0;

(function main() {
  // hanoiTower(3, "A", "B", "C");
  
  const n = 4;

  haNoiTowerSolving(n, "A", "B", "C");

  // console.log(`n=${n}: --> counter = ${counter}`);
})();

// n=1: --> 1
// n=2: ---> 3
// n=3: ---> 7
// n= 7 ---> 127




function haNoiTowerSolving(n, A, B, C) {
  if(n==1) {
    console.log('Chuyen dia 1: ' + A + ' -> ' + C );
    return;
  }

  haNoiTowerSolving(n-1, A, C, B); // n-1 dia da o cot "B"

  console.log('Chuyen dia ' + n + ': ' + A + ' -> ' + C); // dia to nhat o cot "C"

  haNoiTowerSolving(n-1, B, A, C); // n-1 dia da o cot "C"
} 


/**
Let T(N) be the time it takes for N disks.

We have:
T(1) = 1
T(2) = T(1) + 1 + T(1) = 2T(1) + 1
T(3) = T(2) + 1 + T(2) = 2T(2) + 1 = 2 (2T(1) + 1) + 1 = 4T(1) + 3 = 2^(3-1)+ 3
T(4) = 2T(3) + 1 = 2(2^(3-1)+ 3) + 1 = 2^3 + 2^3 - 1

T(n) = 2T(n-1) + 1 = 2^(n-1) + 2^(n-1) -1 = 2^n -1

---> O(2^n)
 */







/**
 * ```
Let T(N) be the time it takes for N disks.

We have:

T(1) = 1
and
T(N) = O(1) + 2*T(N-1) when N>1
If you repeatedly expand the last term, you get:

T(N) = 3*O(1) + 4*T(N-2)
T(N) = 7*O(1) + 8*T(N-3)
...
T(N) = (2^(N-1)-1)*O(1) + (2^(N-1))*T(1)
T(N) = (2^N - 1)*O(1)
T(N) = O(2^N)
```
 */


/**
 * F(1) = 1;
 * F(n) = 2F(n-1) + 1
 * 
 * F(1) = 1
 * F(2) = 2F(1) + 1 = 2*1 + 1
 * F(3) = 2F(2) + 1 = 2*(2*1+1) + 1 = 2*2 + 3
 * F(4) = 2F(3) + 1 = 2*(2*2 + 3) + 1 = 2*2*2 + 7 = 2^3 + 7
 * 
 * F(n) = 2^(n-1) + C 
 * -->   O(2^n)
 * 
 
S = 2^0 + 2^1 + 2^2 + .... + 2^63 = 2^64 -1)
 */

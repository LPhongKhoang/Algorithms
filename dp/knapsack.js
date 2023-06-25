/**
 * description: Given weights and values of n items, 
 * put these items in a knapsack of capacity W to get the maximum total value in the knapsack.
 */

/**
 *
 * @param {number[]} values values in each knapsack
 * @param {number[]} weighs weight of each knapsack
 * @param {number} capacity your limit weight of your knapsack
 * @param {number} n the number of knapsack
 * @returns number
 * @author GitHub Copilot
 *
 */ 
function knapsackDP(values, weights, capacity, n) {
  // initialize the matrix
  const K = Array.from(Array(n + 1), () => Array(capacity + 1).fill(0));

  // Build table K[][] in bottom up manner
  // K[i][w] represents the maximum value that can be attained with a weight limit of w and using only the first i items
  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (i === 0 || w === 0) {
        K[i][w] = 0;
        console.log(`base case: K[${i}][${w}]`, K[i][w]);
      } 
      // If weight of the nth item is more than Knapsack capacity W, then
      // this item cannot be included in the optimal solution
      else if (weights[i - 1] <= w) {
        K[i][w] = Math.max(
          values[i - 1] + K[i - 1][w - weights[i - 1]],
          K[i - 1][w]
        );
        console.log(`: K[${i}][${w}]`, K[i][w]);

      } else {
        K[i][w] = K[i - 1][w];
      }
    }
  }

  return K[n][capacity];
}


// Write unit test for this function above
console.log(knapsackDP([60, 100, 120], [10, 20, 30], 50, 3));
console.log(knapsackDP([1, 2, 3], [4, 5, 1], 4, 3));
console.log(knapsackDP([1, 2, 3], [4, 5, 1], 5, 3));

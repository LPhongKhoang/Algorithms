import MyQueue from '../common/queue.js';

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  
  let count = 0;
  const visited = new Set();
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      // Check if the cell is land and not visited
      if(grid[i][j] === '1' && !visited.has(`${i}-${j}`)) {
        count++;
        bfsLands(grid, i, j, visited);
      }
    }  
  }

  return count;
};

var bfsLands = function(grid, i, j, visited) {
  const q = new MyQueue();
  q.enqueue([i, j]);
  visited.add(`${i}-${j}`);

  while(!q.isEmpty()) {
    const [x, y] = q.dequeue();
    const neighbors = getNeighbors(grid, x, y);
    for(let i = 0; i < neighbors.length; i++) {
      const [x, y] = neighbors[i];

      // Check if the neighbor is valid and not visited
      if(grid[x][y] === '1' && !visited.has(`${x}-${y}`)) {
        q.enqueue([x, y]);
        visited.add(`${x}-${y}`);
      }
    }
  }

  return;
}

var getNeighbors = function(grid, i, j) {
  const neighbors = [];
  if(i - 1 >= 0) {
    neighbors.push([i - 1, j]);
  }
  if(i + 1 < grid.length) {
    neighbors.push([i + 1, j]);
  }
  if(j - 1 >= 0) {
    neighbors.push([i, j - 1]);
  }
  if(j + 1 < grid[i].length) {
    neighbors.push([i, j + 1]);
  }
  return neighbors;
}

/**
Example 1:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Example 2:
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
 */

function main() {
  let grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ];
  console.log('Result is', numIslands(grid));
  
  grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ];
  console.log('Result is', numIslands(grid));

  grid = [
    ["1","1","1"],
    ["0","1","0"],
    ["1","1","1"]
  ]

  console.log('Result is', numIslands(grid));
};

main();

// What is the time complexity of numIslands?
// O(M * N) where M is the number of rows and N is the number of columns

// What is the space complexity of numIslands?
// O(M * N) where M is the number of rows and N is the number of columns

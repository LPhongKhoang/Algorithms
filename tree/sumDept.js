/*
                    8
          4                   3
      7         2         1         9
    5   2     8         4   7     6   5       
*/
(function main() {
  // const node1 = { val: 8, left: null, right: null };
  // const node2 = { val: 9, left: null, right: null };
  // const node3 = { val: 4, left: node1, right: node2 };
  // const node5 = { val: 5, left: null, right: null };
  // const node6 = { val: 2, left: node3, right: node5 };

  // const node9 = { val: 6, left: null, right: null };
  // const node12 = { val: 7, left: null, right: null };
  // const node13 = { val: 3, left: node9, right: node12 };

  // const node14 = { val: 1, left: node6, right: node13 };

  const node1 = { val: 5, left: null, right: null };
  const node2 = { val: 2, left: null, right: null };
  const node3 = { val: 7, left: node1, right: node2 };
  const node4 = { val: 8, left: null, right: null };
  const node5 = { val: 2, left: node4, right: null };
  const node6 = { val: 4, left: node3, right: node5 };

  const node7 = { val: 4, left: null, right: null };
  const node8 = { val: 7, left: null, right: null };
  const node9 = { val: 1, left: node7, right: node8 };
  const node10 = { val: 6, left: null, right: null };
  const node11 = { val: 5, left: null, right: null };
  const node12 = { val: 9, left: node10, right: node11 };
  const node13 = { val: 3, left: node9, right: node12 };

  const node14 = { val: 8, left: node6, right: node13 };

  const res1 = sumDeptOfSubtrees(node14);
  console.log(res1);
})();

function sumDept(root) {
  if (!root) return 0;

  const res = { val: 0 };
  _dfs(root, 0, res);
  return res.val;
}

function _dfs(node, deptOfNode, res) {
  res.val += deptOfNode;

  if (node.left) _dfs(node.left, deptOfNode + 1, res);
  if (node.right) _dfs(node.right, deptOfNode + 1, res);
}

// Calculate total sumDept of all subtrees
function sumDeptOfSubtrees(root) {
  if (!root) return 0;

  //arr use to count number  of node  has i-th level (from root)
  const arr = [];

  _dfs2(root, 0, arr); // or use bfs
  // bfs(root, arr); // or use _dfs2

  console.log(arr);

  let res = 0;
  for (let i = 0; i < arr.length; i++) {
    res += _partSumOfAtLevel(arr[i], i);
  }

  return res;
}

function _dfs2(node, level, arr) {
  if (!arr[level]) arr[level] = 1;
  else arr[level] += 1;

  if (node.left) _dfs2(node.left, level + 1, arr);
  if (node.right) _dfs2(node.right, level + 1, arr);
}

// root is not null
function bfs(root, arr) {
  const queue = [root, null];
  let level = 0;
  let node;
  while (queue.length) {
    node = queue.shift(); // dequeue

    if (node == null) {
      level += 1;
      if (queue.length == 0) break;
      else queue.push(null);
    } else {
      arr[level] = arr.length > level ? arr[level] + 1 : 1;
      if (node.left) {
        queue.push(node.left); // enqueue
      }

      if (node.right) {
        queue.push(node.right); // enqueue
      }
    }
  }
}

/*
+ dept of node = level of node
+ level of root = 0

--> with node X - level 4, it is in subtree of nodes have level is 0, 1, 2, 3
--> each new root node, node X will add to the sum is: 4, 3, 2, 1
--> we need to count the number of node has level a
--> add sum+= time*(a+(a-1)+(a-2)+...+1)
*/
function _partSumOfAtLevel(time, level) {
  return (time * level * (level + 1)) / 2;
}

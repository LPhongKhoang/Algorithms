/*
                    8
               /           \
          4                   3
       /      \             /     \ 
      7         2         1         9
    /  \       /        /   \      /  \
    5   2     8         4   7     6   5       
*/


class Node {
  value; // int
  left; // Node
  right; // Node

  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  print() {
    console.log('Node ' + value);
  }
}


let total = 0;
(function main() {

  const node13 = { val: 13, left: null, right: null };

  const node14 = { val: 14, left: null, right: null };

  const node6 = { val: 6, left: null, right: node13 };

  const node7 = { val: 7, left: node14, right: null };

  const node3 = { val: 3, left: node6, right: node7 };

  const node10 = { val: 10, left: null, right: null };

  const node11 = { val: 11, left: null, right: null };

  const node5 = { val: 5, left: node10, right: node11 };

  const node8 = { val: 8, left: null, right: null };

  const node9 = { val: 9, left: null, right: null };

  const node4 = { val: 4, left: node8, right: node9 };
  const node2 = { val: 2, left: node4, right: node5 };

  const node1 = { val: 1, left: node2, right: node3 };


  bfs_queue(node1);

  

  // const res1 = sumDeptOfSubtrees(root);
  // console.log(res1);
  // displayAllNodesOfTree_BSF(root);

  // console.log('total = ', total);

})();

function dfs_stack(node) {
  const stack = [node];

  while(stack.length > 0) {
    const currNode = stack.pop(); 
    // 1, 2, 4, 8, 9 ; stack: [], [3], [3, 4], [3, 4, 9]

    console.log('Node ', currNode.val); 
    // 1, 2, 4, 8
    // Check right
    if(currNode.right) {
      stack.push(currNode.right); 
      // stack: [3], [3, 5], [3, 4, 9]
    }

    // check left
    if(currNode.left) {
      stack.push(currNode.left); 
      // stack: [3, 2], [3, 5, 4], [3, 4, 9, 8]
    }

    
  }

}

function bfs_queue(node) {
  // queue: enqueue, dequeue

  const queue = [node]; 

  while(queue.length > 0) {
    const currNode = queue.shift(); // dequeue
  

    console.log('Node ', currNode.val); 

    // check left
    if(currNode.left) {
      queue.push(currNode.left); // enqueue
    }


    // Check right
    if(currNode.right) {
      queue.push(currNode.right); // enqueue
    }
    
  }

}

function dfs3_pre_order(node) {
  console.log('Node ' + node.val);
  
  if(node.left) {
    dfs3_pre_order(node.left);
  }

  if(node.right) {
    dfs3_pre_order(node.right);
  }
}

function dfs3_in_order(node) {
  
  if(node.left) {
    dfs3_in_order(node.left);
  }

  console.log('Node ' + node.val);

  if(node.right) {
    dfs3_in_order(node.right);
  }
}

function dfs3_post_order(node) {
  
  if(node.left) {
    dfs3_post_order(node.left);
  }

  if(node.right) {
    dfs3_post_order(node.right);
  }

  console.log('Node ' + node.val);
}

// Depth first search (DFS)
function displayAllNodesOfTree(root) {
  console.log('Node: ' + root.val);
  total += root.val;

  if(root.left) {
    displayAllNodesOfTree(root.left);
  }

  if(root.right) {
    displayAllNodesOfTree(root.right);
  }
  
}

// Breath first search (BFS)
// Quay lui - nhanh can : max: 18

function displayAllNodesOfTree_BSF(root) {
  // 8 , 4, 3, 7, 2, .....
  // [8]
  const queue = [root];

  let node;

  while(queue.length !== 0) {
    // L1: [8]. L2: [4, 3]
    node = queue.shift(); // [], node = 8. L2: [3], node: 4
    console.log('Node: ', node.val);// 8, 4

    if(node.left) {
      queue.push(node.left); // [4], [3, 7]
    }

    if(node.right) {
      queue.push(node.right); // [4, 3], [3, 7, 2]
    }
  }
  

}

















  

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

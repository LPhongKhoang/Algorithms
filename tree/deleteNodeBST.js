/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
 var deleteNode = function(root, key) {
  // find node
  let node = root;
  let parentNode = null;
  let isLeft = true;
  while(node) {
      if(node.val > key) {
          parentNode = node;
          isLeft = true;
          node = node.left;
      }else if(node.val < key) {
          parentNode = node;
          isLeft = false;
          node = node.right;
      }else {
          // Found node
          break;
      }
  }
  
  // Check if node is found (node.val = key)
  if(node.val === key) {
      // Delete node
      if(node.left === null && node.right === null) {
          if(parentNode) {
              parentNode[isLeft? 'left' : 'right'] = null;
          }else {
              root = null;
          }
      }else if(node.left !== null && node.right === null) {
          if(parentNode) {
              parentNode[isLeft? 'left' : 'right'] = node.left;
          }else {
              root = node.left;
          }
      }else if(node.left === null && node.right !== null) {
          if(parentNode) {
              parentNode[isLeft? 'left' : 'right'] = node.right;
          }else {
              root = node.right;
          }
      } else {
          // replace node is right most of left tree from node
          // (other choice: is left most of right tree from node)
          let parentRepNode = null, replaceNode = node.left;
          while(replaceNode.right) {
              parentRepNode = replaceNode;
              replaceNode = replaceNode.right;
          }
          
          if(parentRepNode) {
            parentRepNode.right = replaceNode.left;
          }

          replaceNode.right = node.right;
          if(replaceNode !== node.left) replaceNode.left = node.left;

          if(parentNode) {
              parentNode[isLeft? 'left' : 'right'] = replaceNode;
          } else {
              root = replaceNode;
          }
      }
  }
  
  return root;
};

/**
 * 
 * @param {number[]} arr 
 */
function buildTreeFromArr(arr) {
  if(arr.length === 0) {
    return null;
  } 
  const root = {val: arr[0], left: null, right: null};
  let node = root;
  const parentNodeArr = [node];
  let currNodeIndex = 0;
  for(let i = 1; i < arr.length; i++) {
    const newNode = arr[i] === null ? null : {
      val: arr[i],
      left: null,
      right: null
    }

    parentNodeArr.push(newNode);

    if(parentNodeArr[currNodeIndex]) {
      if(i%2==1) {
        parentNodeArr[currNodeIndex].left = newNode;
      }else {
        parentNodeArr[currNodeIndex].right = newNode;
        currNodeIndex+=1;
      }
    }else {
      currNodeIndex
    }
    
  }

  return root;
}

function bfs(root) {
  const arr = [];
  const nodeQueue = [root];
  while(nodeQueue.length > 0) {
    const node = nodeQueue.shift();
    arr.push(node === null? null : node.val);

    if(node) {
      nodeQueue.push(node.left, node.right);
    }
    
  }

  return arr;
}

function main() {
  // let root = {
  //   val: 5,
  //   left: {
  //     val: 3,
  //     left: {val: 2, left: null, right: null},
  //     right: {val: 4, left: null, right: null}
  //   },
  //   right: {
  //     val: 6,
  //     left: null,
  //     right: {val: 7, left: null, right: null}
  //   }
  // };
  let root = buildTreeFromArr([5, 3, 6, 2, 4, null, 7]);

  // root = deleteNode(root, 5);
  const arr = bfs(root);

  console.log(arr);
  console.log(arr.join(','));
}

main();
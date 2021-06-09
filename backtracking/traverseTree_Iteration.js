function inOrder(node, res) {
  if (node == null) return;
  inOrder(node.left, res);
  res.push(node.val);
  inOrder(node.right, res);
}
function postOrder(node, res) {
  if (node == null) return;
  postOrder(node.left, res);
  postOrder(node.right, res);
  res.push(node.val);
}
function preOrder(node, res) {
  if (node == null) return;
  res.push(node.val);
  preOrder(node.left, res);
  preOrder(node.right, res);
}

var inOrderTraversal = function (root) {
  const res = [];

  inOrder(root, res);
  return res;
};

var postOrderTraversal = function (root) {
  const res = [];

  postOrder(root, res);
  return res;
};

var preOrderTraversal = function (root) {
  const res = [];

  preOrder(root, res);
  return res;
};

var inOrderTraversal_Iteration = function (root) {
  if (root == null) return [];

  const res = [];

  const stack = [root];

  let node;
  let isPop = false;

  while (stack.length > 0) {
    node = stack[0];
    if (node.left != null && isPop == false) {
      stack.unshift(node.left);
      continue;
    } else {
      res.push(node.val);
      stack.shift();
      isPop = true;
    }

    if (node.right != null) {
      stack.unshift(node.right);
      isPop = false;
      continue;
    }
  }

  return res;
};

var postOrderTraversal_Iteration = function (root) {
  if (root == null) return [];

  const res = [];

  const stack = [root];

  let node;
  let isAddLeft = false,
    isAddRight = false;

  while (stack.length > 0) {
    node = stack[0];
    if (node.left != null && !isAddLeft) {
      stack.unshift(node.left);
    } else if (node.right != null && !isAddRight) {
      stack.unshift(node.right);
      isAddLeft = false;
    } else {
      res.push(stack.shift().val);
      if (stack[0]) {
        if (stack[0].left == node) {
          isAddLeft = true;
          isAddRight = false;
        } else if (stack[0].right == node) {
          isAddRight = true;
          isAddLeft = true;
        }
      }
    }
  }

  return res;
};

var preOrderTraversal_Iteration = function (root) {
  if (root == null) return [];

  const res = [];

  const stack = [root];

  let node;
  let isPopLeft = false,
    isPopRight = false;

  while (stack.length > 0) {
    node = stack[0];

    if (!isPopLeft && !isPopRight) res.push(node.val);

    if (node.left != null && !isPopLeft) {
      stack.unshift(node.left);
    } else if (node.right != null && !isPopRight) {
      stack.unshift(node.right);
      isPopLeft = false;
    } else {
      stack.shift();
      if (stack[0]) {
        if (stack[0].left == node) {
          isPopLeft = true;
          isPopRight = false;
        } else if ((stack[0].right = node)) {
          isPopRight = true;
          isPopLeft = true;
        }
      }
    }
  }

  return res;
};

/**
 *
 * @param {any[]} initArr
 */
function MyStack(initArr) {
  /**
   * @type any[]
   */
  this.arr = initArr || [];

  /**
   *
   * @param {any} value
   */
  this.push = function (value) {
    this.arr.unshift(value);
  };

  this.pop = function () {
    return this.arr.shift();
  };

  this.peek = function () {
    return this.arr[0];
  };

  this.size = function () {
    return this.arr.length;
  };
}
var inOrderTraversal_Iteration2 = function (root) {
  if (root == null) return [];

  const stack = new MyStack([root]);
  const res = [];

  let isJustPop = false;
  let node;
  while (stack.size() > 0) {
    // get newest node in stack
    node = stack.peek();

    if (node.left != null && !isJustPop) {
      stack.push(node.left);
      continue;
    } else {
      stack.pop();
      res.push(node.val);
      isJustPop = true;
    }

    if (node.right != null) {
      stack.push(node.right);
      isJustPop = false;
    }
  }
  return res;
};

function nodesByLevel(root) {
  if (root == null) return [];

  const res = [];
  const queue = [root, null];
  let level = 0;
  let node;
  while (true) {
    node = queue.shift();

    if (node == null) {
      if (queue.length == 0) break;

      level += 1;
      queue.push(null);
      continue;
    }

    // add node to res by level
    if (!res[level]) res[level] = [];
    res[level].push(node.val);

    // add child node to queue
    if (node.left != null) queue.push(node.left);
    if (node.right != null) queue.push(node.right);
  }

  return res;
}

function nodesZigZagByLevel(root) {
  if (root == null) return [];

  const res = [];
  const queue = [root, null];
  let level = 0;
  let flag = 1;
  let node;
  while (true) {
    node = queue.shift();

    if (node == null) {
      if (queue.length == 0) break;

      level += 1;
      flag *= -1;
      queue.push(null);
      continue;
    }

    // add node to res by level
    if (!res[level]) res[level] = [];

    if (flag == 1) {
      res[level].push(node.val);
    } else {
      res[level].unshift(node.val);
    }

    // add child node to queue
    if (node.left != null) queue.push(node.left);
    if (node.right != null) queue.push(node.right);
  }

  return res;
}

/*
                    8
          4                   3
      7         2         1         9
    5   2     8         4   7     6   5       
*/
function main() {
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

  // const res1 = preOrderTraversal_Iteration(node14);
  // const res2 = preOrderTraversal(node14);

  // console.log(res1);
  // console.log(res2);

  try {
    console.log("in try");
    return "main";
    throw new Error("error in try");
  } catch (e) {
    console.log("in catch");
    throw e;
  } finally {
    console.log("in finally");
    // return "main finally";
  }
}

console.log(main());

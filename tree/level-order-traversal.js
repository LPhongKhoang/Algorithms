/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

 function QueueNode(treeNode) {
  this.val = treeNode;
  this.next = null;
}

function Queue() {
  this.head = null;
  this.tail = null;
  this.size = 0;
  
  this.enqueue = function(treeNode) {
      const queueNode = new QueueNode(treeNode);
      if(this.isEmpty()) {
          this.head = queueNode;
          this.tail = queueNode;
      }else {
          this.tail.next = queueNode;
          this.tail = queueNode;
      }
      
      this.size += 1;
  }
  
  this.dequeue = function() {
      if(this.isEmpty()) return null;
      
      const node = this.head;
      this.head = node.next;
      
      if(this.head === null) this.tail = null;
      
      this.size -= 1;
      
      return node;
  }
  
  this.isEmpty = function() {
      return this.size === 0;
  }
}

/**
* @param {TreeNode} root
* @return {number[][]}
*/
var levelOrder = function(root) {
  if(root === null) return [];
  
  const res = [];
  const queue = new Queue();
  queue.enqueue(root);
  queue.enqueue(null); // first mark for level 1 is end
  
  let currLevel = [];
  while(!queue.isEmpty()) {
      const treeNode = queue.dequeue().val;
      
      if(treeNode !== null) {
          currLevel.push(treeNode.val);
          
          if(treeNode.right) {
              queue.enqueue(treeNode.right);
          }
          
          if(treeNode.left) {
              queue.enqueue(treeNode.left);
          }
      }else {
          // Handle end of current level
          res.push(currLevel);
          currLevel = [];
          
          // Check if need to mark for next level
          if(!queue.isEmpty()) {
              queue.enqueue(null);
          }
      }
      
  }
  
  return res;
  
};

function main() {
  const root = {
    val: 3,
    left: {
      val: 9,
      left: null,
      right: null,
    },
    right: {
      val: 20,
      left: {
        val: 15,
        left: null,
        right: null
      },
      right: {
        val: 7,
        left: null,
        right: null
      }
    }
  }

  const res = levelOrder(root);

  console.log('res', res);
}

main();
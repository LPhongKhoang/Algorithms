/* 
  Node {
    val: int,
    next: Node
  }
*/

function merge2SortedLinkList(head1, head2) {
  if (head1 == null) return head2;
  if (head2 == null) return head1;

  let head;

  // processing
  let parent, node;
  while (head1 != null && head2 != null) {
    if (head1.val <= head2.val) {
      node = head1;
      head1 = head1.next;
    } else {
      node = head2;
      head2 = head2.next;
    }

    if (!head) {
      head = node;
    }

    if (parent) {
      parent.next = node;
    }
    parent = node;
  }

  if (head1 != null) node.next = head1;
  if (head2 != null) node.next = head2;

  return head;
}

/**
 *
 * @param {number[]} arr
 */
function buildLinkedList(arr) {
  if (arr.length == 0) return null;

  const head = { val: arr[0], next: null };
  let node = head;
  for (let i = 1; i < arr.length; i++) {
    node.next = { val: arr[i], next: null };
    node = node.next;
  }
  return head;
}

function display(head) {
  let node = head;
  let str = "";
  while (node != null) {
    str += node.val + " -> ";
    node = node.next;
  }
  console.log(str);
}

function getMiddleNode(head) {
  if (head == null) return null;

  let slow = head,
    fast = head;
  while (fast.next != null && fast.next.next != null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}

(function main() {
  const head1 = buildLinkedList([4, 10, 16, 27, 18, 24]);
  const head2 = buildLinkedList([5, 9, 11, 13, 14, 30, 25, 21, 22]);
  // const head = merge2SortedLinkList(head1, head2);

  const mid1 = getMiddleNode(head1);
  const mid2 = getMiddleNode(head2);

  console.log(mid1);
  console.log(mid2);
  // display(head);s
})();

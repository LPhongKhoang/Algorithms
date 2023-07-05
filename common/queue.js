export default class MyQueue {
  constructor() {
    this.items = [];
    this.head = -1;
    this.tail = -1;
  }

  enqueue(item) {
    if(this.head === -1) {
      this.head = 0;
    }

    this.items[++this.tail] = item;
  }

  dequeue() {
    if(this.head === -1) {
      return null;
    }

    const item = this.items[this.head];
    this.head++;

    if(this.head > this.tail) {
      this.head = -1;
      this.tail = -1;
    }

    return item;
  }

  isEmpty() {
    return this.head === -1;
  }

  get size() {
    if (this.isEmpty()) {
      return 0;
    }
    return this.tail - this.head + 1;
  }

}

export class NodeLL {
  /**
   * 
   * @param {number|string} value 
   */
  constructor(value) {
    /**
     * @type {number|string}
     */
    this.value = value;

    /**
     * @type {NodeLL}
     */
    this.next = null;
  }
}
export class LinkedList {
  constructor() {
    /**
     * @type {NodeLL}
     */
    this.head = null;

    /**
     * @type {NodeLL}
     */
    this.tail = null;

    this._size = 0;
  }


  get size() {
    return this._size;
  }

  isEmpty() {
    return this.head === null;
  }


  /**
   * 
   * @param {number|string} value 
   */
  append(value) {
    const node = new NodeLL(value);

    if(this.head === null) {
      this.head = node;
      this.tail = node;
    }else {
      this.tail.next = node;
      this.tail = node;
    }
    this._size++;
  }

  /**
   * 
   * @param {number|string} x 
   * @returns 
   */
  getNode(x) {
    let currNode = this.head;

    while(!!currNode) {
      if(currNode.value === x) {
        return currNode;
      }else {
        currNode = currNode.next; // di den node tiep theo
      }
    }

    return null;
  }

  /**
   * 
   * @param {number|string} value 
   */
  enqueue(value) {
    this.append(value);
  }

  dequeue() {
    if(this.head === null) {
      return;
    }

    const node = this.head;
    this.head = this.head.next;

    if(this.head === null) {
      this.tail = null;
    }

    this._size--;
    return node.value;
  }
}

// function test() {
//   const q = new Queue();
//   console.log(q.size, 'size')
//   q.enqueue(1);
//   q.enqueue(2);
//   q.enqueue(3);
//   console.log(q.dequeue());
//   console.log(q.dequeue());
//   console.log(q.dequeue());
//   console.log(q.dequeue());
//   console.log(q.dequeue());
//   console.log(q.dequeue());
//   console.log(q.dequeue());
//   q.enqueue(4);
//   q.enqueue(5);
//   q.enqueue(6);

//   console.log(q.size, 'size');
//   console.log(q.dequeue());
//   console.log(q.dequeue());
//   console.log(q.dequeue());
//   console.log(q.dequeue());
// }
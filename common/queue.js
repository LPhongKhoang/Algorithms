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
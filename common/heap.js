export class MinHeap {
	constructor() {
		this.heap = [];
	}

	// Helper Methods
	getLeftChildIndex(parentIndex) {
		return 2 * parentIndex + 1;
	}
	getRightChildIndex(parentIndex) {
		return 2 * parentIndex + 2;
	}
	getParentIndex(childIndex) {
		return Math.floor((childIndex - 1) / 2);
	}
	hasLeftChild(index) {
		return this.getLeftChildIndex(index) < this.heap.length;
	}
	hasRightChild(index) {
		return this.getRightChildIndex(index) < this.heap.length;
	}
	hasParent(index) {
		return this.getParentIndex(index) >= 0;
	}
	leftChild(index) {
		return this.heap[this.getLeftChildIndex(index)];
	}
	rightChild(index) {
		return this.heap[this.getRightChildIndex(index)];
	}
	parent(index) {
		return this.heap[this.getParentIndex(index)];
	}

	// Functions to create Min Heap
	isEmpty() {
		return this.heap.length === 0;
	}

	swap(indexOne, indexTwo) {
		const temp = this.heap[indexOne];
		this.heap[indexOne] = this.heap[indexTwo];
		this.heap[indexTwo] = temp;
	}

	peek() {
		if (this.heap.length === 0) {
			return null;
		}
		return this.heap[0];
	}
	
	// Removing an element will remove the
	// top element with highest priority then
	// heapifyDown will be called
	remove() {
		if (this.heap.length === 0) {
			return null;
		}
		const item = this.heap[0];
		this.heap[0] = this.heap[this.heap.length - 1];
		this.heap.pop();
		this.heapifyDown();
		return item;
	}

	add(item) {
		this.heap.push(item);
		this.heapifyUp();
	}

	heapifyUp() {
		let index = this.heap.length - 1;
		while (this.hasParent(index) && this.parent(index) > this.heap[index]) {
			this.swap(this.getParentIndex(index), index);
			index = this.getParentIndex(index);
		}
	}

	heapifyDown() {
		let index = 0;
		while (this.hasLeftChild(index)) {
			let smallerChildIndex = this.getLeftChildIndex(index);
			if (this.hasRightChild(index) && this.rightChild(index) < this.leftChild(index)) {
				smallerChildIndex = this.getRightChildIndex(index);
			}
			if (this.heap[index] < this.heap[smallerChildIndex]) {
				break;
			} else {
				this.swap(index, smallerChildIndex);
			}
			index = smallerChildIndex;
		}
	}
	
	printHeap() {
		var heap =` ${this.heap[0]} `
		for(var i = 1; i<this.heap.length;i++) {
			heap += ` ${this.heap[i]} `;
		}
		console.log(heap);
	}
}

export class MaxHeap {
	constructor() {
		this.arr = [];
	}

	// helper methods
	parentIndex(x) {
		return Math.floor((x-1)/2);
	}

	leftIndex(x) {
		return 2*x + 1;
	}

	rightIndex(x) {
		return 2*x + 2;
	}

	hasParent(x) {
		return this.parentIndex() >= 0;
	}

	hasLeft(x) {
		return this.leftIndex(x) < this.arr.length;
	}

	hasRight(x) {
		return this.rightIndex(x) < this.arr.length;
	}

	hasChild(x) {
		return this.hasLeft(x) || this.hasRight(x);
	}

	isEmpty() {
		return this.arr.length === 0;
	}

	parentValue(x) {
		return this.arr[this.parentIndex(x)];
	}

	leftValue(x) {
		return this.arr[this.leftIndex(x)];
	}

	rightValue(x) {
		return this.arr[this.rightIndex(x)];
	}

	getValue(x) {
		return this.arr[x];
	}

	swap(x, y) {
		const temp = this.arr[x];
		this.arr[x] = this.arr[y];
		this.arr[y] = temp;
	}

	// Heap methods
	// top method
	peek() {
		return this.arr[0] || null;
	}

	// insert method
	add(value) {
		this.arr.push(value);
		this.heapifyUp();
	}

	// pop method
	remove() {
		if(this.isEmpty()) {
			return null;
		}

		const item = this.arr[0];

		this.arr[0] = this.arr[this.arr.length-1];
		this.arr.pop();

		this.heapifyDown();

		return item;
	}


	heapifyUp() {
		let i = this.arr.length-1;
		let parentIdx = this.parentIndex(i);

		while(parentIdx >= 0 && this.getValue(i) > this.getValue(parentIdx)) {
			// console.log('arr --', this.arr);
			this.swap(i, parentIdx);
			i = parentIdx;
			parentIdx = this.parentIndex(i);
		}

		// console.log('done')
		
	}

	heapifyDown() {
		let i = 0;
		
		while(this.hasLeft(i)) {
			// console.log('arr --', this.arr);
			let greaterIdx = this.leftIndex(i);

			if(this.hasRight(i) && this.leftValue(i) < this.rightValue(i)) {
				greaterIdx = this.rightIndex(i);
			}

			if(this.getValue(i) >= this.getValue(greaterIdx)) {
				break;
			}

			this.swap(i, greaterIdx);
			// console.log('swap --', this.arr);

			i = greaterIdx;
		}
	}

	printHeap() {
		console.log(this.arr.join(', '));
	}


} 

/**
					100
			40 		   50
		10  30   15  40

					40
			30 		   40
		10  15     
 */
function main(){
  // Creating the Heap
  var heap = new MaxHeap();

  // Adding The Elements
  heap.add(10);
  heap.add(15);
  heap.add(30);
  heap.add(40);
  heap.add(50);
  heap.add(100);
  heap.add(40);

  // Printing the Heap
  heap.printHeap();

  // Peeking And Removing Top Element
  while(!heap.isEmpty()) {
		console.log(heap.remove());
	}
};

main();





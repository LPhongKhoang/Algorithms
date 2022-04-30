class Stack {
	length = 0;
	arr = []; // RAM: | 5 | 6| 8 |  | | | |

	push(x) {
		this.arr.push(x);
		length += 1;
	}

	pop() {
		if(this.length === 0) return null;

		this.arr[length-1];
		length -= 1;
	}

	peek() {
		
	}
}
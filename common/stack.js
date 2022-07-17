class Stack {
	length = 0;
	arr = []; // RAM: | 5 | 6| 8 |  | | | |

	push(x) {
		this.arr.push(x);
		this.length += 1;
	}

	pop() {
		if(this.length === 0) return null;

		const lastEle = this.arr[this.length-1];
		this.length -= 1;
		return lastEle;
	}

	peek() {
		return this.arr[this.length-1];
	}
}

function main(){
	const s = new Stack();

	s.push(1);
	s.push(10);
	s.push(14);

	console.log(s.peek());
	console.log(s.pop());
	console.log(s.peek());
}

main();
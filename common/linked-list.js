class Node {
	value; // number, object
	other;

	next; // next Node

	constructor(value) {
		this.value = value;
		this.other = 'abc xyz';
	}

	print() {
		console.log(`Node (${this.value}, ${this.other})`);
	}
}
// -> Node1 -> Node2 (_)
class LinkedList {
	tail = null; // last Node
	header = null; // first Node

	insert(node) {
		if(this.header === null) {
			this.header = node;
			this.tail = node;
		}else {
			this.tail.next = node;
			this.tail = node;
		}
	}

	getNode(x) {
		let currNode = this.header;

		while(!!currNode) {
			if(currNode.value === x) {
				return currNode;
			}else {
				currNode = currNode.next; // di den node tiep theo
			}
		}

		return null;
	}

	print() {
		let currNode = this.header;

		while(!!currNode) {
			console.log('node: ', currNode.value, '->')
			currNode = currNode.next; // di den node tiep theo
		}
	}
}

// 
// [header] -> bread -> Eggs -> Bacon -> Fruit
// |10||||||linked list|||||4||||||5|||
function main() {
	const linkList = new LinkedList();

	linkList.insert(new Node(4));
	linkList.insert(new Node(5));
	linkList.insert(new Node(6));
	linkList.insert(new Node(10));
	linkList.insert(new Node(15));
	linkList.insert(new Node(12));

	linkList.print();

	const exampleNode = linkList.getNode(10);
	exampleNode.print();

	// const checkNode = linkList.getNode(10);
	// if(checkNode) {
	// 	checkNode.print();
	// }else {
	// 	console.log('Not found');
	// }

}

// main();
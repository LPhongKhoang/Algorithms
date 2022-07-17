function bst(arr, left, right, x) {
	if(left > right) return -1;

	const mid = Math.floor((left+right)/2);

	if(arr[mid] === x) {
		return mid;
	}else if(arr[mid] > x) {
		return bst(arr, left, mid-1, x);
	}else {
		return bst(arr, mid+1, right, x);
	}
}

function main() {
	const arr = [1, 3, 5, 7, 9, 12, 15, 20, 25, 26, 28, 30];
	const x = 7;
	const left = 0, right = arr.length-1;
	const index = bst(arr, left, right, x);

	console.log(`Result index: ${index}`);
}

main();

/**
 * arr has n elements
 * S1: n elements
 * S2: n/2^1 elements
 * S3: n/2^2
 * S4: n/2^3
 * ... 
 * S(x+1): n/(2^x)
 * 2^x >= n
 * x >= log2(n)
 * 
 * O(logn) 
 */




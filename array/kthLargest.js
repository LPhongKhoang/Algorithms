// C1: remove maximum number in Array --> O(kn)
	// C2: Sorted array --> O(nlogn)
	// C2: remove maximum number in builded HEAP (priority queue) --> O(n + klogn)
	// C3: use quick select --> O(n)
	// C4: use BST --> O(nlogk)
	// C5: use minHeap --> O(nlogk)
	// C6: use maxHeap --> O(nlogk)
	// C7: use quick sor

function kthLargest(arr, k) {
	// Use quick select
	let res = -1;
	quickSelect(arr, 0, arr.length - 1, k);
}

function quickSelect(arr, left, right, k) {
	if (left > right) return -1;

	const pivot = arr[right];
	let i = left;
	let j = right - 1;

	while (i <= j) {
		if (arr[i] < pivot) {
			i++;
		} else if (arr[j] >= pivot) {
			j--;
		} else {
			swap(arr, i, j);
			i++;
			j--;
		}
	}

	swap(arr, i, right);

	if (i === k - 1) {
		return arr[i];
	} else if (i < k - 1) {
		return quickSelect(arr, i + 1, right, k);
	} else {
		return quickSelect(arr, left, i - 1, k);
	}

}

function swap(arr, i, j) {
	const temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}

function main() {
	const arr = [8, 3, 9, 6, 7, 5, 10, 2, 4, 1, 9];
	const k = 5;
	console.log(kthLargest(arr, k)); // output should be: 7 (duplicate is also check)
}
main();
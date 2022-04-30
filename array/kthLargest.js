// C1: remove maximum number in Array --> O(kn)
// C2: Sorted array --> O(nlogn)
// C2: remove maximum number in builded HEAP (priority queue) --> O(n + klogn)

function kthLargest(arr, k) {

}

function main() {
	const arr = [8, 3, 9, 6, 7, 5, 10, 2, 4, 1, 9];
	const k = 5;
	console.log(kthLargest(arr, k)); // output should be: 7 (duplicate is also check)
}
main();
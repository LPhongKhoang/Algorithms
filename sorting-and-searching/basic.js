function selectionSort(arr) {
	let min;
	for (let i = 0; i < arr.length; i++) {
		// Assume a minimum value        
		min = i;
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] < arr[min]) {
				min = j;
			}
		}

		// Swap if new minimun value found
		if (min !== i) {
			// destructuring assignment.
			[arr[i], arr[min]] = [arr[min], arr[i]];
		}
	}
	return arr;
}

function bubbleSort(arr) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length - i - 1; j++) {
			if (arr[j + 1] < arr[j]) {
				// ES6 way of swapping array elements
				[arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
			}
		}
	}
	return arr;
}

// Slightly optimised solution for a nearly sorted array, by reducing the number of passes needed
function bubbleSort2(arr) {
	let noSwaps;
	for (let i = arr.length; i > 0; i--) {
		noSwaps = true;
		for (let j = 0; j < i - 1; j++) {
			if (arr[j + 1] < arr[j]) {
				// Swap
				[arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
				// Make 'noSwaps' false
				noSwaps = false;
			}
		}
		console.log(arr);
		// End the iterations if there were no swaps made in one full pass
		if (noSwaps) {
			console.log('no Swaps');
			break;
		}
	}
	return arr;
}

function insertionSort(arr) {
	for (let i = 1; i < arr.length; i++) {

		// Start comparing current element with every element before it
		for (let j = i - 1; j >= 0; j--) {

			// Swap elements as required
			if (arr[j + 1] < arr[j]) {
				[arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
			}else {
				break;
			}
		}
	}
	return arr;
}


// Function merge 2 sorted arrays
function merge2SortedArr(arr1, arr2) {
	const arr = [];
	let i = 0,
		j = 0;

	while (i < arr1.length && j < arr2.length) {
		if (arr1[i] < arr2[j]) {
			arr.push(arr1[i]);
			i++;
		} else {
			arr.push(arr2[j]);
			j++;
		}
	}

	while (i < arr1.length) {
		arr.push(arr1[i]);
		i++;
	}

	while (j < arr2.length) {
		arr.push(arr2[j]);
		j++;
	}

	return arr;
}



(function main() {
	// const arr = [3, 4, 1, 2, 3, 8, 7, 9, 6, 7];
	// selectionSort(arr);
	// bubbleSort(arr);
	// bubbleSort2(arr);
	// insertionSort(arr);
	// console.log(arr);





})();

function product(a, b) {
	return a*b; // O(1)
}
function func(arr, x) {
	let flag = false;

	// O(n)
	for(let i = 0; i < arr.length; i++) {
		if(arr[i] === x) {
			flag = true;
		}
	}
	return flag;
}

// 1M --> 30000
// [1, 3, 4, 5, 9, 10, 11, 12, 30000, 40000] // sorted
// 1, 3, 4, 5, 9, 10
// 11, 12, 30000, 40000
// 11, 12
// 30000, 40000
// 30000
// 40000

// 2 ^ x = 1000000

// x = 20  // 30000 is existed or not
// x = 1M

// [1, 2, 3]
// empty, [1], [2], [3], [1, 2], [2, 3], [1, 3], [1, 2, 3]
// 2^n so tap con cua tap hop co n phan tu

// [1, 6, 9, 10, 20, 15, 70, ..., 30000]
// n: 1M --> 1M --> 
// O(log n)


// tim ra vi tri cua phan tu 20
// so 30 co trong mang nay hay ko?


// n --> n time -> O(n): linear
// n --> 2n + 100 time --> O(2n) -> O(n)
// n --> O(n^2)
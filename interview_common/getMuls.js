// O(n  )
function getMuls(arr) {
	const res = [];
	let i, prod = 1, flag = false;
	for(i = 0; i< arr.length; i++) {
		if(arr[i] === 0) {
			flag = true;
			break;
		} else {
			prod *= arr[i];
		}
	}

	if(flag) {
		// Calculate prod with remain element
		for(let x = i+1; x < arr.length; x++) {
			prod *= arr[x];
		}

		// Build returned array
		for(let x = 0; x < i; x++) {
			res.push(0);
		}
		res.push(prod);
		for(let x = i+1; x < arr.length; x++) {
			res.push(0);
		}
	} else {
		for(let x= 0; x < arr.length; x++) {
			res.push(prod/arr[x]);
		}
	}
	

	return res;
}

function main() {
	const arr = [1, 2, 3, 4, 6];
	const res = getMuls(arr);
	console.log(res);
}

main();
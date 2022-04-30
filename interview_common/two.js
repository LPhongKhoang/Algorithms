function binaryHelper(arr, x) {
	let left = 0, right = arr.length -1, mid = -1;
	while(left <= right) {
			mid = Math.floor((left + right)/2);
			if(arr[mid] === x) {
					return mid;
			}else if(arr[mid] < x) {
					left = mid + 1;
			}else {
					right = mid-1;
			}
	}
	return arr[left] && arr[left] >= x ? left : -1;
}

function counts(teamA, teamB) {
	// Write your code here
	const sortedB = [...teamB].sort((a, b) => a-b);
	
	// build map
	const map = new Map();
	for(let i = 0; i < teamA.length; i++) {
			const idxOfRightAboveScore = binaryHelper(sortedB, teamA[i]);
			if(idxOfRightAboveScore === -1) continue;
			
			if(!map.has(sortedB[idxOfRightAboveScore])) {
					map.set(sortedB[idxOfRightAboveScore], 1);
			} else {
					map.set(sortedB[idxOfRightAboveScore], map.get(sortedB[idxOfRightAboveScore]) + 1);
			}
	}
	
	// build map 2-nd time
	for(let i = 0; i < sortedB.length; i++) {
		map.set(sortedB[i], (map.get(sortedB[i-1]) || 0) + (map.get(sortedB[i]) || 0));
	}
	
	// res
	const res = [];
	for(let i = 0; i < teamB.length; i++) {
			res.push(map.get(teamB[i]));
	}
	return res;
}

function main() {
	const teamA = [1, 4, 2, 4, 5, 6];
	const teamB = [5, 3, 4, 10];
	console.log(counts(teamA, teamB));

}
main();
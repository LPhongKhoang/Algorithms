'use strict';

/*
 * Complete the 'maxIndex' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER steps
 *  2. INTEGER badIndex
 */

function maxIndex(steps, badIndex) {
    // Write your code here
		const totalSum = steps*(steps+1)/2;
		let currSum = 0; // currSum is value of i
		let j = 1;
		for(let x = 0; x < steps; x++) {
			currSum += j;
			if(currSum === badIndex) {
				return totalSum - 1;
			}
			j++;
		}

		return totalSum;



}
function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    // const steps = parseInt(readLine().trim(), 10);

    // const badIndex = parseInt(readLine().trim(), 10);

    const result = maxIndex(4, 6);

		console.log('result', result);
    // ws.write(result + '\n');

    // ws.end();
}

main();
/**
 * i j nextI
 * --------
 * 0 1 
 * 1 2
 * 3 3 6
 * 6 4
 * 
 * 
 * 0 1 remain
 * 0 2
 * 2 3
 * 5 4
 * 
 * 
 * 
 * 
 * Sum = 1 + 2 + 3 + ... + n = n*(n+1)/2
 */
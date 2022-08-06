/** From: https://algodaily.com/challenges/is-a-subsequence */

var assert = require('assert');

/**
 *  @param {string} sub
 *  @param {string} str
 *  @return {boolean}
 */
function isASubsequence(sub, str) {
	// fill this in
	let counter = 0;
	let idx = 0;
	for (let i = 0; i < sub.length; i++) {
		while (idx < str.length && sub[i] !== str[idx]) {
			idx++;
		}

		// Check if found character in str same with sub[i]
		if (idx < str.length) {
			counter++;
			idx++;
		}
	}
	return counter === sub.length;
}

function main() {
	if (true || process.argv[2] === '--mode' && (process.argv[3] === 'debug' || process.argv[3] === 'd') ) {
		try {
			assert.deepEqual(isASubsequence('vaau', 'eviazfuli'), false);
	
			console.log(
				'PASSED: ' + "isASubsequence('vaau', 'eviazfuli') should return false"
			);
		} catch (err) {
			console.log(err);
		}

		try {
			assert.deepEqual(isASubsequence('vaau', 'eviazafuli'), true);
	
			console.log(
				'PASSED: ' + "isASubsequence('vaau', 'eviazafuli') should return true"
			);
		} catch (err) {
			console.log(err);
		}
	} else {

		try {
			assert.deepEqual(isASubsequence('c', 'co'), true);
	
			console.log('PASSED: ' + "isASubsequence('c','co') should return true");
		} catch (err) {
			console.log(err);
		}
	
		try {
			assert.deepEqual(isASubsequence('liblu', 'egi'), false);
	
			console.log('PASSED: ' + "isASubsequence('liblu','egi') should return false");
		} catch (err) {
			console.log(err);
		}
	
		try {
			assert.deepEqual(isASubsequence('ej', 'sej'), true);
	
			console.log('PASSED: ' + "isASubsequence('ej','sej') should return true");
		} catch (err) {
			console.log(err);
		}
	
		try {
			assert.deepEqual(isASubsequence('zumkidin', 'hu'), false);
	
			console.log(
				'PASSED: ' + "isASubsequence('zumkidin','hu') should return false"
			);
		} catch (err) {
			console.log(err);
		}
	
		try {
			assert.deepEqual(isASubsequence('eviazauli', 'de'), false);
	
			console.log(
				'PASSED: ' + "isASubsequence('eviazauli','de') should return false"
			);
		} catch (err) {
			console.log(err);
		}
	
		try {
			assert.deepEqual(isASubsequence('eviazauli', 'vau'), true);
	
			console.log(
				'PASSED: ' + "isASubsequence('eviazauli','vau') should return true"
			);
		} catch (err) {
			console.log(err);
		}
	}

}

main();

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'getMaxUnits' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. LONG_INTEGER_ARRAY boxes
 *  2. LONG_INTEGER_ARRAY unitsPerBox
 *  3. LONG_INTEGER truckSize
 */

function getMaxUnits(boxes, unitsPerBox, truckSize) {
    // Write your code here
    const arr = [];
    for(let i = 0; i < boxes.length; i++) {
        arr.push({
            value: unitsPerBox[i],
            quantity: boxes[i]
        });
    }
    
    // sort arr
    arr.sort((item1, item2) => item2.value - item1.value);
    console.log(arr);
    // pick box
    let res = 0, remainSize = truckSize;
    for(let i = 0; i < arr.length; i++) {
        if(remainSize > 0) {
            const takenBox = Math.min(remainSize, arr[i].quantity);
            res += takenBox * arr[i].value;
            remainSize -= takenBox;
        }else {
            break;
        }
    }
    return res;

}

function main() {
    console.log(getMaxUnits([2, 1, 3], [2, 3, 1], 3));
}
main();
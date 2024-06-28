/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
  let i = 0;
  
  while(i < nums.length) {
      const curr = nums[i];
      if(curr > 0 && curr <= nums.length && nums[curr - 1] !== curr) {
          // swap
          const temp = nums[curr - 1];
          nums[curr - 1] = curr;
          nums[i] = temp;
      }else {
          i += 1;
      }
  }
  
  for(let i = 0; i < nums.length; i++) {
      if(nums[i] !== i + 1) return i + 1;
  }
  
  return nums.length + 1;
};

var firstMissingPositive2 = function(nums) {
  // nums.push(0)
  // const n = nums.length
  // nums[nums[i]%n]+=n is brilliant. It stores information about nums[i] and still keep the information of nums[nums[i]]
}

function main() {
  console.log(firstMissingPositive([3,4,-1,1])); // output should be: 2
  console.log(firstMissingPositive2([1, 2, 0])); // output should be: 3
}

main();
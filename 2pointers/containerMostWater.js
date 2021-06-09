/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  const n = height.length;
  let res = 0;
  
  let i = 0, j = n-1;
  
  while(i < j) {
      const area = Math.min(height[i], height[j]) * (j-i);
      if(res < area) res = area;
      
      if(height[i] < height[j]) {
          i+=1;
      }else {
          j-=1;
      }
  }
  
  return res;
};

(function main() {
  console.log(maxArea([1,3,2,5,25,24,5]))
})();
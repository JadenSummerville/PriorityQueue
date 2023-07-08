import { parallelMax } from "../Tools/ParallelMax";
  
let pPromise = async function (data, lo, hi, CUTOFF){
  if(lo + 1 == hi){
    return data[lo];
  }
  var mid = lo + Math.floor((hi - lo)/2);
  var maxLeft = pPromise(data, lo, mid, CUTOFF);
  var maxRight = pPromise(data, mid, hi, CUTOFF);
  if(maxLeft > maxRight){
      return maxLeft;
  }
  return maxRight;
};


var arr: number[] = [];
var size: number = 10;
for(var i = 0; i != size; i++){
    arr.push(i);
} 
console.log("a");
var goal: {value: number; place: number} | null = null;
var promise: Promise<{value: number; place: number} | null> = parallelMax(arr, 0, size);
const a = async () => {
    goal = await promise;
    return goal;
};
console.log(a());
console.log(goal);
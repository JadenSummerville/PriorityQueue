import { findMax } from "./findMax";
import { isInteger } from "./isInteger";

let pPromise = async (data, lo, hi, CUTOFF): Promise<{value, place} | null> => {
	//alert(hi + " " + lo);
	if(CUTOFF >= hi-lo){
      return findMax(data, lo, hi);
  }
  //
  var mid = lo + Math.floor((hi - lo)/2);
  //alert("as "+ pPromise(array, lo, mid, CUTOFF).then());
  var maxLeft = await pPromise(data, lo, mid, CUTOFF);
  //alert("test");
  var maxRight = await pPromise(data, mid, hi, CUTOFF);
  //alert(maxLeft);
  if(maxLeft == null){
    return maxRight;
  }
  if(maxRight == null){
    return maxLeft;
  }
  if(maxLeft.value > maxRight.value){
      return maxLeft;
  }
  return maxRight;
};
export async function parallelMax(array: number[], min: number, max: number): Promise<{value, place} | null>{
    if(max <= min){
        throw new Error(`Max must be greater than min, but max is ${max} and min
         is ${min} .`);
    }
    if(!isInteger(max) || !isInteger(min)){
        throw new Error("Max and min must be integers.");
    }
    return await pPromise(array, min, max, 1);
}
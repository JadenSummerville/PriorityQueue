import { isInteger } from "./isInteger";

export function findMax(data: number[], lo: number, hi: number): {value: number, place: number} | null{
    if(!isInteger(lo) || !isInteger(hi)){
        throw new Error("hi and lo must be integers.");
    }if(lo < 0 || hi < 0 || lo >= data.length || hi > data.length){
        throw new Error("hi or lo are not in range.");
    }
    
    if(lo >= hi){
      return null;
    }
    var max: number = data[lo];
    var maxPlace: number = lo;
    for(var i = lo + 1; i != hi && i != data.length; i++){
          if(data[i] > max){
            max = data[i];
            maxPlace = i;
          }
        }
    return {value: max, place: maxPlace};
}
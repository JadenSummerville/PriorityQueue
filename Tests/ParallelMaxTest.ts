import { parallelMax } from "../Tools/ParallelMax";

var a: number[] = [];
var size: number = 10;
for(var i = 0; i != size; i++){
    a.push(i);
}
console.log("a");
console.log(parallelMax(a, 0, size));
console.log("b");
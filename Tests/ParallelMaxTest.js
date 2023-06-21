"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParallelMax_1 = require("../Tools/ParallelMax");
var a = [];
var size = 10;
for (var i = 0; i != size; i++) {
    a.push(i);
}
console.log("a");
console.log((0, ParallelMax_1.parallelMax)(a, 0, size).value);
console.log("b");

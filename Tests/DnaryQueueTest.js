"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DnaryQueue_1 = require("../DataStructures/DnaryQueue");
var test = new DnaryQueue_1.DnaryQueue(2);
test.push(1, 1);
test.push(3, 3);
test.push(2, 2);
test.push(3, 3);
test.push(4, 4);
test.push(3, 3);
test.push(5, 5);
for(var i = 0; i != 10_000_000; i++){
    test.push(i, i);
    if(i === 9_000_000){
        console.log("Test");
    }
}
console.log("a");
test.push(2, 2);
test.push(3, 3);
//test.display(false);
test.pop();
//test.display(true);
test.pop();
test.pop();
test.pop();
test.pop();
//test.display(true);
console.log("b");
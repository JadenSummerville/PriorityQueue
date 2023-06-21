"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = void 0;
var CrownList_1 = require("./DataStructures/CrownList");
var DnaryQueue_1 = require("./DataStructures/DnaryQueue");
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue(valueFunction, dataStructure) {
        this.valueFunction = valueFunction;
        if (dataStructure) {
            this.dataStructure = dataStructure;
            return;
        }
        this.dataStructure = new CrownList_1.CrownList();
    }
    PriorityQueue.prototype.push = function (value) {
        var priority = this.valueFunction(value);
        this.dataStructure.push(value, priority);
    };
    PriorityQueue.prototype.pop = function () {
        return this.dataStructure.pop().item;
    };
    PriorityQueue.prototype.peak = function () {
        return this.dataStructure.peak().item;
    };
    PriorityQueue.prototype.size = function () {
        return this.dataStructure.length;
    };
    PriorityQueue.prototype.display = function () {
        this.dataStructure.display();
    };
    PriorityQueue.prototype.isEmpty = function () {
        return this.dataStructure.isEmpty();
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;
var valueFunction = function (word) {
    var value;
    switch (word) {
        // Top priority
        case "Scott":
            value = 100;
            break;
        // Me
        case "Jaden":
            value = 50;
            break;
        // Friends and family
        case "John":
        case "Jen":
        case "Darnel":
            value = 10;
            break;
        // Dogs
        case "Rocko":
        case "Percy":
            value = 5;
            break;
        // Not on list
        default:
            value = 0;
    }
    return value;
};
var priorityQueue = new PriorityQueue(valueFunction, new DnaryQueue_1.DnaryQueue(2));
for(var i = 0; i != 2_000_000; i++){
priorityQueue.push("Percy");
priorityQueue.push("Jaden");
priorityQueue.push("Scott");
priorityQueue.push("Rocko");
}
console.log("a");
while (!priorityQueue.isEmpty()) {
    priorityQueue.pop();
}
console.log("b");

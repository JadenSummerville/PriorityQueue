"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = void 0;
var DnaryQueue_1 = require("./DataStructures/DnaryQueue");
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue(valueFunction, dataStructure) {
        this.valueFunction = valueFunction;
        if (dataStructure) {
            this.dataStructure = dataStructure;
            return;
        }
        this.dataStructure = new DnaryQueue_1.DnaryQueue(2);
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
    /**
     * @requires array is not edited. Can be read.
    */
    PriorityQueue.prototype.getElements = function () {
        return this.dataStructure.getElements();
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;

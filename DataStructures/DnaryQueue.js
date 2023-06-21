"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DnaryQueue = void 0;
//https://stackoverflow.com/questions/38296667/getting-unexpected-token-export
//import { findMax } from "../Tools/ParallelMax";
var findMax_1 = require("../Tools/findMax");
var assert_1 = require("../Tools/assert");
var isInteger_1 = require("../Tools/isInteger");
var swap_1 = require("../Tools/swap");
var DnaryQueue = /** @class */ (function () {
    function DnaryQueue(d, USEPROCESSORS) {
        this.DEBUG = false;
        this.USEPROCESSORS = true;
        if (USEPROCESSORS != undefined) {
            this.USEPROCESSORS = USEPROCESSORS;
        }
        if (!d) {
            d = 2;
        }
        if (!(0, isInteger_1.isInteger)(d)) {
            throw new Error("d must be an integer.");
        }
        if (d <= 1) {
            throw new Error("d must be greater than 1.");
        }
        this.items = [];
        this.priority = [];
        this.d = d;
        this.checkRep();
    }
    DnaryQueue.prototype.checkRep = function () {
        if (this.DEBUG) {
            (0, assert_1.assert)(!!this.items);
            (0, assert_1.assert)(!!this.priority);
            (0, assert_1.assert)((0, isInteger_1.isInteger)(this.d));
            (0, assert_1.assert)(this.d > 1);
            (0, assert_1.assert)(this.items.length == this.priority.length);
            this.isLessThan(0);
        }
    };
    DnaryQueue.prototype.isLessThan = function (parent) {
        if (parent >= this.items.length) {
            return;
        }
        var children = this.identifyChildrenPrivate(parent);
        if (children == null) {
            return;
        }
        var max = this.findMax(children[0], children[1] + 1);
        if (max == null) {
            return;
        }
        (0, assert_1.assert)(this.priority[max] <= this.priority[parent]);
        for (var i = children[0]; i != children[1] + 1 && i != this.priority.length; i++) {
            this.isLessThan(i);
        }
    };
    DnaryQueue.prototype.pop = function () {
        this.checkRep();
        if (this.isEmpty()) {
            throw new Error("Cannot pop from DnaryQueue while DnaryQueue is empty.");
        }
        var goal = this.peak();
        (0, swap_1.swap)(this.items, 0, this.items.length - 1);
        (0, swap_1.swap)(this.priority, 0, this.items.length - 1);
        this.items.pop();
        this.priority.pop();
        if (!this.isEmpty()) {
            this.percolateDown(0);
        }
        this.checkRep();
        return goal;
    };
    DnaryQueue.prototype.peak = function () {
        this.checkRep();
        if (this.isEmpty()) {
            throw new Error("Cannot peak into DnaryQueue while DnaryQueue is empty.");
        }
        var goal = {
            item: this.items[0],
            priority: this.priority[0]
        };
        this.checkRep;
        return goal;
    };
    DnaryQueue.prototype.push = function (item, priority) {
        this.checkRep();
        this.items.push(item);
        this.priority.push(priority);
        this.percolateUp(this.priority.length - 1);
        this.checkRep();
    };
    DnaryQueue.prototype.identifyChildren = function (child) {
        this.checkRep();
        var arr = this.identifyChildrenPrivate(child);
        this.checkRep();
        return arr;
    };
    // Identify children in order of shortest and then greatest place in array.
    DnaryQueue.prototype.identifyChildrenPrivate = function (child) {
        if (!this.validPlace(child)) {
            throw new Error("Out of bounds exception.");
        }
        var maxChild = (child + 1) * this.d;
        if (maxChild >= this.priority.length) {
            maxChild = this.priority.length - 1;
        }
        var lo = child * this.d + 1;
        if (maxChild < lo) {
            return null;
        }
        return [lo, maxChild];
    };
    DnaryQueue.prototype.percolateDown = function (item) {
        if (!this.validPlace(item)) {
            throw new Error("item is not valid.");
        }
        var children = this.identifyChildrenPrivate(item);
        if (children === null) {
            return;
        }
        var max = this.findMax(children[0], children[1] + 1);
        if (max == null || this.priority[item] >= this.priority[max]) {
            return;
        }
        (0, swap_1.swap)(this.items, max, item);
        (0, swap_1.swap)(this.priority, max, item);
        this.percolateDown(max);
    };
    DnaryQueue.prototype.percolateUp = function (item) {
        if (!this.validPlace(item)) {
            throw new Error("item is not valid.");
        }
        var parent = Math.floor((item - 1) / this.d);
        if (!this.validPlace(parent)) {
            return;
        }
        if (this.priority[item] < this.priority[parent]) {
            return;
        }
        (0, swap_1.swap)(this.priority, item, parent);
        (0, swap_1.swap)(this.items, item, parent);
        this.percolateUp(parent);
    };
    DnaryQueue.prototype.validPlace = function (place) {
        return (0, isInteger_1.isInteger)(place) && place >= 0 && place < this.priority.length;
    };
    DnaryQueue.prototype.findMax = function (lo, hi) {
        if (this.USEPROCESSORS) {
            //
        }
        var goal = (0, findMax_1.findMax)(this.priority, lo, hi);
        if (goal == null) {
            return null;
        }
        return goal.place;
        /*
        var max: number = this.priority[lo];
        if(lo >= hi){
          return null;
        }
        var maxPlace: number = lo;
        for(var i = lo + 1; i != hi && i != this.priority.length; i++){
          if(this.priority[i] > max){
            max = this.priority[i];
            maxPlace = i;
          }
        }
        return maxPlace;
      */
    };
    DnaryQueue.prototype.display = function (items) {
        this.checkRep();
        var str = "";
        var current = 0;
        var next = 1;
        for (var i = 0; i != this.items.length; i++) {
            if (items) {
                str = str + " " + this.items[i];
            }
            else {
                str = str + " " + this.priority[i];
            }
            current++;
            if (current == next) {
                console.log(str);
                str = "";
                current = 0;
                next *= this.d;
            }
        }
        if (str != "") {
            console.log(str);
        }
        console.log("");
        this.checkRep();
    };
    DnaryQueue.prototype.size = function () {
        this.checkRep;
        return this.items.length;
    };
    DnaryQueue.prototype.isEmpty = function () {
        this.checkRep;
        return this.size() == 0;
    };
    return DnaryQueue;
}());
exports.DnaryQueue = DnaryQueue;

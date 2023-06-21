"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrownList = void 0;
var assert_1 = require("../Tools/assert");
var isInteger_1 = require("../Tools/isInteger");
var swap_1 = require("../Tools/swap");
var CrownList = /** @class */ (function () {
    function CrownList() {
        this.DEBUG = true;
        this.body = [];
        this.bodyPriority = [];
        this.sizeOfList = 0;
        this.chechRep();
    }
    CrownList.prototype.chechRep = function () {
        if (this.DEBUG) {
            (0, assert_1.assert)(this.sizeOfList >= 0);
            (0, assert_1.assert)((0, isInteger_1.isInteger)(this.sizeOfList));
            (0, assert_1.assert)(this.body.length == this.bodyPriority.length);
            var max = this.findMax(1, this.sizeOfList);
            if (max !== null) {
                (0, assert_1.assert)(this.bodyPriority[max] <= this.bodyPriority[0]);
            }
        }
    };
    CrownList.prototype.push = function (item, priority) {
        this.chechRep();
        if (this.isEmpty()) {
            this.body[0] = item;
            this.bodyPriority[0] = priority;
            this.sizeOfList = 1;
            this.chechRep();
            return;
        }
        this.body.push(item);
        this.bodyPriority.push(priority);
        if (priority > this.bodyPriority[0]) {
            (0, swap_1.swap)(this.body, 0, this.sizeOfList);
            (0, swap_1.swap)(this.bodyPriority, 0, this.sizeOfList);
        }
        this.sizeOfList++;
        this.chechRep();
    };
    CrownList.prototype.pop = function () {
        this.chechRep();
        if (this.isEmpty()) {
            throw new Error("Cannot pop from CrownList while CrownList is empty.");
        }
        var goal = this.peak();
        if (this.sizeOfList == 1) {
            this.sizeOfList = 0;
            this.chechRep();
            return goal;
        }
        (0, swap_1.swap)(this.body, 0, this.sizeOfList - 1);
        (0, swap_1.swap)(this.bodyPriority, 0, this.sizeOfList - 1);
        this.body.pop();
        this.bodyPriority.pop();
        var max = this.findMax(1, this.sizeOfList - 2);
        if (this.bodyPriority[max] > this.bodyPriority[0]) {
            (0, swap_1.swap)(this.body, 0, max);
            (0, swap_1.swap)(this.bodyPriority, 0, max);
        }
        this.sizeOfList--;
        this.chechRep();
        return goal;
    };
    CrownList.prototype.size = function () {
        this.chechRep();
        return this.sizeOfList;
    };
    CrownList.prototype.isEmpty = function () {
        this.chechRep();
        return this.sizeOfList == 0;
    };
    CrownList.prototype.validPlace = function (place) {
        return (0, isInteger_1.isInteger)(place) && place >= 0 && place < this.bodyPriority.length;
    };
    CrownList.prototype.findMax = function (lo, hi) {
        if (lo >= hi) {
            return null;
        }
        var max = this.bodyPriority[lo];
        var maxPlace = lo;
        for (var i = lo + 1; i != hi + 1 && i != this.bodyPriority.length; i++) {
            if (this.bodyPriority[i] > max) {
                max = this.bodyPriority[i];
                maxPlace = i;
            }
        }
        return maxPlace;
    };
    CrownList.prototype.peak = function () {
        this.chechRep();
        var goal = { item: this.body[0],
            priority: this.bodyPriority[0] };
        this.chechRep();
        return goal;
    };
    CrownList.prototype.display = function (items) {
        var array = this.bodyPriority;
        if (items) {
            //array = this.body;
        }
        array.forEach(function (item, i) {
            console.log(item);
            if (i == 0) {
                console.log("");
            }
        });
        console.log("");
    };
    return CrownList;
}());
exports.CrownList = CrownList;
var a = new CrownList();
a.push(1, 1);
a.display(true);
a.push(0, 0);
a.push(5, 5);
a.push(2, 2);
a.display(true);

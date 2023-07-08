"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrownList = void 0;
var ParallelMax_1 = require("../Tools/ParallelMax");
var assert_1 = require("../Tools/assert");
var isInteger_1 = require("../Tools/isInteger");
var swap_1 = require("../Tools/swap");
var findMax_1 = require("../Tools/findMax");
var CrownList = /** @class */ (function () {
    function CrownList(USEPROCESSORS) {
        this.DEBUG = false;
        this.USEPROCESSORS = false;
        this.body = [];
        this.bodyPriority = [];
        this.sizeOfList = 0;
        if (USEPROCESSORS != undefined) {
            this.USEPROCESSORS = USEPROCESSORS;
        }
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
        var max = this.findMax(1, this.sizeOfList - 1);
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
        var _this = this;
        /*
        if(lo >= hi){
            return null;
        }
        var max: number = this.bodyPriority[lo];
        var maxPlace: number = lo;
        for(var i = lo + 1; i != hi + 1 && i != this.bodyPriority.length; i++){
          if(this.bodyPriority[i] > max){
            max = this.bodyPriority[i];
            maxPlace = i;
          }
        }
        return maxPlace;
        */
        var goal = null;
        if (this.USEPROCESSORS) {
            var promise = (0, ParallelMax_1.parallelMax)(this.bodyPriority, lo, hi);
            var a = function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, promise];
                        case 1:
                            goal = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            a();
        }
        else {
            goal = (0, findMax_1.findMax)(this.bodyPriority, lo, hi);
        }
        if (goal == null) {
            return null;
        }
        return goal.place;
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
    /**
     * @requires array is not edited. Can be read.
    */
    CrownList.prototype.getElements = function () {
        return this.body;
    };
    return CrownList;
}());
exports.CrownList = CrownList;
//var a = new CrownList<number>(false);
//for(var i: number = 0; i != 10_000; i++){
//    a.push(1, 1);
//}
//console.log("a")
//while(!a.isEmpty()){
//    a.pop();
//}
//console.log("b")
//a.display(true);
//a.push(0, 0);
//a.push(5, 5);
//a.push(2, 2);
//a.display(true);

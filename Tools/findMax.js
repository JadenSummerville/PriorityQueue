"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMax = void 0;
var isInteger_1 = require("./isInteger");
function findMax(data, lo, hi) {
    if (!(0, isInteger_1.isInteger)(lo) || !(0, isInteger_1.isInteger)(hi)) {
        throw new Error("hi and lo must be integers.");
    }
    if (lo < 0 || hi < 0 || lo >= data.length || hi > data.length) {
        throw new Error("hi or lo are not in range.");
    }
    if (lo >= hi) {
        return null;
    }
    var max = data[lo];
    var maxPlace = lo;
    for (var i = lo + 1; i != hi && i != data.length; i++) {
        if (data[i] > max) {
            max = data[i];
            maxPlace = i;
        }
    }
    return { value: max, place: maxPlace };
}
exports.findMax = findMax;

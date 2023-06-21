"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swap = void 0;
function swap(array, first, last) {
    if (first < 0 || last < 0 || first >= array.length || last >= array.length) {
        throw new Error("Values out of bound");
    }
    var o = array[first];
    array[first] = array[last];
    array[last] = o;
}
exports.swap = swap;

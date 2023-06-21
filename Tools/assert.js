"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = void 0;
function assert(assertation) {
    if (assertation) {
        return;
    }
    throw new Error("CheckRepViolated");
}
exports.assert = assert;

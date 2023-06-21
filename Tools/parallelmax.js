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
exports.parallelMax = void 0;
var findMax_1 = require("./findMax");
var isInteger_1 = require("./isInteger");
var pPromise = function (data, lo, hi, CUTOFF) { return __awaiter(void 0, void 0, void 0, function () {
    var mid, maxLeft, maxRight;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                //alert(hi + " " + lo);
                if (CUTOFF >= hi - lo) {
                    return [2 /*return*/, (0, findMax_1.findMax)(data, lo, hi)];
                }
                mid = lo + Math.floor((hi - lo) / 2);
                return [4 /*yield*/, pPromise(data, lo, mid, CUTOFF)];
            case 1:
                maxLeft = _a.sent();
                return [4 /*yield*/, pPromise(data, mid, hi, CUTOFF)];
            case 2:
                maxRight = _a.sent();
                //alert(maxLeft);
                if (maxLeft == null) {
                    return [2 /*return*/, maxRight];
                }
                if (maxRight == null) {
                    return [2 /*return*/, maxLeft];
                }
                if (maxLeft.value > maxRight.value) {
                    return [2 /*return*/, maxLeft];
                }
                return [2 /*return*/, maxRight];
        }
    });
}); };
function parallelMax(array, min, max) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (max <= min) {
                        throw new Error("Max must be greater than min, but max is ".concat(max, " and min\n         is ").concat(min, " ."));
                    }
                    if (!(0, isInteger_1.isInteger)(max) || !(0, isInteger_1.isInteger)(min)) {
                        throw new Error("Max and min must be integers.");
                    }
                    return [4 /*yield*/, pPromise(array, min, max, 1)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.parallelMax = parallelMax;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkerData = getWorkerData;
function getWorkerData(getComplete, getTopWorker) {
    return __awaiter(this, void 0, void 0, function* () {
        let mergeData = [];
        getTopWorker === null || getTopWorker === void 0 ? void 0 : getTopWorker.forEach((val) => {
            getComplete === null || getComplete === void 0 ? void 0 : getComplete.forEach((completed) => {
                if (String(val === null || val === void 0 ? void 0 : val._id) == String(completed === null || completed === void 0 ? void 0 : completed._id)) {
                    // console.log(val)
                    mergeData.push(Object.assign(Object.assign({}, val), completed));
                }
            });
        });
        const processedData = mergeData.map((data) => {
            var _a, _b;
            return {
                _id: data === null || data === void 0 ? void 0 : data._id,
                name: (_a = data === null || data === void 0 ? void 0 : data.workerDetails) === null || _a === void 0 ? void 0 : _a.FirstName,
                trade: (_b = data === null || data === void 0 ? void 0 : data.workerDetails) === null || _b === void 0 ? void 0 : _b.Category,
                rating: ((data === null || data === void 0 ? void 0 : data.totalRating) / (data === null || data === void 0 ? void 0 : data.reviewCount)).toFixed(2),
                jobs: data === null || data === void 0 ? void 0 : data.count,
                earnings: data === null || data === void 0 ? void 0 : data.earning
            };
        });
        console.log('Processed Data:', JSON.stringify(processedData));
        return processedData;
    });
}

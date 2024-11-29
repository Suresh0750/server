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
exports.getCategory = exports.downloadSalesUsecases = exports.salesUsecases = void 0;
// usernameFilter=null&workerNameFilter=null&categoryFilter=null&dateFilter=null
const admin_1 = require("../../../infrastructure/database/mongoose/admin");
// * ADMIN SALES REPORT * //
const salesUsecases = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('sales side')
        // console.log(data)
        let query = {};
        if ((data === null || data === void 0 ? void 0 : data.categoryFilter) && (data === null || data === void 0 ? void 0 : data.categoryFilter) !== "All") {
            query.service = data === null || data === void 0 ? void 0 : data.categoryFilter;
        }
        if ((data === null || data === void 0 ? void 0 : data.startDateFilter) && (data === null || data === void 0 ? void 0 : data.endDateFilter)) {
            let startDate = { $gte: data === null || data === void 0 ? void 0 : data.startDateFilter, $lte: data === null || data === void 0 ? void 0 : data.endDateFilter };
            query.preferredDate = startDate;
        }
        else if (data === null || data === void 0 ? void 0 : data.endDateFilter) {
            let endDate = { $lte: data === null || data === void 0 ? void 0 : data.endDateFilter };
            query.preferredDate = endDate;
        }
        else if (data === null || data === void 0 ? void 0 : data.startDateFilter) {
            let startDate = { $gte: data === null || data === void 0 ? void 0 : data.startDateFilter };
            query.preferredDate = startDate;
        }
        //    console.log(query)
        let skip = (Number(data === null || data === void 0 ? void 0 : data.currentPage) - 1) * Number(data === null || data === void 0 ? void 0 : data.itemsPerPage);
        let limit = Number(data === null || data === void 0 ? void 0 : data.itemsPerPage);
        // console.log(query)
        const [salesDatas, count] = yield Promise.all([
            (0, admin_1.AdminMongoose)().getSalesDatas(query, skip, limit),
            (0, admin_1.AdminMongoose)().getSalesDatasCount(query)
        ]);
        return {
            salesDatas,
            count
        };
    }
    catch (error) {
        console.log(`Error from useCases->admin->salesUsecases\n`, error);
        throw error;
    }
});
exports.salesUsecases = salesUsecases;
const downloadSalesUsecases = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('sales side');
        // console.log(data)
        let query = {};
        if ((data === null || data === void 0 ? void 0 : data.categoryFilter) && (data === null || data === void 0 ? void 0 : data.categoryFilter) !== "All") {
            query.service = data === null || data === void 0 ? void 0 : data.categoryFilter;
        }
        if ((data === null || data === void 0 ? void 0 : data.startDateFilter) && (data === null || data === void 0 ? void 0 : data.endDateFilter)) {
            let startDate = { $gte: data === null || data === void 0 ? void 0 : data.startDateFilter, $lte: data === null || data === void 0 ? void 0 : data.endDateFilter };
            query.preferredDate = startDate;
        }
        else if (data === null || data === void 0 ? void 0 : data.endDateFilter) {
            let endDate = { $lte: data === null || data === void 0 ? void 0 : data.endDateFilter };
            query.preferredDate = endDate;
        }
        else if (data === null || data === void 0 ? void 0 : data.startDateFilter) {
            let startDate = { $gte: data === null || data === void 0 ? void 0 : data.startDateFilter };
            query.preferredDate = startDate;
        }
        //    console.log(query)
        query.isAccept = "Completed";
        return yield (0, admin_1.AdminMongoose)().downloadSalesData(query);
    }
    catch (error) {
        console.log(`Error from useCases->admin->salesUsecases\n`, error);
        throw error;
    }
});
exports.downloadSalesUsecases = downloadSalesUsecases;
const getCategory = () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, admin_1.AdminMongoose)().getAllCategory(); });
exports.getCategory = getCategory;

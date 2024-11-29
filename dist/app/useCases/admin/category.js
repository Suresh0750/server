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
exports.deleteProductUsecases = exports.isListedProductUsecases = exports.getAllCategoryUseCases = exports.CheckExistCategory = exports.AddCategoryUseCases = exports.EditCategoryUseCases = void 0;
// * Mongoose Query
const admin_1 = require("../../../infrastructure/database/mongoose/admin");
const worker_1 = require("../../../infrastructure/database/mongoose/worker");
const EditCategoryUseCases = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        delete categoryData.newImage;
        const { _id } = categoryData;
        const getCategoryName = yield (0, admin_1.AdminMongoose)().getEditCategoryName((_id || ''));
        const changeCategory = yield (0, admin_1.AdminMongoose)().EditeCategoryQuery(categoryData);
        if (getCategoryName && categoryData && (getCategoryName === null || getCategoryName === void 0 ? void 0 : getCategoryName.categoryName) !== (categoryData === null || categoryData === void 0 ? void 0 : categoryData.categoryName)) {
            yield (0, worker_1.getWorkerRepository)().chagneExitWorkerCategoryName(getCategoryName === null || getCategoryName === void 0 ? void 0 : getCategoryName.categoryName, categoryData === null || categoryData === void 0 ? void 0 : categoryData.categoryName); // * change all worker category name if admin change their modal            
        }
        return;
    }
    catch (error) {
        console.log(`Error from useCases->admin->EditCategoryUseCases\n`, error);
        throw error;
    }
});
exports.EditCategoryUseCases = EditCategoryUseCases;
const AddCategoryUseCases = (categoryDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // * call mongoose query
        // console.log(`req reached AddCategory Usecases`)
        const categoryData = {
            categoryName: categoryDetails.categoryName,
            categoryDescription: categoryDetails.categoryDescription,
            categoryImage: categoryDetails.categoryImage,
        };
        const { AddCategoryQuery } = (0, admin_1.AdminMongoose)();
        return yield AddCategoryQuery(categoryDetails);
    }
    catch (error) {
        console.log(`Error from useCases->admin->AddCategory\n`, error);
        throw error;
    }
});
exports.AddCategoryUseCases = AddCategoryUseCases;
const CheckExistCategory = (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { CheckExistCategory } = (0, admin_1.AdminMongoose)();
        return yield CheckExistCategory(categoryName); // * call to verify the product is there are not
    }
    catch (error) {
        console.log(`Error from useCases->admin->CheckExistCategory\n`, error);
        throw error;
    }
});
exports.CheckExistCategory = CheckExistCategory;
const getAllCategoryUseCases = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, admin_1.AdminMongoose)().getAllCategoryQuery(); // * Query call for
    }
    catch (error) {
        console.log(`Error from useCases->admin->getAllCategoryUseCases\n`, error);
        throw error;
    }
});
exports.getAllCategoryUseCases = getAllCategoryUseCases;
const isListedProductUsecases = (_id, isListed) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, admin_1.AdminMongoose)().IsListedQuery(_id, (isListed ? false : true));
    }
    catch (error) {
        console.log(`Error from useCases->admin->isListedProductUsecases\n`, error);
        throw error;
    }
});
exports.isListedProductUsecases = isListedProductUsecases;
const deleteProductUsecases = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, admin_1.AdminMongoose)().deleteProductQuery(_id);
    }
    catch (error) {
        console.log(`Error from useCases->admin->deleteProductUsecases\n`, error);
        throw error;
    }
});
exports.deleteProductUsecases = deleteProductUsecases;

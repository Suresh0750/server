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
exports.adminLogoutController = exports.AdminVerify = exports.deleteProductController = exports.verifyListController = exports.editCategory = exports.getAllCategory = exports.addCategoryController = exports.isBlock = exports.getALLWorkerListController = exports.isWorkerApproval = exports.workerDetails = exports.getAllUnApprovalWorkerlist = exports.getAllUserList = exports.isBlockUserController = exports.dashboard = exports.dashboardOverview = exports.workerDashboard = exports.reviewDashboard = exports.categoryList = exports.salesReport = exports.downloadSales = void 0;
const verify_1 = require("../../../app/useCases/admin/verify");
// * useCases
const uploadImage_1 = require("../../../app/useCases/utils/uploadImage");
const wokerSide_1 = require("../../../app/useCases/admin/wokerSide");
const userSide_1 = require("../../../app/useCases/admin/userSide");
const workerApprovalSide_1 = require("../../../app/useCases/admin/workerApprovalSide");
const category_1 = require("../../../app/useCases/admin/category");
const dashboard_1 = require("../../../app/useCases/admin/dashboard");
const salesReport_1 = require("../../../app/useCases/admin/salesReport");
const commonTypes_1 = require("../../../domain/entities/commonTypes");
const commonTypes_2 = require("../../../domain/entities/commonTypes");
const jwt_1 = require("../../../infrastructure/service/jwt");
// * admin in sales Report side
const downloadSales = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('downloadSales')
        const result = yield (0, salesReport_1.downloadSalesUsecases)(req.query);
        // console.log(result)
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'data has been fetched', result });
    }
    catch (error) {
        console.log(`Error from downloadSales\n${error}`);
        next(error);
    }
});
exports.downloadSales = downloadSales;
const salesReport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('salesReport')
        // console.log(req?.query)
        const result = yield (0, salesReport_1.salesUsecases)(req.query);
        // console.log(result)
        return yield res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'data successfully fetched', result });
    }
    catch (error) {
        console.log(`Error from salesReport\n${error}`);
        next(error);
    }
});
exports.salesReport = salesReport;
const categoryList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, salesReport_1.getCategory)();
        // console.log(result)
        return yield res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'data successfully fetched', result });
    }
    catch (error) {
        console.log(`Error from getCategory\n${error}`);
        next(error);
    }
});
exports.categoryList = categoryList;
// * --- ADMIN DASHBORD---//
// * admin in review dashboard data
const reviewDashboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, dashboard_1.reviewUsecases)();
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'data has been fetched', result });
    }
    catch (error) {
        console.log(`Error from reviewDashboard\n${error}`);
        next(error);
    }
});
exports.reviewDashboard = reviewDashboard;
// * admin worker dashboard side
const workerDashboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, dashboard_1.workerUsecases)();
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'data has been fetched', result });
    }
    catch (error) {
        console.log(`Error from workerDashboard\n${error}`);
        next(error);
    }
});
exports.workerDashboard = workerDashboard;
// * admin Dashboard side
const dashboardOverview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('request reached dashboardOverview')
        const result = yield (0, dashboard_1.adminOverviewUsecases)();
        // console.log(result)
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'data successfully fetched', result });
    }
    catch (error) {
        console.log(`Error from dashboardOverview\n${error}`);
        next(error);
    }
});
exports.dashboardOverview = dashboardOverview;
const dashboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, dashboard_1.dashboardUsecases)();
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'data has been fetched successfully', result });
    }
    catch (error) {
        console.log(`Error from dashboard\n${error}`);
        next(error);
    }
});
exports.dashboard = dashboard;
// * admin User side
const isBlockUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body)
        yield (0, userSide_1.isBlockUserUseCases)(req.body._id, req.body.isBlocked);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: "Data has been update" });
    }
    catch (error) {
        console.log(`Error from isBlcokUser\n${error}`);
        next(error);
    }
});
exports.isBlockUserController = isBlockUserController;
const getAllUserList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, userSide_1.getAllUserUseCase)();
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Data fetched successfully', result });
    }
    catch (error) {
        console.log(`Error from getAllUserList\n${error}`);
        next(error);
    }
});
exports.getAllUserList = getAllUserList;
// * admin in worker Approval side
const getAllUnApprovalWorkerlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, workerApprovalSide_1.AdminWorkerApprovalUseCases)();
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Data successfully fetched', result });
    }
    catch (error) {
        console.log(`Error from getALLWorkerListController\n${error}`);
        next(error);
    }
});
exports.getAllUnApprovalWorkerlist = getAllUnApprovalWorkerlist;
const workerDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, wokerSide_1.getDetails)(req.params.workerId);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Data successfully fetched', result });
    }
    catch (error) {
        console.log(`Error from workerDetails`, error);
        next(error);
    }
});
exports.workerDetails = workerDetails;
const isWorkerApproval = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield (0, workerApprovalSide_1.isWorkerApprovalUseCases)((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'worker successfully verified' });
    }
    catch (error) {
        console.log(`Error from isWorkerApproval\n${error}`);
        next(error);
    }
});
exports.isWorkerApproval = isWorkerApproval;
// * admin worker side
const getALLWorkerListController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, wokerSide_1.getALLWorkerUseCases)();
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: "successfully fetched the worker list", result });
    }
    catch (error) {
        console.log(`Error from getALLWorkerListController\n${error}`);
        next(error);
    }
});
exports.getALLWorkerListController = getALLWorkerListController;
const isBlock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, wokerSide_1.isBlockUsecases)(req.params.id);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'successfully updated' });
    }
    catch (error) {
        console.log(`Error from Admin->worker->isBlock\n${error}`);
        next(error);
    }
});
exports.isBlock = isBlock;
// * Admin category side
const addCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // console.log(`req reached addCategory controller`) 
        // console.log(req.body)
        if (true) {
            const ExistCategory = yield (0, category_1.CheckExistCategory)((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.categoryName);
            if (ExistCategory) {
                const error = new Error('Product already exists');
                error.statusCode = commonTypes_1.StatusCode.Conflict;
                throw error;
            }
            const file = req.file;
            const imageUrl = yield (0, uploadImage_1.uploadImage)(file); // * call uploadImage usecases
            // const imageUrl = "https://profinder.s3.eu-north-1.amazonaws.com/uploads/1727028314951_mechanic.jpg"
            req.body.categoryImage = imageUrl;
            yield (0, category_1.AddCategoryUseCases)(req.body); // * call usecases
        }
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Product has been added' });
    }
    catch (error) {
        console.log(`Error from addCategoryController\n${error}`);
        next(error);
    }
});
exports.addCategoryController = addCategoryController;
const getAllCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalCategory = yield (0, category_1.getAllCategoryUseCases)();
        res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Successfully data fetched', totalCategory });
    }
    catch (error) {
        console.log(`Error from getAllCategory\n${error}`);
        next(error);
    }
});
exports.getAllCategory = getAllCategory;
const editCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // console.log('editCategory')
        // console.log(req.body)
        if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.newImage) {
            const file = req.file;
            const imageUrl = yield (0, uploadImage_1.uploadImage)(file);
            req.body.categoryImage = imageUrl;
        }
        yield (0, category_1.EditCategoryUseCases)(req.body);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Product has been successfully edit' });
    }
    catch (error) {
        console.log(`Error from EditCategory\n${error}`);
        next(error);
    }
});
exports.editCategory = editCategory;
const verifyListController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body)
        yield (0, category_1.isListedProductUsecases)(req.body._id, req.body.isListed);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'List has been updated' });
    }
    catch (error) {
        console.log(`Error from verifyListController\n${error}`);
        next(error);
    }
});
exports.verifyListController = verifyListController;
const deleteProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield (0, category_1.deleteProductUsecases)((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Product has been deleted' });
    }
    catch (error) {
        console.log(`Error from deleteProductController\n${error}`);
        next(error);
    }
});
exports.deleteProductController = deleteProductController;
// * Admin authendication
const AdminVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if ((0, verify_1.AdminVerifyUseCases)(req.body)) {
            let email = (_a = req.body) === null || _a === void 0 ? void 0 : _a.emailAddress;
            const { refreshToken, accessToken } = (0, jwt_1.JwtService)(commonTypes_1.AdminData.customerId, commonTypes_1.AdminData.customerName, email, commonTypes_1.Role.Admin); // * here create Jwt token
            res.cookie(commonTypes_2.CookieTypes.AdminRefreshToken, refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                domain: ".profinders.online",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.cookie(commonTypes_2.CookieTypes.AdminAccessToken, accessToken, {
                httpOnly: false,
                secure: true,
                sameSite: 'strict',
                domain: ".profinders.online",
            });
            return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'login verify successful' });
        }
        return res.status(commonTypes_1.StatusCode.Unauthorized).json({ success: false, message: 'Invalid credentials' });
    }
    catch (error) {
        console.log(`Error from addCategoryController\n${error}`);
        next(error);
    }
});
exports.AdminVerify = AdminVerify;
const adminLogoutController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie(commonTypes_2.CookieTypes.AdminAccessToken, {
            secure: true,
            sameSite: 'strict',
            domain: ".profinders.online",
        }); // * Clear the accessToken
        res.clearCookie(commonTypes_2.CookieTypes.AdminRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            domain: ".profinders.online",
        });
        req.session.destroy((err) => {
            if (err) {
                console.log('Error destroying session:', err);
                return res.status(commonTypes_1.StatusCode.InternalServerError).json({ sucess: true, message: 'Logout failed' });
            }
            // * Successfully logged out
            return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Logged out successfully' });
        });
    }
    catch (error) {
        console.log(`Error from adminLogout\n${error}`);
        next(error);
    }
});
exports.adminLogoutController = adminLogoutController;

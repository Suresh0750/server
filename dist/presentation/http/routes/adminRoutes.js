"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyTokenAndRole_1 = require("../middlewares/verifyTokenAndRole");
const multer_1 = __importDefault(require("../../../infrastructure/service/multer"));
const admin_1 = require("../controllers/admin");
const adminRoutes = (0, express_1.Router)();
// * ADMIN SALES - REPORT 
adminRoutes.get('/sales-report', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.salesReport);
adminRoutes.get('/categoryList', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.categoryList);
adminRoutes.get('/download-sales', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.downloadSales);
// * Admin / dashboard side
adminRoutes.get('/dashboardOverview', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.dashboardOverview);
adminRoutes.get('/dashboard', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.dashboard);
adminRoutes.get('/dashboardWorker', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.workerDashboard);
adminRoutes.get('/dashboard-review', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.reviewDashboard);
// * admin / User side
adminRoutes.get('/allUserlist', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.getAllUserList);
adminRoutes.post('/isBlockUser', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.isBlockUserController);
// * admin / Worker Approval side
adminRoutes.get('/allUnApprovalWorkerlist', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.getAllUnApprovalWorkerlist);
adminRoutes.put('/isWorkerApproval/:id', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.isWorkerApproval);
// admin / worker details
adminRoutes.get('/worker-details/:workerId', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.workerDetails);
// * admin/ worker side
adminRoutes.get("/workerList", (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.getALLWorkerListController);
adminRoutes.patch("/worker/isBlock/:id", (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.isBlock);
// * admin catagory router
adminRoutes.post("/addCategory", (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), multer_1.default.single('categoryImage'), admin_1.addCategoryController);
adminRoutes.get('/fetchCategoryData', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.getAllCategory);
adminRoutes.post('/editCategory', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), multer_1.default.single('categoryImage'), admin_1.editCategory);
adminRoutes.post('/isListVerify', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.verifyListController);
adminRoutes.delete('/deleteProduct/:id', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.deleteProductController);
// * admin authendication 
adminRoutes.post('/adminLogout', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['admin']), admin_1.adminLogoutController);
adminRoutes.post("/adminVerify", admin_1.AdminVerify);
exports.default = adminRoutes;

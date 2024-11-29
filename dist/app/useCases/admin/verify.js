"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminVerifyUseCases = void 0;
const AdminVerifyUseCases = (adminData) => {
    try {
        return (adminData.emailAddress == process.env.ADMIN_EMAIL && adminData.password == process.env.ADMIN_PASS);
    }
    catch (error) {
        console.log(`Error from verifyAdmin\n${error}`);
        throw error;
    }
};
exports.AdminVerifyUseCases = AdminVerifyUseCases;

"use strict";
// * server status code
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminData = exports.Role = exports.CookieTypes = exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["Success"] = 200] = "Success";
    StatusCode[StatusCode["Created"] = 201] = "Created";
    StatusCode[StatusCode["Accepted"] = 202] = "Accepted";
    StatusCode[StatusCode["NoContent"] = 204] = "NoContent";
    StatusCode[StatusCode["BadRequest"] = 400] = "BadRequest";
    StatusCode[StatusCode["Unauthorized"] = 401] = "Unauthorized";
    StatusCode[StatusCode["Forbidden"] = 403] = "Forbidden";
    StatusCode[StatusCode["NotFound"] = 404] = "NotFound";
    StatusCode[StatusCode["Conflict"] = 409] = "Conflict";
    StatusCode[StatusCode["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    StatusCode[StatusCode["InternalServerError"] = 500] = "InternalServerError";
    StatusCode[StatusCode["NotImplemented"] = 501] = "NotImplemented";
    StatusCode[StatusCode["BadGateway"] = 502] = "BadGateway";
    StatusCode[StatusCode["ServiceUnavailable"] = 503] = "ServiceUnavailable";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
// * cookie
var CookieTypes;
(function (CookieTypes) {
    CookieTypes["AdminAccessToken"] = "adminAccessToken";
    CookieTypes["WorkerAccessToken"] = "workerAccessToken";
    CookieTypes["UserAccessToken"] = "userAccessToken";
    CookieTypes["AdminRefreshToken"] = "adminRefreshToken";
    CookieTypes["WorkerRefreshToken"] = "workerRefreshToken";
    CookieTypes["UserRefreshToken"] = "userRefreshToken";
    CookieTypes["Token"] = "token"; // * using for produte otp page
})(CookieTypes || (exports.CookieTypes = CookieTypes = {}));
var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["Worker"] = "worker";
    Role["User"] = "user";
    Role["Customer"] = "customer";
})(Role || (exports.Role = Role = {}));
var AdminData;
(function (AdminData) {
    AdminData["customerId"] = "01";
    AdminData["customerName"] = "Suresh";
})(AdminData || (exports.AdminData = AdminData = {}));

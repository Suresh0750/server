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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyTokenAndRole = exports.generateAccessToken = void 0;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const commonTypes_1 = require("../../../domain/entities/commonTypes");
const commonTypes_2 = require("../../../domain/entities/commonTypes");
const checkBlocked_1 = require("../../../app/services/checkBlocked");
// *  Helper function to verify JWT token
function verifyToken(token, secretKey) {
    try {
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (error) {
        console.log('verify token', error === null || error === void 0 ? void 0 : error.message);
        return null;
    }
}
// * Function to generate a new access token
const generateAccessToken = (payload) => {
    try {
        return jsonwebtoken_1.default.sign(payload, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: '15m' });
    }
    catch (error) {
        console.log(error);
    }
};
exports.generateAccessToken = generateAccessToken;
// * Middleware to verify access token and role
const verifyTokenAndRole = (role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // console.log(role);
            const url = req.originalUrl;
            let payload = null;
            let accessToken;
            if (selectRefreshToken(url, commonTypes_1.Role.Admin)) {
                accessToken = req.cookies[commonTypes_2.CookieTypes.AdminAccessToken];
            }
            else if (selectRefreshToken(url, commonTypes_1.Role.Worker)) {
                accessToken = req.cookies[commonTypes_2.CookieTypes.WorkerAccessToken];
            }
            else if (selectRefreshToken(url, commonTypes_1.Role.User)) {
                accessToken = req.cookies[commonTypes_2.CookieTypes.UserAccessToken];
            }
            else {
                accessToken = req.cookies[commonTypes_2.CookieTypes.UserAccessToken] || req.cookies[commonTypes_2.CookieTypes.WorkerAccessToken];
            }
            if (accessToken) {
                payload = verifyToken(accessToken, String(process.env.ACCESS_TOKEN_SECRET));
            }
            if (!payload || !accessToken) {
                // console.log('accessToken vanished', accessToken);
                payload = yield (0, exports.verifyRefreshToken)(req, res); // Await the async function here
            }
            if (!payload) {
                // console.log('no access token and no refreshtoken');
                return res.status(commonTypes_1.StatusCode.Unauthorized).json({ success: false, message: 'Unauthorized, please log in', middleware: true });
            }
            if (payload && ((payload === null || payload === void 0 ? void 0 : payload.role) == commonTypes_1.Role.User || (payload === null || payload === void 0 ? void 0 : payload.role) == commonTypes_1.Role.Worker)) {
                const isBlock = yield (0, checkBlocked_1.checkBlocked)(payload === null || payload === void 0 ? void 0 : payload.role, payload === null || payload === void 0 ? void 0 : payload.customerId);
                if (isBlock) {
                    yield clearToken(payload.role, res);
                    return res
                        .status(commonTypes_1.StatusCode.Forbidden)
                        .json({ success: false, message: 'account is blocked', isBlock: true, middleware: true });
                }
            }
            req.session.customerId = payload.customerId;
            req.session.save();
            if (!role.includes(payload.role)) {
                // console.log('role checking');
                // console.log(role, payload.role);
                return res.status(commonTypes_1.StatusCode.Forbidden).json({ success: false, message: 'Access denied', middleware: true });
            }
            next(); // Proceed to the next middleware/handler
        }
        catch (error) {
            console.log(error);
            return res.status(commonTypes_1.StatusCode.InternalServerError).json({ success: false, message: 'An error occurred' });
        }
    });
};
exports.verifyTokenAndRole = verifyTokenAndRole;
const verifyRefreshToken = (req, res) => {
    try {
        const roleAccessToken = {
            admin: commonTypes_2.CookieTypes.AdminAccessToken,
            worker: commonTypes_2.CookieTypes.WorkerAccessToken,
            user: commonTypes_2.CookieTypes.UserAccessToken
        };
        const roleRefreshToken = {
            admin: commonTypes_2.CookieTypes.AdminRefreshToken,
            worker: commonTypes_2.CookieTypes.WorkerRefreshToken,
            user: commonTypes_2.CookieTypes.UserRefreshToken
        };
        // # need to check the url
        let refreshToken = null;
        let tokenRole = null;
        if (selectRefreshToken(req.originalUrl, commonTypes_1.Role.Admin)) {
            refreshToken = req.cookies[commonTypes_2.CookieTypes.AdminRefreshToken];
            tokenRole = commonTypes_1.Role.Admin;
        }
        else if (selectRefreshToken(req.originalUrl, commonTypes_1.Role.Worker)) {
            refreshToken = req.cookies[commonTypes_2.CookieTypes.WorkerRefreshToken];
            tokenRole = commonTypes_1.Role.Worker;
        }
        else if (selectRefreshToken(req.originalUrl, commonTypes_1.Role.User)) {
            refreshToken = req.cookies[commonTypes_2.CookieTypes.UserRefreshToken];
            tokenRole = commonTypes_1.Role.User;
        }
        else {
            refreshToken = req.cookies[commonTypes_2.CookieTypes.UserRefreshToken] || req.cookies[commonTypes_2.CookieTypes.WorkerRefreshToken];
            tokenRole = req.cookies[commonTypes_2.CookieTypes.UserRefreshToken] ? commonTypes_1.Role.User : commonTypes_1.Role.Worker;
        }
        if (!refreshToken) {
            return null;
        }
        // console.log('refreshToken',refreshToken)
        const refreshPayload = verifyToken(refreshToken, String(process.env.REFRESH_TOKEN_SECRET));
        // console.log('refreshPayload',refreshPayload)
        if (refreshPayload) {
            const { exp } = refreshPayload, newPayload = __rest(refreshPayload, ["exp"]);
            const newAccessToken = (0, exports.generateAccessToken)(newPayload);
            if (newAccessToken) {
                // console.log('newAccessToken ,',newAccessToken)
                if (tokenRole)
                    res.cookie(roleAccessToken[tokenRole], newAccessToken, { maxAge: 15 * 60 * 1000 });
                return newPayload;
            }
        }
        if (tokenRole) {
            res.clearCookie(roleRefreshToken[tokenRole]);
            res.clearCookie(roleAccessToken[tokenRole]);
        }
    }
    catch (error) {
        console.log('Error from refreshToken', error);
    }
    return null;
};
exports.verifyRefreshToken = verifyRefreshToken;
function selectRefreshToken(url, role) {
    return url.includes(role);
}
function clearToken(role, res) {
    try {
        switch (role) {
            case commonTypes_1.Role.User:
                res.clearCookie(commonTypes_2.CookieTypes.UserRefreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    domain: ".profinders.online",
                    path: '/',
                });
                res.clearCookie(commonTypes_2.CookieTypes.UserAccessToken);
                break;
            case commonTypes_1.Role.Worker:
                res.clearCookie(commonTypes_2.CookieTypes.WorkerRefreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    domain: ".profinders.online",
                    path: '/',
                });
                res.clearCookie(commonTypes_2.CookieTypes.WorkerAccessToken);
                break;
            default:
                console.log('Role not handled:', role);
        }
    }
    catch (error) {
        console.error('Error clearing tokens:', error);
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmailValidate = exports.validateUserSignUp = void 0;
const express_validator_1 = require("express-validator");
// * singup server side validation
exports.validateUserSignUp = [
    (0, express_validator_1.body)('emailAddress').isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
        catch (error) {
            console.log(`Error from validation middleware`, error);
            next(error);
        }
    }
];
// * forget password email validate
exports.isEmailValidate = [
    (0, express_validator_1.body)('emailAddress').isEmail().withMessage('Invalid email format'),
    (req, res, next) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            // console.log(`middleware`,errors)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
        catch (error) {
            console.log(`Error from validation middleware`, error);
            next(error);
        }
    }
];

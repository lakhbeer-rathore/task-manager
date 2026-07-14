const { body, validationResult } = require("express-validator");

const validateRegister = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be atleast 6 characters"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        next();
    }
];

const validateLogin = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .notEmpty()
        .withMessage("Password required"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        next();
    }
];

const validateCreateTask = [
    body("title")
        .notEmpty()
        .withMessage("Title is required"),

    body("description")
        .notEmpty()
        .withMessage("Description is required"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        next();
    }
];

const validateUpdateTask = [
    body("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Title is required"),


    body("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Description is required"),


    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        next();
    }
];

module.exports = {
    validateRegister,
    validateLogin,
    validateCreateTask,
    validateUpdateTask
}
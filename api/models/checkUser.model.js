import { checkSchema } from "express-validator";

export const userValidator = checkSchema({
    firstName: {
        in: ["body"],
        isString: true,
        notEmpty: true,
        trim: true,
        escape: true,
    },
    lastName: {
        in: ["body"],
        isString: true,
        notEmpty: true,
        trim: true,
        escape: true,
    },
    username: {
        in: ["body"],
        isString: true,
        notEmpty: true,
        trim: true,
        escape: true,
    }, 
    password: {
        in: ["body"],
        isString: true,
        isLength: {
            options: { min: 8 }
        },
        trim: true,
        escape: true,
    },
});
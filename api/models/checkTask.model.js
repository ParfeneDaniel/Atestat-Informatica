import { checkSchema } from "express-validator";

export const taskValidator = checkSchema({
  title: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    isLength: {
      options: { max: 30 },
    },
    trim: true,
    escape: true,
  },
  content: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    trim: true,
    escape: true,
  },
  importance: {
    in: ["body"],
    isInt: {
      options: { min: 1, max: 5 },
    },
  },
  status: {
    in: ["body"],
    isInt: {
      options: { min: 1, max: 2 },
    },
    notEmpty: true,
  }
});

export const updatedTaskValidator = checkSchema({
  title: {
    in: ["body"],
    optional: {
      options: { checkFalsy: true },
    },
    isString: true,
    notEmpty: true,
    isLength: {
      options: { max: 30 },
    },
    trim: true,
    escape: true,
  },
  content: {
    in: ["body"],
    optional: {
      options: { checkFalsy: true },
    },
    isString: true,
    notEmpty: true,
    trim: true,
    escape: true,
  },
  importance: {
    in: ["body"],
    optional: {
      options: { checkFalsy: true },
    },
    isInt: {
      options: { min: 1, max: 5 },
    },
  },
  status: {
    in: ["body"],
    optional: {
      options: { checkFalsy: true },
    },
    isInt: {
      options: { min: 1, max: 2 },
    },
    notEmpty: true,
  }
});

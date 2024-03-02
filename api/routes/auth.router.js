import express from "express";
import { userValidator } from "../models/checkUser.model.js";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", userValidator, signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);

export default router;
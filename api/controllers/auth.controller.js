import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { firstName, lastName, username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exist" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "User was successfully created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(403).json({ message: "Wrong credential " });
    }
    const { password: hashedPassword, ...rest } = user._doc;
    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json(rest);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};

export const signOut = (req, res) => {
  try {
    res.clearCookie("jwt").status(200).json({ message: "SignOut success! " });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};

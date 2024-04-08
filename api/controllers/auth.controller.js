import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import Attribute from "../models/attribute.model.js";

export const signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: "Please provide a password with minimum lenght of 8" });
    }
    const { firstName, lastName, username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ errors: "Username already exist" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });
    const userAttribute = await Attribute.create({
      user: newUser.id,
    });
    await Promise.all([await newUser.save(), await userAttribute.save()]);
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
      return res.status(404).json({ errors: "User not found" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(403).json({ errors: "Wrong credential" });
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

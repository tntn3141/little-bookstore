import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel.js";

export const register = async (req, res, next) => {
  const { name, email, password, admin } = req.body;
  const bcryptSalt = bcrypt.genSaltSync(10);
  let isAdmin = (admin === "true");

  try {
    const newUser = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      isAdmin: isAdmin
    });
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send("This user does not exist.");
    }
    const isValidPassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(400).send("Wrong email or password.");
    }
    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin, name: user.name },
      process.env.JWT_SECRET
    );
    const { password, createdAt, updatedAt, __v, ...otherUserDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
      })
      .status(200)
      .json({ ...otherUserDetails });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res.cookie("access_token", "").json(true);
  } catch (error) {
    next(error);
  }
};

export const checkToken = (req, res, next) => {
  const token = req.cookies.access_token;
  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, (error, user) => {
        if (error) throw error;
        res.json(user);
      });
    } else {
      res.json(null);
    }
  } catch (error) {
    next(error);
  }
};

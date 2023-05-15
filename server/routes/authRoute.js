import express from "express";

import {
  login,
  register,
  logout,
  checkToken,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", checkToken);

export default router;

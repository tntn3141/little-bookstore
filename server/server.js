import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import Multer from "multer";

import authRoute from "./routes/authRoute.js";
import usersRoute from "./routes/usersRoute.js";
import booksRoute from "./routes/booksRoute.js";
import ratingRoute from "./routes/ratingRoute.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 8080
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// Middleware
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use(express.json());
app.use(multer.single("coverImage"));
app.use(cookieParser());
app.disable("x-powered-by"); // For security reason

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/books", booksRoute);
app.use("/api/rating", ratingRoute);

// Connect to mongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, (error, user) => {
      if (error) throw error;
      res.json(user);
    });
  } else {
    res.json(null);
  }
});

app.listen(port, () => {
  connect();
  console.log(`Listening on port ${port}`);
});

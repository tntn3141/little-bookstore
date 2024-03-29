import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import Multer from "multer";

import authRoute from "./routes/authRoute.js";
import usersRoute from "./routes/usersRoute.js";
import booksRoute from "./routes/booksRoute.js";
import ratingRoute from "./routes/ratingRoute.js";
import ordersRoute from "./routes/ordersRoute.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 24 * 1024 * 1024,
    fieldSize: 2 * 1024 * 1024,
  },
});

// Middleware
const baseUrl = "https://little-bookstore.netlify.app";

app.use(
  cors({
    credentials: true,
    origin: baseUrl,
  })
);

app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": baseUrl,
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Content-Security-Policy":
      "default-src 'self'; script-src 'nonce-random123' 'strict-dynamic' 'unsafe-inline' https:; object-src 'none'; base-uri 'none';",
  });
  next();
});

app.use(express.json());
app.use(multer.single("image"));
app.use(cookieParser());
app.disable("x-powered-by");

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/books", booksRoute);
app.use("/api/rating", ratingRoute);
app.use("/api/orders", ordersRoute);

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

app.listen(port, () => {
  connect();
  console.log(`Listening on port ${port}`);
});

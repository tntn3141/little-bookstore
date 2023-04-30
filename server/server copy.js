// Load env variables

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

const User = require("./models/userModel.js");
const Book = require("./models/bookModel.js");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "qwerty123456";

// Middleware
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use(express.json());
app.use(cookieParser());

// Connect to mongoDB
mongoose.connect(process.env.MONGODB_URL);

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userInfo = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userInfo);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  mongoose.connect(process.env.MONGODB_URL);
  const { email, password } = req.body;
  const userInfo = await User.findOne({ email });
  console.log(userInfo);
  if (userInfo) {
    const isValidPassword = bcrypt.compareSync(password, userInfo.password);
    if (isValidPassword) {
      jwt.sign(
        {
          email: userInfo.email,
          id: userInfo._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userInfo);
        }
      );
    } else {
      res.status(422).json("Invalid password");
    }
  } else {
    res.json(false);
  }
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

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// Handle book submission from users
app.post("/submit", async (req, res) => {
  const { title, author, publicationYear, stock, price, publisher } = req.body;

  console.log(title);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

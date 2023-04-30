import express from "express";

import { createRating, getRating } from "../controllers/ratingController.js";

const router = express.Router();

router.post("/", createRating);

router.get("/", getRating);

export default router;

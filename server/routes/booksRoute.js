import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../controllers/bookController.js";

const router = express.Router();

// Create
router.post("/", createBook);
// Update
router.put("/:id", updateBook);
// Delete
router.delete("/:id", deleteBook);
// Get
router.get("/:id", getBook);
// Get all
router.get("/", getBooks);

export default router;

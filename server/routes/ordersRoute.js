import express from "express";
import {
  handleCreateOrder,
  handleCaptureOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", handleCreateOrder);
router.post("/:orderId/capture", handleCaptureOrder);

export default router;

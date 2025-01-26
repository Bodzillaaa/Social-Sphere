import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  deleteNotifications,
  deleteOneNotification,
  getNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);

// TODO (optional) will do after completion
router.delete("/:id", protectRoute, deleteOneNotification);

export default router;

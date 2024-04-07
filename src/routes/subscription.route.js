import { Router } from "express";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//secured routes
router.route("/subscribe/:channelId").post(verifyJWT, toggleSubscription);
router
  .route("/subscribe/channel/:channelId")
  .get(verifyJWT, getUserChannelSubscribers);
router
  .route("/subscribed-channels/:subscriberId")
  .get(verifyJWT, getSubscribedChannels);

export default router;

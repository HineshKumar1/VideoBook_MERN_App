import { Router } from "express";
import { getUserChannelSubscribers, toggleSubscription} from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/subscribe/:channelId").post(verifyJWT, toggleSubscription);
router.route("/subscribe/channel/:channelId").get(verifyJWT, getUserChannelSubscribers);

export default router;

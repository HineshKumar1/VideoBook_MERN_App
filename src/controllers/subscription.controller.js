import { Subscriptions } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const toggleSubscription = asyncHandler(async (req, res) => {
  try {
    const { channelId } = req.params;
    const { subscriberId } = req.user._id;

    const subscription = await Subscriptions.create({
      channelId,
      subscriberId,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, subscription, "Subscription Toggled Successfully")
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Server Error");
  }
});

module.exports = {
    toggleSubscription
}
import { subscription} from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  try {
    const { channelId } = req.params;
    
    const subscribe = await subscription.create({
      channel: channelId,
        subscriber: req.user._id,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, subscribe, "Subscription Toggled Successfully")
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Server Error");
  }
});

export { 
    toggleSubscription 
};
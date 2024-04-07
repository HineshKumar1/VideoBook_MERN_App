import mongoose from "mongoose";
import { subscription } from "../models/subscription.model.js";
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

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  try {
    const { channelId } = req.params;

    const userSubscribedChannels = await subscription.aggregate([
      {
        $match: {
          channel: new mongoose.Types.ObjectId(channelId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "subscriber",
          foreignField: "_id",
          as: "subscribers",
        },
      },
      {
        $project: {
          subscribers: {
            _id:1,
           userName:1,
            fullName:1,
            avatar:1
          },
        },
      },
      // {
      //   $addFields: {
      //     channelDetails: {
      //       $arrayElemAt: ["$channels", 0], // Corrected usage of $arrayElemAt
      //     },
      //   },
      // },
    ]);
    console.log(userSubscribedChannels);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          userSubscribedChannels,
          "All user channel Subscribes fetched Successfull!!"
        )
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Server Error");
  }
});

export { toggleSubscription, getUserChannelSubscribers };

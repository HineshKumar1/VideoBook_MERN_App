import mongoose from "mongoose";
import { subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  try {
    const { channelId } = req.params;

    const isSubscribed = await subscription.findOne({
      channel: channelId,
      subscriber: req.user._id,
    });
    if (isSubscribed) {
      return res
        .status(400)
        .json(new ApiError(400, null, "Already Subscribed"));
    }
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
            _id: 1,
            userName: 1,
            fullName: 1,
            avatar: 1,
          },
        },
      },
    ]);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          userSubscribedChannels,
          "All user channel Subscribes fetched Successfully!"
        )
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Server Error");
  }
});

const getSubscribedChannels = asyncHandler(async (req, res) => {
  try {
    const { subscriberId } = req.params;

    const SubscribedChannels = await subscription.aggregate([
      {
        $match: {
          subscriber: new mongoose.Types.ObjectId(subscriberId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "channel",
          foreignField: "_id",
          as: "channels",
        },
      },
      {
        $project: {
          channels: {
            _id: 1,
            userName: 1,
            fullName: 1,
            avatar: 1,
          },
        },
      },
    ]);
    if (SubscribedChannels.length === 0) {
      return res
        .status(400)
        .json(new ApiError(400, null, "No Subscribed Channels"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          SubscribedChannels,
          "All user channel Subscribes fetched Successfully!"
        )
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Server Error");
  }
});
export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };

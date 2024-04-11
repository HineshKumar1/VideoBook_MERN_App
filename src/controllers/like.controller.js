import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) {
      return res.status(400).json(new ApiError(400, "Invalid Video ID"));
    }
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json(new ApiError(404, null, "Video not found"));
    }
    const isLiked = await Like.findOne({
      likedBy: req.user._id,
      video: videoId,
    });
    if (isLiked) {
      return res
        .status(400)
        .json(new ApiError(400, "You have already liked this video"));
    }
    const videoLike = await Like.create({
      video: videoId,
      likedBy: req.user._id,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, videoLike, "Video liked successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Server Error");
  }
});


export { toggleVideoLike };

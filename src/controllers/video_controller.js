import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import {
  deleteOnCloudinary,
  uploadOnCloudinary,
} from "../services/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const publishVideo = asyncHandler(async (req, res) => {
  try {
    const { title, description } = req.body;
    const videoFileLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (!(title && description && videoFileLocalPath && thumbnailLocalPath)) {
      return res.status(400).json(
        new ApiError({
          status: 400,
          message: "Please provide all required fields",
        })
      );
    }

    //upload files on cloudinary
    const videoFile = await uploadOnCloudinary(videoFileLocalPath);
    const thumbnailFile = await uploadOnCloudinary(thumbnailLocalPath);

    // Save video details to database
    const uploadVideo = await Video.create({
      title,
      description,
      videoFile: videoFile.url,
      thumbnail: thumbnailFile.url,
      duration: videoFile.duration,
      owner: req.user.id,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, uploadVideo, "Video uploaded successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Server Error");
  }
});

const getVideoById = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json(new ApiError(404, null, "Video not found"));
    }
    return res.status(200).json(new ApiResponse(200, video, "Video found"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Server Error");
  }
});

const updateVideo = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;
    const { title, description } = req.body;
    const thumbnailFilePath = req.file?.path;

    //Check video ID is valid or not
    if (videoId && !isValidObjectId(videoId)) {
      return res.status(400).json(new ApiError(400, null, "Invalid video ID"));
    }

    const isVideoAvailable = await Video.findById(videoId);

    //Check video is avaibalbe or not
    if (!isVideoAvailable) {
      return res.status(404).json(new ApiError(404, null, "Video not found"));
    }
    //delete previous cloudinary thumbnail
    await deleteOnCloudinary(isVideoAvailable.thumbnail);

    //upload thumbnail on cloudinary
    const thumbnail = await uploadOnCloudinary(thumbnailFilePath);

    const updateVidoe = await Video.findByIdAndUpdate(
      videoId,
      {
        $set: {
          title,
          description,
          thumbnail: thumbnail.url,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, updateVidoe, "Video updated successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Server Error");
  }
});

export { publishVideo, getVideoById, updateVideo };

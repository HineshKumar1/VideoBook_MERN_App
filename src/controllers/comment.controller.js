import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const addComment = asyncHandler(async (req, res) => {
  try {
    const { content } = req.body;
    const { videoId } = req.params;
    console.log(isValidObjectId(videoId));

    // Check if videoId is valid
    if (!isValidObjectId(videoId)) {
      return res.status(400).json(new ApiError(400, null, "Invalid video ID"));
    }
    // Check if video exists
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(400).json(new ApiError(400, null, "Video not found"));
    }
    if (!content) {
      return res
        .status(400)
        .json(new ApiError(400, null, "Please Enter comment"));
    }
    const postComment = await Comment.create({
      content,
      video: videoId,
      owner: req.user._id,
    });
    postComment.save();

    return res
      .status(200)
      .json(new ApiResponse(200, postComment, "Comment added successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
});

const updateComment = asyncHandler(async (req, res) => {
  try {
    const { content } = req.body;
    const { commentId } = req.query;
    if (!isValidObjectId(commentId)) {
      return res
        .status(400)
        .json(new ApiError(400, null, "Invalid comment ID"));
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(400).json(new ApiError(400, null, "Comment not found"));
    }
    if (!content) {
      return res
        .status(400)
        .json(new ApiError(400, null, "Please Enter comment"));
    }
    comment.content = content;
    await comment.save();
    return res
      .status(200)
      .json(new ApiResponse(200, comment, "Comment updated successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.query;

    if (!isValidObjectId(commentId)) {
      return res
        .status(400)
        .json(new ApiError(400, null, "Invalid comment ID"));
    }
    const isCommentExists = await Comment.findById(commentId);
    if (!isCommentExists) {
      return res.status(400).json(new ApiError(400, null, "Comment not found"));
    }
    await Comment.findByIdAndDelete(commentId);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Comment deleted successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
});

const getAllComments = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) {
      return res.status(400).json(new ApiError(400, null, "Invalid video ID"));
    }
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(400).json(new ApiError(400, null, "Video not found"));
    }
    
    const comments = await Comment.find({ video: videoId });
    console.log("Comments------>",comments);
    return res
      .status(200)
      .json(new ApiResponse(200, comments, "Comments fetched successfully"));

  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
});
export { addComment, updateComment, deleteComment, getAllComments };

import { isValidObjectId } from "mongoose";
import { Comment, Comment } from "../models/comment.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler.js";

const addComment = asyncHandler(async (req,res)=>{
    try {  

        const {content} = req.body;
        const {videoId} = req.params;

       if(videoId && isValidObjectId(videoId)){
        return res.status(400).json(new ApiError(400, null, "Invalid video ID"));
       }
       
       if(!content){
        return res.status(400).json(new ApiError(400,null,"Please Enter comment"));
       }
       const postComment = await Comment.create({
        content,
        video:videoId,
        owner:req.user._id
       });
       postComment.save();
       return res.status(200).json(new )
    } catch (error) {
        console.log(error)
        throw new ApiError(500,"Internal server error")
    }
})

export {addComment}
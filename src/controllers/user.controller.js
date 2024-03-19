import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../services/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//Register Controller
const registerUser = asyncHandler( async (req,res,next)=>{
    
    const {userName, fullName, email, password} = req.body

    //get file path from req
    const avatarLocalPath = req.files?.avatar;
    const coverImageLocalPath = req.files?.coverImage;

    if(
        [fullName, email, password, userName].some((field)=>field?.trim() === "")
    ){
        throw new ApiError(400,"Full Name is Required")
    }

    const existedUser = await User.findOne({
        $or: [{userName},{email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or userName already exists!")
    }
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    //upload files on cloudinary
    const avatar= await uploadOnCloudinary(avatarLocalPath[0]?.path);
    // const coverImage = await uploadOnCloudinary(coverImageLocalPath[0]?.path);
    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        email,
        avatar: avatar.url,
        coverImage:  "",
        email,
        password,
        userName : userName.toLowerCase(),
        password
    })

   const createdUser =  await User.findById(user._id).select(
    "-password -refreshToken"
   )

   if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering a user")
   }

   res.status(200).json(
    new ApiResponse(200, createdUser, "User Registered Successfully!")
   )
})

const login = asyncHandler(async (req,res,next)=>{
    res.status(200).send({
        message:"hello World"
    })
})

export {registerUser, login}
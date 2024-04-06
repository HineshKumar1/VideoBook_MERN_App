import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    videoFile:{
        type:String,
        required: true,
    },
    thumbnail:{
        type: String,
        required:true,
    },
    title:{
        type: String,
        required:true,
    },
    description:{
        type: String
    },
    duration:{
        type: Number,
    },
    views:{
        type: Number,
        default:0
    },
    isPublished:{
        type: Boolean,
        default:true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId
    }
},{
    timestamps: true
})

export const video = mongoose.model("Video",videoSchema)
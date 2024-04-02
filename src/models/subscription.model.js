import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    subscriber:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User" //one who is subscribing
    },
    subscriber:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User" //one who is subscribing
    },
    
},{timestamps:true})

export const subscription = mongoose.model("Subscription",subscriptionSchema)
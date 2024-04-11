import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "20kb"}));
app.use(express.urlencoded({extended:true, limit:"100kb"}));
app.use(express.static("public"));
app.use(cookieParser())

//routes import
import userRouter from "../src/routes/user.route.js";
import subscriptionRoute from "../src/routes/subscription.route.js"
import videoRouter from "../src/routes/video.route.js";
import commentRouter from "../src/routes/comment.route.js";
import likeRouter from "../src/routes/like.route.js";

//route destination
app.use("/api/v1/users",userRouter);
app.use("/api/v1/subscriptions",subscriptionRoute);
app.use("/api/v1/videos",videoRouter);
app.use("/api/v1/comments",commentRouter);
app.use("/api/v1/likes",likeRouter);


export default app;
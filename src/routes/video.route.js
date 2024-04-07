    import { Router } from "express";
    import { upload } from "../middlewares/multer.middleware.js";
    import { verifyJWT } from "../middlewares/auth.middleware.js";
    import { getVideoById, publishVideo, updateVideo } from "../controllers/video_controller.js";

    const router = Router();

    router.route("/upload-video").post(verifyJWT,upload.fields([
        {
        name: "videoFile",
        maxCount: 1,
        },
        {
        name: "thumbnail",
        maxCount: 1,
        },
    ]),publishVideo)

    router.route("/get-video/:videoId").get(getVideoById);
    router.route("/update-video/:videoId").put(verifyJWT,upload.single("thumbnail"),updateVideo);
    export default router;

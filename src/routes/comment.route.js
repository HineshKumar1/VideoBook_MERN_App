import { Router } from "express";
import { addComment, deleteComment, getAllComments, updateComment } from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add-comment/:videoId").post(verifyJWT, addComment);
router.route("/update-comment").patch(verifyJWT, updateComment);
router.route("/delete-comment").delete(verifyJWT, deleteComment);
router.route ("/get-all-comments/:videoId").get(verifyJWT, getAllComments);
export default router;

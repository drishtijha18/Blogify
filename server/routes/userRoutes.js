import express from "express";
import { getUserBlogs, getAllComments, getUserDashboard, deleteCommentById, approveCommentById, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.get("/blogs", auth, getUserBlogs);
userRouter.get("/comments", auth, getAllComments);
userRouter.get("/dashboard", auth, getUserDashboard);
userRouter.post("/delete-comment", auth, deleteCommentById);
userRouter.post("/approve-comment", auth, approveCommentById);
userRouter.get("/profile", auth, getUserProfile);
userRouter.post("/update-profile", auth, upload.single('profilePhoto'), updateUserProfile);

export default userRouter;

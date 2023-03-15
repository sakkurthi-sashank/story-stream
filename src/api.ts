import express, { IRouter } from "express";
import { createLike, deleteLike } from "./service/likesService";
import {
  isAuthenticated,
  login,
  register,
  verifyUser,
  deleteUser,
} from "./service/authService";
import {
  createComment,
  deleteComment,
  updateComment,
} from "./service/commentService";
import {
  createPost,
  getLatestPosts,
  getHashSpecificPosts,
  getUserSpecificPosts,
  updatePost,
  deletePost,
} from "./service/postService";

const router: IRouter = express.Router();

// posts get routers
router.get("/get-posts/", isAuthenticated, getLatestPosts);
router.get("/get-posts/:hashId/", isAuthenticated, getHashSpecificPosts);
router.get("/get-user-posts/:userId/", isAuthenticated, getUserSpecificPosts);

// authentication post router
router.post("/login-user/", login);
router.post("/register-user/", register);
router.post("/verify-user/", isAuthenticated, verifyUser);
router.post("/delete-user/", isAuthenticated, deleteUser);

// posts post router
router.post("/create-post/", isAuthenticated, createPost);
router.post("/update-post/", isAuthenticated, updatePost);
router.post("/delete-post/", isAuthenticated, deletePost);

// comment post router
router.post("/create-comment/", isAuthenticated, createComment);
router.post("/delete-comment/", isAuthenticated, deleteComment);
router.post("/update-comment/", isAuthenticated, updateComment);

// like post router
router.post("/create-like/", isAuthenticated, createLike);
router.post("/delete-like/", isAuthenticated, deleteLike);

export default router;

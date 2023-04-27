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

router.use(isAuthenticated);

// posts get routers
router.get("/get-posts/", getLatestPosts);
router.get("/get-posts/:hashId/", getHashSpecificPosts);
router.get("/get-user-posts/:userId/", getUserSpecificPosts);

// authentication post router
router.post("/login-user/", login);
router.post("/register-user/", register);
router.post("/verify-user/", verifyUser);
router.post("/delete-user/", deleteUser);

// posts post router
router.post("/create-post/", createPost);
router.post("/update-post/", updatePost);
router.post("/delete-post/", deletePost);

// comment post router
router.post("/create-comment/", createComment);
router.post("/delete-comment/", deleteComment);
router.post("/update-comment/", updateComment);

// like post router
router.post("/create-like/", createLike);
router.post("/delete-like/", deleteLike);

export default router;

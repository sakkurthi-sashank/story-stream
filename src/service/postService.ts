import {
  CreatePost,
  DeletePost,
  LatestPosts,
  PostByHash,
  UpdatePost,
  UserSpecificPosts,
} from "../repository/postRepository";
import { Request, Response } from "express";

export const createPost = async (req: Request, res: Response) => {
  const { userId, content }: { userId: string; content: string } = req.body;
  try {
    const post = await CreatePost(userId, content);
    res.status(201).json({ post: post });
  } catch (error) {
    res.sendStatus(400);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { hash, content }: { hash: string; content: string } = req.body;
  try {
    const post = await UpdatePost(hash, content);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const hash: string = req.body.hash;
  try {
    const post = DeletePost(hash);
    res.status(200).json({ post: post });
  } catch (error) {
    res.sendStatus(400);
  }
};

export const getLatestPosts = async (req: Request, res: Response) => {
  try {
    const posts = await LatestPosts();
    res.status(200).json({ posts: posts });
  } catch (error) {
    res.status(400).json({ error: "unable to get posts" });
  }
};

export const getHashSpecificPosts = async (req: Request, res: Response) => {
  const hash = req.params.hashId;
  if (!hash) {
    res.status(400).json({ error: "Post not founded" });
  } else {
    try {
      const posts = await PostByHash(hash);
      res.status(200).json({ post: posts });
    } catch (error) {
      res.status(400).json({ error: "Post not founded" });
    }
  }
};

export const getUserSpecificPosts = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  if (!userId) {
    res.status(400).json({ error: "User Posts not founded" });
  } else {
    try {
      const posts = await UserSpecificPosts(userId);
      res.status(200).json({ post: posts });
    } catch (error) {
      res.status(400).json({ error: "User Posts not founded" });
    }
  }
};

import { Request, Response } from "express";
import { CreateLike, DeleteLike } from "../repository/likeRepository";

export const createLike = async (req: Request, res: Response) => {
  const { userId, postId }: { userId: string; postId: string } = req.body;
  try {
    const like = await CreateLike(postId, userId);
    res.status(201).json({ like: like });
  } catch (error) {
    res.sendStatus(400);
  }
};

export const deleteLike = async (req: Request, res: Response) => {
  const hash: string = req.body.hash;
  try {
    const like = await DeleteLike(hash);
    res.status(201).json({ like: like });
  } catch (error) {
    res.sendStatus(400);
  }
};

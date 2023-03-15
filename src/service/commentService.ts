import { Request, Response } from "express";
import {
  CreateComment,
  DeleteComments,
  UpdateComment,
} from "../repository/commentRepository";

export const createComment = async (req: Request, res: Response) => {
  const {
    userId,
    postId,
    content,
  }: { userId: string; postId: string; content: string } = req.body.userId;
  try {
    const comment = await CreateComment(postId, userId, content);
    res.status(201).json({ comment: comment });
  } catch (error) {
    res.sendStatus(400);
  }
};

export const updateComment = async (req: Request, res: Response) => {
  const { hash, content }: { hash: string; content: string } = req.body.hash;
  try {
    const comment = await UpdateComment(hash, content);
    res.status(201).json({ comment: comment });
  } catch (error) {
    res.sendStatus(400);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const hash: string = req.body.hash;
  try {
    const deleted = await DeleteComments(hash);
    res.status(200).json({ deleted: deleted });
  } catch (error) {
    res.sendStatus(400);
  }
};

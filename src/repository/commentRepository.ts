import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateComment = async (
  postId: string,
  userId: string,
  content: string
) => {
  return prisma.comments.create({
    data: {
      postId: postId,
      userId: userId,
      comment: content,
    },
    select: {
      hash: true,
      comment: true,
      postId: true,
      userId: true,
      createdAt: true,
    },
  });
};

export const UpdateComment = async (hash: string, content: string) => {
  return await prisma.comments.update({
    where: { hash: hash },
    data: {
      comment: content,
    },
    select: {
      hash: true,
      comment: true,
      postId: true,
      userId: true,
    },
  });
};

export const DeleteComments = async (hash: string) => {
  return prisma.comments.delete({
    where: {
      hash: hash,
    },
    select: {
      hash: true,
    },
  });
};

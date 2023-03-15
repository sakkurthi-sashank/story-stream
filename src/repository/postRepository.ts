import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreatePost = async (userId: string, content: string) => {
  return await prisma.posts.create({
    data: {
      userId: userId,
      content: content,
    },
    select: {
      hash: true,
      content: true,
      publish: true,
      createdAt: true,
    },
  });
};

export const UpdatePost = async (hash: string, content: string) => {
  return await prisma.posts.update({
    where: {
      hash: hash,
    },
    data: {
      content: content,
    },
    select: {
      hash: true,
      content: true,
    },
  });
};

export const DeletePost = async (hash: string) => {
  return await prisma.posts.delete({
    where: {
      hash: hash,
    },
    select: {
      hash: true,
    },
  });
};

export const LatestPosts = async () => {
  return await prisma.posts.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
    select: {
      hash: true,
      publish: true,
      content: true,
      user: {
        select: {
          first_name: true,
          last_name: true,
          email: true,
          hash: true,
        },
      },
      createdAt: true,
      like: {
        select: {
          userId: true,
          postId: true,
          createdAt: true,
          hash: true,
        },
      },
      comments: {
        select: {
          comment: true,
          createdAt: true,
          hash: true,
          user: {
            select: {
              first_name: true,
              last_name: true,
              hash: true,
              email: true,
            },
          },
        },
      },
    },
  });
};

export const PostByHash = async (hash: string) => {
  return await prisma.posts.findUnique({
    where: {
      hash: hash,
    },
    select: {
      hash: true,
      publish: true,
      content: true,
      user: {
        select: {
          first_name: true,
          last_name: true,
          email: true,
          hash: true,
        },
      },
      createdAt: true,
      like: {
        select: {
          userId: true,
          postId: true,
          createdAt: true,
          hash: true,
        },
      },
      comments: {
        select: {
          comment: true,
          createdAt: true,
          hash: true,
          user: {
            select: {
              first_name: true,
              last_name: true,
              hash: true,
              email: true,
            },
          },
        },
      },
    },
  });
};

export const UserSpecificPosts = async (userId: string) => {
  return await prisma.posts.findMany({
    where: {
      userId: userId,
    },
    select: {
      hash: true,
      publish: true,
      content: true,
      user: {
        select: {
          first_name: true,
          last_name: true,
          email: true,
          hash: true,
        },
      },
      createdAt: true,
      like: {
        select: {
          userId: true,
          postId: true,
          createdAt: true,
          hash: true,
        },
      },
      comments: {
        select: {
          comment: true,
          createdAt: true,
          hash: true,
          user: {
            select: {
              first_name: true,
              last_name: true,
              hash: true,
              email: true,
            },
          },
        },
      },
    },
  });
};

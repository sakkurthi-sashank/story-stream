import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const RegisterData = async (
  firstName: string,
  lastName: string,
  email: string,
  hashPassword: string
) => {
  return await prisma.users.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: hashPassword,
    },
    select: {
      first_name: true,
      last_name: true,
      email: true,
    },
  });
};

export const LoginData = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email: email },
    select: {
      email: true,
      password: true,
      hash: true,
    },
  });
};

export const VerifyData = async (email: string) => {
  return await prisma.users.findUnique({
    where: {
      email: email,
    },
    select: {
      first_name: true,
      last_name: true,
      email: true,
      hash: true,
    },
  });
};

export const DeleteUserData = async (hash: string) => {
  prisma.users.delete({
    where: {
      hash: hash,
    },
  });
};

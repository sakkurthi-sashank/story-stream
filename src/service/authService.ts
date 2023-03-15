import { NextFunction, Request, Response } from "express";
import {
  DeleteUserData,
  LoginData,
  RegisterData,
  VerifyData,
} from "../repository/authRepository";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

// register new user
export const register = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    password,
  }: { firstName: string; lastName: string; email: string; password: string } =
    req.body;

  const hashPassword: string = await bcrypt.hash(password, 10);
  try {
    const user = await RegisterData(firstName, lastName, email, hashPassword);
    res.status(201).json({ user: user });
  } catch (error) {
    res.sendStatus(400);
  }
};

// login user
export const login = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const user = await LoginData(email);
    if (!user) {
      res.sendStatus(401);
    } else {
      const compareHashPassword = await bcrypt.compare(
        password,
        user?.password!
      );
      if (compareHashPassword) {
        const payload: { hash: string; email: string } = {
          hash: user?.hash,
          email: user?.email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
          algorithm: "HS256",
          expiresIn: "1hr",
        });
        res.status(200).json({ token: token });
      } else {
        res.sendStatus(401);
      }
    }
  } catch (error) {
    res.sendStatus(401);
  }
};

//verify user
export const verifyUser = async (req: Request, res: Response) => {
  const token: string | undefined = req.headers.authorization;
  const userToken = await jwt.verify(token!, process.env.JWT_SECRET!);
  const email: string = (userToken as JwtPayload).email;
  const user = await VerifyData(email);

  res.status(200).json({ user: user });
};

// check user is authenticated
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.headers.authorization;
  if (!token) {
    res.sendStatus(401);
  } else {
    try {
      const userToken = await jwt.verify(token!, process.env.JWT_SECRET!);
      if (userToken) {
        next();
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      res.sendStatus(401);
    }
  }
};

// delete user data
export const deleteUser = async (req: Request, res: Response) => {
  const hash = req.body.hash;
  try {
    await DeleteUserData(hash);
    res.status(200);
  } catch (error) {
    res.status(400);
  }
};

import { type Request, type Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/users";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized token" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET!, async (error, decodedToken) => {
    if (
      error ||
      !decodedToken ||
      typeof decodedToken === "string" ||
      !(await User.exists({ _id: decodedToken.userId }))
    ) {
      res.status(401).json({ message: "Unothorized action" });
      return;
    }
    req.userId = await decodedToken.userId;

    next();
  });
};

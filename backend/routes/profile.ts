import { Router, type Request, type Response } from "express";

import { authenticate } from "../middleware/authenticate";
import { User } from "../models/users";

const getProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    if (!userId) {
      res.status(400).json({ message: "missing user id" });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    res.status(200).json({
      username: user.username,
      id: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

export const profileRouter = Router();

profileRouter.get("/profile", authenticate, getProfile);

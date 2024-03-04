import { Router, NextFunction, Request, Response } from "express";

import {
  createUser,
  logInUser,
  getUserById,
  updateUser,
} from "../services/userServices";
import User from "../models/userModels";
import {
  UserLogInPayloadType,
  UserRegisterPayloadType,
  UserType,
} from "../types";
import { getAuthToken, verifyAccessToken } from "../middlwares/authToken";
import index from "../types/express/index";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  //validate email format
  const payload = req.body as UserRegisterPayloadType;
  if (!payload.email || !payload.fullName || !payload.password) {
    res.status(400).json("Missing required parameter");
  } else {
    try {
      const existingUser = await User.findOne({ email: payload.email });
      if (existingUser) {
        res.status(401).json("Email address not available!");
      } else {
        const user = await createUser(payload);
        req["user"] = user;
        getAuthToken(req, res);
      }
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  }
});

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body as UserLogInPayloadType;
    if (!payload.email || !payload.password) {
      res.status(400).json("Missing required parameter");
    } else {
      const userData = await logInUser(payload);
      if (typeof userData === "object" && userData.email) {
        req["user"] = userData;
        getAuthToken(req, res);
      } else {
        res.status(403).json("Invalid email/password");
      }
    }
  }
);

router.get(
  "/:userId",
  verifyAccessToken,
  async (req: Request, res: Response) => {
    const userId = req.params.userId;

    if (!userId) {
      res.status(400).send("Bad request");
    }
    const user = await getUserById(userId);
    res.status(200).json(user);
  }
);

router.put(
  "/:userId",
  verifyAccessToken,
  async (req: Request, res: Response) => {
    const userId = req.params.userId;

    if (!userId) {
      res.status(400).send("Bad request");
    }
    if (userId !== req["user"]?.id) {
      res.status(403).send("Unauthorized");
    }
    try {
      const udpatedData = await updateUser(userId, req.body);
      res.status(200).json(udpatedData);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  }
);

export default router;

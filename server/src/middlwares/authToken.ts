import { Router, NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

import { JWT_SECRET } from "../util/secret";
import { DecodedRefreshToken, UserType } from "../types";
import User from "../models/userModels";

const generateAccessToken = async (user: UserType): Promise<string> => {
  return jwt.sign(
    {
      email: user.email,
      isLoggedIn: true,
      id: user.id,
    },
    JWT_SECRET as Secret,
    {
      expiresIn: "2hrs",
    }
  );
};

export const generateRefreshToken = async (user: UserType): Promise<string> => {
  const token = jwt.sign(
    {
      email: user.email,
    },
    JWT_SECRET as Secret,
    {
      expiresIn: "1d",
    }
  );
  user.refreshToken = token;
  await User.findOneAndUpdate({ email: user.email }, user);

  return token;
};

export const getAuthToken = async (req: Request, res: Response) => {
  try {
    const user = req["user"] as UserType;

    // Await the generation of the access token
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    res
      .status(200)
      .json({ email: user.email, accessToken, refreshToken, isLoggedIn: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "") || "";

  try {
    if (!token || typeof token !== "string") {
      return res.status(403).send("Access denied: Invalid token format");
    }

    jwt.verify(
      token,
      JWT_SECRET as Secret,
      async function (err: any, decoded: any) {
        try {
          if (err) {
            // Handle JWT verification error
            console.error(err);
            return res.status(403).send("Access denied: Invalid token");
          }

          if (!decoded || typeof decoded !== "object" || !decoded.email) {
            // Handle the case where 'decoded' is undefined, not an object, or does not have 'email'
            return res.status(403).send("Access denied: Invalid token payload");
          }

          const user = await User.findOne({ email: decoded.email });
          if (!user) {
            return res.status(403).send("Access denied: User not found");
          }

          req["user"] = user as UserType;
          next();
        } catch (dbError) {
          console.error(dbError);
          res.status(500).send("Internal server error");
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export const handleRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refresh_token = (req.headers["refresh_token"] as string) || "";
  if (!refresh_token) {
    return res.status(401).send({ message: "Invalid refresh token" });
  }

  //verify the refresh token
  try {
    const decodedRefreshToken = jwt.verify(
      refresh_token,
      JWT_SECRET as Secret
    ) as DecodedRefreshToken;

    if (!decodedRefreshToken) {
      return res.status(401).send({ message: "Invalid refresh token" });
    }

    //check the refreshToken exist in user
    const user = await User.findOne({ email: decodedRefreshToken.email });

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    if (user.refreshToken !== refresh_token) {
      return res.status(401).send({ message: "Invalid refresh token" });
    }

    // generate access token
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    return res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(401).send({ message: error });
  }
};

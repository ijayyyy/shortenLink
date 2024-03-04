import express, { Router, NextFunction, Request, Response } from "express";

import Url from "../models/urlModels";
import {
  createUrl,
  getUrlByUrlCode,
  getUrlsForUser,
  deleteUrlByUrlCode,
  updateAndEditUrlCode,
  getCustomUrlCode,
  generateBarcode,
} from "../services/urlServices";
import { verifyAccessToken } from "../middlwares/authToken";

const router = Router();

router.post("/", verifyAccessToken, async (req: Request, res: Response) => {
  const { originalLink, customUrlCode } = req.body;

  if (originalLink) {
    try {
      let urlData = await Url.findOne({ originalLink });

      if (urlData) {
        // URL already exists, return the existing data
        return res.status(200).json(urlData);
      }
      const generatedUrlCode = customUrlCode;
      // Generate barcode data
      const barcodeData = await generateBarcode(generatedUrlCode);

      // Create a new URL with the provided data
      const data = await createUrl({
        ...req.body,
        userId: req["user"]?.id,
        customUrlCode,
        barcodeData,
      });

      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal server error");
    }
  } else {
    res.status(400).json("Missing required parameters");
  }
});

router.get("/:urlCode", async (req: Request, res: Response) => {
  const urlCode = req.params.urlCode;
  if (!urlCode) {
    return res.status(404).send("Bad request");
  }
  try {
    const data = await getUrlByUrlCode(urlCode);
    if (!data || !data.originalLink) {
      return res.status(404).send("URL not found");
    }
    res.status(301).redirect(data.originalLink);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

router.get(
  "/user/:userId",
  verifyAccessToken,
  async (req: Request, res: Response) => {
    const userId = req.params.userId;

    if (userId !== req.user?.id) {
      res.status(401).json("Access Denied");
      return;
    }

    try {
      const data = await getUrlsForUser(userId);

      if (data.length === 0) {
        return res.status(404).json("No data found for the user");
      }

      res.status(200).json(data);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json("Internal server error");
    }
  }
);

router.get(
  "/custom-code",
  verifyAccessToken,
  async (req: Request, res: Response) => {
    const customUrlCode = req.params.customUrlCode;
    try {
      const data = await getCustomUrlCode(customUrlCode);
      res.status(200).json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).json("Internal server error");
    }
  }
);

router.put(
  "/:urlCode",
  verifyAccessToken,
  async (req: Request, res: Response) => {
    const urlCode = req.params.urlCode;
    if (!urlCode) {
      res.status(400).send("Bad request");
    }
    try {
      const udpatedData = await updateAndEditUrlCode(req.body);
      res.status(200).json(udpatedData);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  }
);

router.delete(
  "/:urlCode",
  verifyAccessToken,
  async (req: Request, res: Response) => {
    const urlCode = req.params.urlCode;
    if (!urlCode) {
      res.status(400).send("Bad request");
    }
    try {
      const data = await deleteUrlByUrlCode(urlCode);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  }
);

export default router;

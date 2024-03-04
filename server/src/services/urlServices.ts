import { generate as generateUrlcode } from "generate-password";
import { error } from "console";
import { Document } from "mongoose";
import shortid from "shortid";
import { createCanvas } from "canvas";
import bwipjs from "bwip-js";

import Url from "../models/urlModels";
import { UrlPayloadType } from "../types";

export const createUrl = async (payload: UrlPayloadType) => {
  // validate here
  if (!payload.originalLink || !payload.userId) {
    throw Error("Missing required options");
  }

  try {
    let url = new Url(payload);

    // If a custom URL code is provided, use it; otherwise, generate one using shortid
    if (payload.customUrlCode) {
      url.urlCode = payload.customUrlCode;
    } else {
      let isCodeUnique = false;
      let generatedUrlCode;

      // Loop until a unique URL code is generated
      while (!isCodeUnique) {
        generatedUrlCode = shortid.generate();

        // Check if the generated code is unique
        const existingUrl = await Url.findOne({ urlCode: generatedUrlCode });
        isCodeUnique = !existingUrl;
      }

      url.urlCode = generatedUrlCode as string;

      const barcodeData = await generateBarcode(url.urlCode); // Use the URL code or any other data you want in the barcode

      url.barcodeData = barcodeData;
    }

    url = await url.save();
    return url;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

export const getUrlByUrlCode = async (urlCode: string) => {
  try {
    let data = await Url.findOne({ urlCode });
    if (!data) throw Error("Bad request");
    data.visitCount = data.visitCount + 1;
    return await Url.findOneAndUpdate({ urlCode: urlCode }, data, {
      new: true,
    });
  } catch (error) {
    console.log(error);
    Error();
  }
};

export const generateBarcode = async (data: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer(
      {
        bcid: "code128", // Barcode type
        text: data, // Data to encode (URL code, in this case)
        scale: 3, // Scaling factor for the barcode
        height: 20, // Height of the barcode
        includetext: true,
      },
      (err, png) => {
        if (err) {
          reject(err);
        } else {
          resolve(`data:image/png;base64,${png.toString("base64")}`);
        }
      }
    );
  });
};

type UrlType = {
  // Define the structure of your URL model
  urlCode: string;
  name: string;
  originalLink: string;
  // ... other fields
};

export const updateAndEditUrlCode = async (payload: Partial<UrlType>) => {
  if (!payload.urlCode) throw Error("Invalid urlCode");

  try {
    const existingUrl = await Url.findOne({ urlCode: payload.urlCode });

    if (!existingUrl) {
      throw Error("URL not found");
    }

    // Editable column restriction
    const editableColumns: Array<keyof UrlType> = ["name", "originalLink"];

    // Update the fields specified in the payload
    editableColumns.forEach((key) => {
      if (payload[key] !== undefined) {
        // Check for undefined before updating
        existingUrl[key] = payload[key] as UrlType[keyof UrlType];
      }
    });

    // Save the updated document
    const updatedUrl = await existingUrl.save();
    return updatedUrl;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to propagate it
  }
};

export const getUrlsForUser = async (userId: string) => {
  try {
    const urls = await Url.find({ userId: userId }).exec();
    console.log("urls:", urls);
    return urls;
  } catch (error) {
    throw new Error("Internal servers error");
  }
};

export const getCustomUrlCode = async (customUrlCode: string) => {
  try {
    const customUrls = await Url.find({ customUrlCode: customUrlCode });
    if (!customUrls || customUrls.length === 0) {
      throw new Error("Custom URL not found");
    }
    return customUrls;
  } catch (error) {
    throw new Error("Internal servers error");
  }
};

export const deleteUrlByUrlCode = async (urlCode: string) => {
  try {
    const deleted = await Url.deleteOne({ urlCode });
    return "Deleted successfully";
  } catch (error) {
    console.log(error);
    Error();
  }
};

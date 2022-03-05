import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import asyncHandler from "express-async-handler";

export const uploadImageController = asyncHandler(async (req, res) => {

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "upload-image2",
    }
  );

  return res.status(200).json({image:result.secure_url})
});

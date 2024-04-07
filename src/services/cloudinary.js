import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

const deleteOnCloudinary = async (url, resource_type) => {
  try {
    const publicId = await url.split("/").pop().split(".")[0];
    console.log(publicId);
    await cloudinary.api
      .delete_resources([publicId], { type: "upload", resource_type: resource_type })
      .then(console.log);
  } catch (error) {
    console.log(error);
  }
};

export { uploadOnCloudinary, deleteOnCloudinary};

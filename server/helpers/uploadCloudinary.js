const cloudinary = require("cloudinary");
const fs = require("fs");

const cloudinaryKey = process.env.CLOUDINARY_API_KEY
const cloudinarySecret = process.env.CLOUDINARY_API_SECRET

const uploadAudio = async (file) => {
  try {

    const { path } = file;
    const fName = new Date() + file.originalname.split(".")[0]
    cloudinary.config({
      cloud_name: "mrsnputra",
      api_key: cloudinaryKey,
      api_secret: cloudinarySecret,
    });
    const resp = await cloudinary.v2.uploader.upload(path, {
      resource_type: "raw",
      public_id: `AudioUploads/${fName}`,
    });
    return resp.url;
  } catch (err) {
    throw err;
  }
};

module.exports = uploadAudio;

const cloudinary = require("cloudinary");
const fs = require("fs");
const uploadAudio = async (file) => {
  try {

    const { path } = file;
    const fName = new Date() + file.originalname.split(".")[0] 
    cloudinary.config({
      cloud_name: "mrsnputra",
      api_key: "198126765278442",
      api_secret: "rGovGck73LODNcl51VuGAgTXKmw",
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

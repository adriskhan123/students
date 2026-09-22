
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "pqr0rlcx",
  api_key: "869635632276463",
  api_secret: "gPTPMbnox08dQPE6TTkJ0bG0HTo",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "uploads",
  },
});

const upload = multer({
  storage: storage,
});

export default upload;


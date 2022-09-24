const multer = require("multer");

const path = require("path");

const storagePath = path.resolve("./tmp");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storagePath);
  },
  filename: (req, file, cb) => {
    const [originalname, extension] = file.originalname.split(".");
    cb(null, `${originalname}.${extension}`);
  },
});

const avatarMiddleware = multer({ storage });

module.exports = { avatarMiddleware };

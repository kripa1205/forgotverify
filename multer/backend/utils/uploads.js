const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.body.folder;
    const uploadpath = path.join(__dirname, "..", "assets", folder);
    if (!fs.existsSync(uploadpath)) {
      fs.mkdirSync(uploadpath, { recursive: true });
    }
    cb(null, uploadpath);
  },

  filename: (req, file, cb) => {
    const uniquename = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquename + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const validTypes = /jpeg|jpg|png|gif|pdf/;
  const extValid = validTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeValid = validTypes.test(file.mimetype);
  if (extValid && mimeValid) return cb(null, true);
  cb(new Error("Only image files are allowed!"));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload

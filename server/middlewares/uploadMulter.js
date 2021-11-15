const multer = require('multer')
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileExt = file.originalname.split(".").pop();
    const filename = `${new Date().getTime()}.${fileExt}`;
    cb(null, filename);
  },
})

const upload = multer({ 
  storage,
  limits: {
    fieldNameSize: 200,
    fileSize: 5 * 1024 * 1024,
  }
})

const uploadBuffer = multer({
  storage: multer.memoryStorage(), limits: {
    fieldSize: 10000000
  }
});

module.exports = { upload, uploadBuffer }
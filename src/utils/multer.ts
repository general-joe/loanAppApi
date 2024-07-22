import { Request } from "express";
import multer from "multer";
import path from "path";

// Multer config
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

export default upload;

import { Request } from "express";
import multer from "multer";
import { fileName, uploadDir } from "../Constants";

const storage = multer.diskStorage({
  destination: uploadDir + "/",
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, fileName);
  },
});

export const upload = multer({ storage });

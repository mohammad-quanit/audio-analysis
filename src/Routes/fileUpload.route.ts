import { Router } from "express";
import fileUploadController from "../Controller/fileUpload.controller";
import { upload } from "../utils/multer";

const router = Router();

router.post("/file-upload", upload.single("file"), fileUploadController);

export default router
import { Request, Response } from "express";
import assetsCopied from "../utils/copyFile";
import { fileFrameCountExtract } from "../Service/fileExtract.service";

const fileUploadController = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "File path not provided" });
  }

  if (assetsCopied()) {
    try {
      const frameCount = await fileFrameCountExtract();
      res.status(200).json({ frameCount });
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}

export default fileUploadController;

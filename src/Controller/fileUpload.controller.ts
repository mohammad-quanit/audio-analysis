import { Request, Response } from "express";
import assetsCopied from "../utils/copyFile";
import { fileFrameCountExtract } from "../Service/fileExtract.service";

// Controller function for handling file uploads
const fileUploadController = async (req: Request, res: Response): Promise<void> => {
  // Check if file exists in the request
  if (!req.file) {
    res.status(400).json({ error: "File path not provided" });
    return; // Terminate the function early if no file is provided
  }

  // Check if assets /file are already copied
  if (assetsCopied()) {
    try {
      // Extract the frame count from the uploaded file using a service function
      const frameCount = await fileFrameCountExtract();
      if(!frameCount) {
        res.status(200).json({ frameCount: "No Frame Counts found!" })
        return
      }
      res.status(200).json({ frameCount }); // Send the extracted frame count in the response
    } catch (error) {
      console.log(error)
      res.status(500).json({ error }); // Handle any errors occurred during frame extraction
    }
  }
}


export default fileUploadController;

import MediaInfoFactory from "mediainfo.js";
import { getFileSize, readChunk } from "../utils/helpers";
import { mediaFormat } from "../Constants";

// Function to extract frame count from a media file
export const fileFrameCountExtract = async (): Promise<number | undefined> => {
  try {
    // Creating a MediaInfo instance with specified format
    const mi = await MediaInfoFactory({ format: mediaFormat });

    // Analyzing the file data using helper functions to get file size and read chunks
    const result = await mi.analyzeData(getFileSize, readChunk);

    // Closing the MediaInfo instance after analysis
    await mi.close();

    // Parsing the result JSON to extract frame count
    const frameCount: number | undefined = Number(
      JSON.parse(result).media.track[1]["FrameCount"]
    );

    // If frame count exists, return it;
    if (frameCount) return frameCount;
  } catch (error) {
    throw new Error("Error analyzing file");
  }
};

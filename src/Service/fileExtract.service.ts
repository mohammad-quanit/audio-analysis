import MediaInfoFactory from "mediainfo.js";
import { getFileSize, readChunk } from "../utils/helpers";
import { mediaFormat } from "../Constants";

export const fileFrameCountExtract = async (): Promise<string> => {
  try {
    const mi = await MediaInfoFactory({ format: mediaFormat });
    const result = await mi.analyzeData(getFileSize, readChunk);
    await mi.close();
    
    const frameCount: string = JSON.parse(result).media.track[1]["FrameCount"];
    
    return frameCount;
  } catch (error) {
    throw new Error("Error analyzing file")
  }
};
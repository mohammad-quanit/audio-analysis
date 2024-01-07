import MediaInfoFactory from "mediainfo.js";
import { getFileSize, readChunk } from "../utils/helpers";
import { mediaFormat } from "../Constants";

export const fileFrameCountExtract = async (): Promise<number | undefined> => {
  try {
    const mi = await MediaInfoFactory({ format: mediaFormat });
    const result = await mi.analyzeData(getFileSize, readChunk);
    await mi.close();

    const frameCount: number | undefined = Number(
      JSON.parse(result).media.track[1]["FrameCount"]
    );

    if (frameCount) return frameCount;
    throw new Error("No FrameCounts found!");
  } catch (error) {
    throw new Error("Error analyzing file");
  }
};

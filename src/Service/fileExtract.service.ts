import * as fs from "fs";
import MediaInfoFactory from "mediainfo.js";
import { resolve } from "path";
import { fileName, mediaFormat } from "../Constants";

const audioFilePath: string = resolve(__dirname, "../", fileName);

export const fileFrameCountExtract = async () => {
  try {
    const mi = await MediaInfoFactory({ format: mediaFormat });
    const result = await mi.analyzeData(getFileSize, readChunk);
    await mi.close();
    
    const frameCount = JSON.parse(result).media.track[1]["FrameCount"];
    
    return frameCount;
  } catch (error) {
    throw new Error("Error analyzing file")
  }
};

function getFileSize(): number {
  return fs.statSync(audioFilePath).size;
}

function readChunk(chunkSize: number, offset: number): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(audioFilePath, {
      start: offset,
      end: offset + chunkSize, // Calculate end position for chunk
    });

    const chunks: (string | Buffer)[] = [];

    fileStream.on("data", (chunk) => {
      chunks.push(chunk);
    });

    fileStream.on("error", (error) => {
      reject(error);
    });

    fileStream.on("end", () => {
      const buffer = Buffer.concat(chunks as readonly Uint8Array[]);
      resolve(new Uint8Array(buffer));
    });
  });
}

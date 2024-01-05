import { createReadStream, statSync } from "fs";
import { resolve } from "path";
import { fileName } from "../Constants";

const audioFilePath: string = resolve(__dirname, "../", fileName);

export const getFileSize = (): number => {
  return statSync(audioFilePath).size;
}

export const readChunk = (chunkSize: number, offset: number): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    const fileStream = createReadStream(audioFilePath, {
      start: offset,
      end: offset + chunkSize, // Calculate end position for chunk
    });

    const chunks: (string | Buffer)[] = [];

    fileStream.on("data", (chunk: string | Buffer) => {
      chunks.push(chunk);
    });

    fileStream.on("error", (error: Error) => {
      reject(error);
    });

    fileStream.on("end", () => {
      const buffer = Buffer.concat(chunks as readonly Uint8Array[]);
      resolve(new Uint8Array(buffer));
    });
  });
}

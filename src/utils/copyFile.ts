import { existsSync, mkdirSync, copyFileSync } from "fs";
import { join } from "path";
import { fileName, uploadDir } from "../Constants";

// Source directory where MP3 file resides
const sourceDirectory: string = uploadDir;

// Destination directory where we copy the MP3 file
const destinationDirectory: string = "dist";

// MP3 file name
const mp3FileName: string = fileName;

// Paths to source and destination files
const sourceFile: string = join(sourceDirectory, mp3FileName);
const destinationFile: string = join(destinationDirectory, mp3FileName);

// This function make sure that it copies the files into compiled "dist" folder
export default function assetsCopied(): boolean {
  let isCopied: boolean = false;

  // Check if the source file exists
  if (existsSync(sourceFile)) {
    // Create the destination directory if it doesn't exist
    if (!existsSync(destinationDirectory)) {
      mkdirSync(destinationDirectory);
    }

    // Copy the file
    copyFileSync(sourceFile, destinationFile);
    console.log(`${mp3FileName} copied to ${destinationDirectory}`);
    isCopied = true;
  } else {
    console.error(`${mp3FileName} not found in ${sourceDirectory}`);
    isCopied = false;
  }

  return isCopied;
}

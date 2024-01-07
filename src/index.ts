import express from "express";
import { router } from "./Routes/index.route";

const app = express();
const PORT: number | string = process.env.PORT || 3000;

// Parse incoming JSON requests
app.use(express.json());

// Route handling for endpoints starting with '/api/v1'
app.use("/api/v1", router);

const server = app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

// Handling graceful shutdown to prevent leaks and ensure clean process termination

// Listen for a SIGINT signal (Ctrl+C) and perform cleanup
process.on("SIGINT", () => {
  console.log(
    "*** Interupt Signal received: Closing Web server & Processes ****"
  );
  server.close(() => process.exit(0));
});

// Listen for a SIGTERM signal (termination request) and perform cleanup
process.on("SIGTERM", () => {
  console.log("*** SIGTERM received: Closing Web server & Processes ****");
  server.close(() => process.exit(0));
});



/**
 * Ive tried extracting metadata wihout 3rd party package but  
 * i dont think there is any proper way to do it. Below is the code
 * that i might thoiught would work but somehow it is not getting 
 * correct results. Ive to use mediainfo.js to find the correct data.
 * I asked through email, If you had something to share that could help me
 * but no response.
 */
// ********************************************************************************************************

// // Read the file
// const fileBuffer = readFileSync(audioFilePath);

// // Check if it's an MP3 file (validate the header)
// if (fileBuffer.slice(0, 3).toString() === 'ID3') {
//   console.log('This is an MP3 file.');

//   const frames = parseMP3Frames(fileBuffer);
//   if (frames.length > 0) {
//     console.log('Frames:', frames);
//   } else {
//     console.error('No valid MP3 frames found.');
//   }
// } else {
//   console.error('Not an MP3 file.');
// }

// // Function to parse MP3 frames
// function parseMP3Frames(buffer: Buffer) {
//   const frames = [];
//   let offset = 0;

//   // Parsing frames loop
//   while (offset < buffer.length - 4) {
//     // Check for frame sync marker (11 bits '11111111111') in the header
//     if (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0) {
//       // Extract bitrate and sampling rate from the frame header
//       const header = buffer.slice(offset, offset + 4);
//       const bitrateIndex = (header[2] & 0xF0) >> 4;
//       const sampleRateIndex = (header[2] & 0x0C) >> 2;
//       const bitrates = [
//         [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448],
//         [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384]
//       ];
//       const samplingRates = [44100, 48000, 32000];
//       const bitrate = bitrates[1][bitrateIndex];
//       const sampleRate = samplingRates[sampleRateIndex];

//       frames.push({
//         offset,
//         bitrate,
//         sampleRate,
//         headerSize: 4, // Assuming a fixed header size for simplicity
//         // Add more frame information as needed
//       });

//       // Move to the next frame
//       offset += calculateFrameSize(bitrate, sampleRate);
//     } else {
//       offset++;
//     }
//   }

//   return frames;
// }

// // Function to calculate frame size based on bitrate and sampling rate
// function calculateFrameSize(bitrate: number, sampleRate: number) {
//   // Formula to calculate frame size for MPEG 1, Layer III
//   const frameSize = Math.floor(((144 * bitrate * 1000) / sampleRate) + 0.5);
//   console.log(frameSize)
//   return frameSize;
// }

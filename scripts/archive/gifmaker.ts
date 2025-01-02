import { spawn } from "bun";

async function convertToGif(inputPath: string, outputPath: string) {
  try {
    const ffmpeg = spawn(["ffmpeg", [
      "-i", inputPath,
      "-vf", "fps=10,scale=480:-1:flags=lanczos",
      "-c:v", "gif",
      outputPath
    ]]);

    const success = await ffmpeg.success;
    
    if (success) {
      console.log("Conversion completed successfully!");
    } else {
      console.error("Conversion failed");
    }
  } catch (error) {
    console.error("Error during conversion:", error);
  }
}

// Example usage
const inputVideo = "input.mp4";
const outputGif = "output.gif";

convertToGif(inputVideo, outputGif);
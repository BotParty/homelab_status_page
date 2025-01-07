// mock-whisper.js

class WhisperModel {
  /**
   * @param {string} modelSize - e.g. "large-v3"
   * @param {Object} options
   * @param {string} options.device - e.g. "cuda" or "cpu"
   * @param {string} options.computeType - e.g. "float16" or "int8"
   */
  constructor(modelSize, { device, computeType }) {
    this.modelSize = modelSize;
    this.device = device;
    this.computeType = computeType;
  }

  /**
   * Simulate transcribing an audio file.
   * @param {string} audioFilePath - Path to the audio file, e.g. "audio.mp3".
   * @param {Object} options
   * @param {number} options.beamSize
   * @returns {Promise<{ segments: Array, info: Object }>}
   */
  async transcribe(audioFilePath, { beamSize }) {
    console.log(
      `Mock transcribing ${audioFilePath} with beamSize=${beamSize}, ` +
      `modelSize="${this.modelSize}", device="${this.device}", computeType="${this.computeType}"`
    );

    // Mock "info" object
    const info = {
      language: "en",            // Detected language
      language_probability: 0.98 // Probability that this language is correct
    };

    // Mock "segments"
    const segments = [
      {
        start: 0.00,
        end: 2.20,
        text: "Hello, this is a mock transcription."
      },
      {
        start: 2.20,
        end: 4.50,
        text: "Just simulating another segment here."
      }
    ];

    // Simulate a small delay like real processing
    await new Promise((resolve) => setTimeout(resolve, 500));

    return { segments, info };
  }
}

// Example usage:
(async () => {
  const modelSize = "large-v3";

  // Run on GPU with FP16
  const model = new WhisperModel(modelSize, { device: "cuda", computeType: "float16" });
  
  // (Alternatively, run with INT8 on CPU or GPU, just changing constructor args.)
  // const model = new WhisperModel(modelSize, { device: "cuda", computeType: "int8_float16" });
  // const model = new WhisperModel(modelSize, { device: "cpu", computeType: "int8" });

  // Transcribe audio
  const { segments, info } = await model.transcribe("audio.mp3", { beamSize: 5 });

  console.log(`Detected language '${info.language}' with probability ${info.language_probability}`);

  for (const segment of segments) {
    console.log(`[${segment.start.toFixed(2)}s -> ${segment.end.toFixed(2)}s] ${segment.text}`);
  }
})();

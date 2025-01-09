const example = {
  users: [
    {
      name: "Alice",
      email: "alice@example.com",
    },
    {
      name: "Bob",
      email: "bob@example.com",
    },
  ],
  playlists: [
    {
      title: "My Road Trip",
      description: "Road trip tunes",
      is_public: true,
      userIndex: 0,
    },
  ],
  tracks: [
    {
      title: "Track One",
      duration: 180,
      file_url: "http://example.com/track1.mp3",
    },
    {
      title: "Track Two",
      duration: 200,
      file_url: "http://example.com/track2.mp3",
    },
  ],
  playlistTracks: [
    { playlistIndex: 0, trackIndex: 0, position: 1 },
    { playlistIndex: 0, trackIndex: 1, position: 2 },
  ],
};

// Add interface for the transcribe return type
interface TranscribeResult {
  segments: Array<{
    start: number;
    end: number;
    text: string;
  }>;
  info: {
    language: string;
    language_probability: number;
  };
}

// Instead, import it if needed
import { WhisperModel } from "./whisperModel";

// Example usage:
(async () => {
  const modelSize = "large-v3";

  // Initialize the mock model
  const model = WhisperModel(modelSize, { device: "cpu", computeType: "int8" });

  // Transcribe audio using mock data
  const { segments, info } = await model.transcribe("audio.mp3", {
    beamSize: 5,
  });

  console.log(
    `Detected language '${info.language}' with probability ${info.language_probability}`,
  );

  for (const segment of segments) {
    console.log(
      `[${segment.start.toFixed(2)}s -> ${segment.end.toFixed(2)}s] ${segment.text}`,
    );
  }
})();

// whisperModel.test.js
const { test, expect, describe, beforeAll } = require("bun:test");
const WhisperModel = require("./whisperModel");

// Initialize the mock model before running tests
let model;

beforeAll(() => {
  const modelSize = "large-v3";
  model = WhisperModel(modelSize, { device: "cpu", computeType: "int8" });
});

describe("WhisperModel Transcription Tests", () => {
  test("transcribe should return correct segments and info", async () => {
    const { segments, info } = await model.transcribe("audio.mp3", {
      beamSize: 5,
    });

    // Check if info has correct language and probability
    expect(info).toHaveProperty("language", "en");
    expect(info).toHaveProperty("language_probability");
    expect(info.language_probability).toBeGreaterThanOrEqual(0.0);
    expect(info.language_probability).toBeLessThanOrEqual(1.0);

    // Check if segments is an array with expected length
    expect(Array.isArray(segments)).toBe(true);
    expect(segments.length).toBeGreaterThan(0);

    // Check the structure of each segment
    segments.forEach((segment) => {
      expect(segment).toHaveProperty("start");
      expect(segment).toHaveProperty("end");
      expect(segment).toHaveProperty("text");
      expect(typeof segment.start).toBe("number");
      expect(typeof segment.end).toBe("number");
      expect(typeof segment.text).toBe("string");
      expect(segment.start).toBeLessThan(segment.end);
    });
  });

  test("transcribe should handle different beam sizes", async () => {
    const beamSizes = [1, 3, 5, 10];
    for (const beamSize of beamSizes) {
      const { segments, info } = await model.transcribe("audio.mp3", {
        beamSize,
      });

      // Since this is a mock, the output doesn't change with beamSize
      // But in a real scenario, you might want to verify different behaviors
      expect(info).toHaveProperty("language", "en");
      expect(info).toHaveProperty("language_probability", 0.98);
      expect(segments.length).toBe(2);
    }
  });

  test("transcribe should return consistent mock data", async () => {
    const { segments, info } = await model.transcribe("audio.mp3");

    // Expected mock info
    expect(info).toEqual({
      language: "en",
      language_probability: 0.98,
    });

    // Expected mock segments
    expect(segments).toEqual([
      {
        start: 0.0,
        end: 2.5,
        text: "Hello, this is a test transcription.",
      },
      {
        start: 2.51,
        end: 5.0,
        text: "This is the second segment of the mock data.",
      },
    ]);
  });

  test("transcribe should handle empty audio input", async () => {
    // Modify the mock to handle empty input if necessary
    // For now, we'll assume it returns the same mock data

    const { segments, info } = await model.transcribe("");

    // Since this is a mock, it returns the same data
    // In a real implementation, you might expect different behavior
    expect(info).toHaveProperty("language", "en");
    expect(info).toHaveProperty("language_probability", 0.98);
    expect(segments.length).toBe(2);
  });
});

// models.ts

export interface User {
  userId: number;
  name: string;
  email: string;
  createdAt: Date;
}

export interface Playlist {
  playlistId: number;
  userId: number;
  title: string;
  description?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Track {
  trackId: number;
  title: string;
  duration: number; // e.g., length in seconds
  fileUrl: string; // where the audio file is located
  // optional fields like genre, artistId, albumId, etc.
}

/**
 * Many-to-many relationship table for playlists/tracks.
 * Also includes playlist order, date added, etc.
 */
export interface PlaylistTrack {
  id: number;
  playlistId: number;
  trackId: number;
  position: number;
  addedAt: Date;
}

// app.ts
import { User, Playlist, Track, PlaylistTrack } from "./models";

// Mock data
const user: User = {
  userId: 1,
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date(),
};

const playlist: Playlist = {
  playlistId: 1,
  userId: user.userId,
  title: "My Road Trip",
  isPublic: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const track: Track = {
  trackId: 101,
  title: "Track One",
  duration: 180,
  fileUrl: "http://example.com/track1.mp3",
};

const playlistTrack: PlaylistTrack = {
  id: 1001,
  playlistId: playlist.playlistId,
  trackId: track.trackId,
  position: 1,
  addedAt: new Date(),
};

console.log("User:", user);
console.log("Playlist:", playlist);
console.log("Track:", track);
console.log("PlaylistTrack Link:", playlistTrack);

export { example };

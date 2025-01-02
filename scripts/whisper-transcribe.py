#!/usr/bin/env python3
import whisper
import sys
import os

def srt_timestamp(seconds: float) -> str:
    """
    Convert a time in seconds to SRT timestamp format: HH:MM:SS,mmm
    """
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds - int(seconds)) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

def convert_segments_to_srt(segments):
    """
    Convert Whisper 'segments' (start, end, text) into SRT format.
    """
    srt_lines = []
    for i, seg in enumerate(segments):
        start = srt_timestamp(seg["start"])
        end = srt_timestamp(seg["end"])
        text = seg["text"].strip()
        
        srt_lines.append(f"{i+1}")            # Subtitle index
        srt_lines.append(f"{start} --> {end}") # Timestamp
        srt_lines.append(text)                 # Actual transcription text
        srt_lines.append("")                   # Blank line after each subtitle

    return "\n".join(srt_lines)

def main(audio_file):
    if not os.path.isfile(audio_file):
        print(f"Error: file '{audio_file}' does not exist.")
        sys.exit(1)

    # Load any Whisper model you prefer: tiny, base, small, medium, large...
    model = whisper.load_model("small")

    print("Transcribing audio, this may take a while...")

    # Transcribe
    result = model.transcribe(audio_file)
    segments = result.get("segments", [])

    # Convert to SRT
    srt_content = convert_segments_to_srt(segments)
    
    # Write SRT to a file (e.g., output.srt)
    srt_filename = os.path.splitext(audio_file)[0] + ".srt"
    with open(srt_filename, "w", encoding="utf-8") as f:
        f.write(srt_content)

    print(f"Transcription complete. SRT saved to: {srt_filename}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(f"Usage: python {sys.argv[0]} <audio_file.mp3>")
        sys.exit(1)
    main(sys.argv[1])
// JSX parts above here
import React, { Suspense, lazy } from 'react';
import { useRef, useState, useEffect } from 'react';
import {
  Room,
  RoomEvent,
  Track,
  LocalTrack,
  RoomOptions,
} from "livekit-client";

function LivekitAudio() {
  const screenShareVideo = useRef<HTMLVideoElement>(null);
  const audioElement = useRef<HTMLAudioElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  console.log('LivekitAudio - rendering blah')
  const chunks = [];
    
  const handleStopRecording = () => {
    console.log('stopping recording')
    console.log(chunks)
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  }

  function handleRecordButtonPress() {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);
  }, []);

  async function startRecording() {
    if (!audioContext) return;
    console.log('starting recording')
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.ondataavailable = (e) => chunks.push(e.data);

    recorder.onstop = () => {
      console.log('sending 5 seconds of audio to server')
      sendAudioToServer(chunks);
    };

    recorder.start();
    setIsRecording(true);
    setAudioChunks([]);

    // Stop recording after 5 seconds
    setTimeout(() => { 
      console.log('stopping recording after 5 seconds')
      stopRecording()
    }, 5000);
  }

  function stopRecording() {
    console.log('stopping recording')
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  }

  async function sendAudioToServer(chunks) {
    console.log('sendAudioToServer')
    const audioBlob = new Blob(chunks, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm');

    try {
      const response = await fetch('/api/save_audio_to_whisper', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Server response:', result);
    } catch (error) {
      console.error('Error sending audio to server:', error);
    }
    return audioBlob;
  }

  function handleButtonPress() {
    console.log('Button pressed!');
    joinRoom(screenShareVideo.current, audioElement.current);
    handleRecordButtonPress();
  }

  return (
    <div>
      <div>
        Audio
        {ENABLE_SCREEN_SHARE ? ' and screen sharing' : ''}
        {ENABLE_AUDIO_PLAYBACK ? ' with playback' : ' without playback'}
        {' with LiveKit'}
      </div>
      {ENABLE_SCREEN_SHARE && <video ref={screenShareVideo} autoPlay muted playsInline />}
      {ENABLE_AUDIO_PLAYBACK && <audio ref={audioElement} autoPlay />}
      <button onClick={handleButtonPress}>Connect to LiveKit</button>
      <br />
      <button onClick={handleStopRecording}>Stop Recording!</button>
    </div>
  );
}


// Rest of the JavaScript code below here
let Livekit = {
  Room,
  RoomEvent,
  Track,
};

const ENABLE_SCREEN_SHARE = false;
const ENABLE_AUDIO_PLAYBACK = true; // New environment variable

async function getLivekitData(identity) {
  const livekit_connect = 'livekit_connect';
  const response = await fetch('/api/livekit_connect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identity: identity || 'voice to prompt' }),
  });

  if (!response.ok) {
    console.error('Failed to connect to Livekit:', response.statusText);
    return;
  }

  const data = await response.json();
  return data;
}

async function joinRoom(not_used, audioElement) {
  let screenShareVideo = document.getElementById("screenShareVideo");
  let room = new Room();
  const liveKit_data = await getLivekitData();
  const url = "wss://omnissiah-university-kmuz0plz.livekit.cloud";

  const roomOptions: RoomOptions = {
    adaptiveStream: true,
    dynacast: true,
    publishDefaults: {
      simulcast: true,
      audioEnabled: true,
      videoEnabled: false,
    },
  };

  await room.connect(url, liveKit_data.token, roomOptions);
  takeScreenshot();

  room.on(
    RoomEvent.TrackSubscribed,
    (track, publication, participant) => {
      if (
        track.kind === Track.Kind.Video &&
        track.source === Track.Source.ScreenShare
      ) {
        track.attach(screenShareVideo);
      }
    },
  );

  room.on(
    RoomEvent.TrackUnsubscribed,
    (track, publication, participant) => {
      if (
        track.kind === Track.Kind.Video &&
        track.source === Track.Source.ScreenShare
      ) {
        track.detach(screenShareVideo);
      }
    },
  );

  room.on(RoomEvent.LocalTrackPublished, (publication, participant) => {
    if (publication.kind === Track.Kind.Video && publication.source === Track.Source.ScreenShare) {
      publication.track.attach(screenShareVideo);
    } else if (publication.kind === Track.Kind.Audio && ENABLE_AUDIO_PLAYBACK) {
      publication.track.attach(audioElement);
    }
  });

  room.on(RoomEvent.LocalTrackUnpublished, (publication, participant) => {
    if (publication.kind === Track.Kind.Video && publication.source === Track.Source.ScreenShare) {
      publication.track.detach(screenShareVideo);
    } else if (publication.kind === Track.Kind.Audio && ENABLE_AUDIO_PLAYBACK) {
      publication.track.detach(audioElement);
    }
  });

  await toggleMicrophone(room);
  
  if (ENABLE_SCREEN_SHARE) {
    await toggleScreenShare(room);
  }
}

async function toggleMicrophone(room) {
  const enabled = room.localParticipant.isMicrophoneEnabled;
  console.log(`${enabled ? "stopping" : "starting"} microphone`);
  try {
    await room.localParticipant.setMicrophoneEnabled(!enabled);
  } catch (e) {
    console.error("error toggling microphone", e);
  }
}

async function toggleScreenShare(room) {
  const enabled = room.localParticipant.isScreenShareEnabled;
  console.log(`${enabled ? "stopping" : "starting"} screen share`);
  try {
    await room.localParticipant.setScreenShareEnabled(!enabled, {
      audio: true,
    });
  } catch (e) {
    console.error("error sharing screen", e);
  }
}

function handleButtonPress() {
  console.log('button pressed');
  screnshareis_cool();
}

function ReplayAnalyzer() {
  return (
    <>
      <div>Replay Analyzer</div>
      <iframe src="/api/replay_analyzer"></iframe>
    </>
  );
}

function takeScreenshot() { 
  console.log('screenshot taken');

  function captureScreenshot() {
    const video = document.getElementById('screenShareVideo');
    
    // Ensure the video has loaded metadata
    if (video.readyState >= 2) { // HAVE_CURRENT_DATA
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
  
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      const dataURL = canvas.toDataURL('image/png');

      const img = document.createElement('img');
      img.src = dataURL;
      document.body.appendChild(img);
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'screenshot.png';
      link.click();
    } else {
      // Video metadata not loaded yet
      video.addEventListener('loadeddata', captureScreenshot);
    }
  }

  captureScreenshot();
}

console.log('llama-grid loaded');

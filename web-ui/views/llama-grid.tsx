import React, { useRef, useState, useEffect } from 'react';
import {
  Room,
  RoomEvent,
  Track,
  LocalTrack,
  RoomOptions,
} from "livekit-client";

let Livekit = {
  Room,
  RoomEvent,
  Track,
};

//replay then autocommit - walk!!
//
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjkxOTU3MjEsImlzcyI6IkFQSXRTYndYdlNqaDRjZiIsIm5hbWUiOiJzY3JlZW5fc2hhcmUiLCJuYmYiOjE3MjkxMDkzMjEsInN1YiI6InNjcmVlbl9zaGFyZSIsInZpZGVvIjp7ImNhblVwZGF0ZU93bk1ldGFkYXRhIjp0cnVlLCJyb29tIjoicm9vbSIsInJvb21BZG1pbiI6dHJ1ZSwicm9vbUNyZWF0ZSI6dHJ1ZSwicm9vbUpvaW4iOnRydWUsInJvb21MaXN0Ijp0cnVlLCJyb29tUmVjb3JkIjp0cnVlfX0.Ub3VigeCkaL4sG4cdw7VaPfaHECuMg8buy6u38xqZPQ";
// ramble to rewind database - lots of  bear notes -> helper can reogranize into a gant chart.
const proxy_docs = [
  // "https://bun.sh/docs/runtime/bunfig#run-bun-auto-alias-node-to-bun", 
  // "https://google.com", 
  // "https://youtube.com", 
  // "https://github.com", 
  // "https://openai.com", 
  // "https://bun.sh/docs", 
  // "https://reflect.app",
  // "https://zed.dev/docs/multibuffers",
  // "https://colab.research.google.com/",
  // "http://hashirama.blog",
  // "https://docs.trossenrobotics.com/interbotix_xsarms_docs/ros_interface/ros1/raspberry_pi_setup.html",
  // "http://llama-tools.com",
  // "https://replicate.com/black-forest-labs/flux-1.1-pro",
  // "https://x.com/home",
  // "https://ai.google.dev/edge/mediapipe/solutions/guide",
  // "https://observablehq.com/d/396854ba12551e3a",
  // "https://paulgraham.com/swan.html",
  // "https://worrydream.com/SeeingSpaces/SeeingSpaces.jpg",
  // "https://robertheaton.com/archive/",
  // "https://chatgpt.com/c/671358b5-9ffc-8013-bffd-11fd2f7bf1a1",
  // "https://www.youtube.com/watch?v=CZim0p_etvM",
  // "https://dynamicland.org/2024/FAQ/",
  // "https://tailwindcss.com/docs/animation",
  // "https://observablehq.com/@mbostock/rainbow-pack",
  // "https://worrydream.com/LadderOfAbstraction/",
  // "https://reflect.app/g/awahab/19102024",
  // "https://developer.nvidia.com/sdk-manager",
  // "https://login.nvgs.nvidia.com/v1/error?preferred_nvidia=true&context=reset&theme=Bright&locale=en-US&prompt=default&email=eggnog.wahab@gmail.com&key=eyJhbGciOiJIUzI1NiJ9.eyJzZSI6IjhsQzUiLCJ0b2tlbklkIjoiMTI5NzIwMjUyNzMxMjE2NjkxMiIsImV4cCI6MTcyOTM1MTE5MCwib3QiOiIxMjk3MjAyNTU1NTMyODczNzI4IiwianRpIjoiNTljNjEwZGUtMzg2Zi00ZTYzLWEzNGUtNDdjZDM3ZWQ0N2Q1In0.32bu8bBYxJhTwcoJ-a9uQ1c3IpoarslXbdfUEPzOAtU&client_id=323893095789756813&code=82bea1d181ad43fb993d3af2b432b449&id=c035c24e-ed9e-4e7b-a7e8-faa0caaee637&multipleOrigin=false&isAutoInit=false&jarvis_error=%7B%22error%22:%22CREDENTIALS_EXPIRED%22%7D",
  // "https://chatgpt.com/c/6713bf25-6d78-8013-b29b-8ad79f6af262",
  // "https://ubuntu.com/download/server/thank-you?version=24.04.1&architecture=amd64&lts=true",
  // "https://www.google.com/search?q=ubuntu+2404&rlz=1C5CHFA_enUS1125US1125&oq=ubuntu+2404+&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDU4NzRqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8",
  // "https://github.com/mitchellh/nixos-config",
  // "https://resend.com/emails",
  // "https://chatgpt.com/c/6713c608-74ec-8013-b77f-7769630cb45f",
  // "https://wiki.ubuntu.com/ARM/Server/Install?_gl=1*t9dj9w*_gcl_au*NDc0NDc3NzMuMTcyOTM0NzUxOQ..&_ga=2.99606046.1295490594.1729347516-1204181597.1729347516",
  // "https://docs.trossenrobotics.com/interbotix_xsarms_docs/ros_interface/ros1/raspberry_pi_setup.html",
  // "https://www.youtube.com/watch?v=CZim0p_etvM",
  // "https://scholar.google.com/",
];

/// spoken word = unifies groups from 5 to 100 - written word - 100,000 - pictures = 1 billion - Proof:youtube

async function getLivekitData() {
  const livekit_connect = 'livekit_connect'
    const response = await fetch('/api/livekit_connect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identity: 'voice to prompt' }),
    });

    if (!response.ok) {
      console.error('Failed to connect to Livekit:', response.statusText);
      return;
    }

    const data = await response.json();
    //console.log('Connected to Livekit:', data);
    return data
}
//const liveKit_data = await postLivekitConnect();
async function joinRoom(screenShareVideo, audioElement) {
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

// Add this near the top of the file, alongside the ENABLE_SCREEN_SHARE constant
const ENABLE_SCREEN_SHARE = false;
const ENABLE_AUDIO_PLAYBACK = true; // New environment variable

function LivekitAudio() {
  const screenShareVideo = useRef<HTMLVideoElement>(null);
  const audioElement = useRef<HTMLAudioElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);
  }, []);

  async function startRecording() {
    if (!audioContext) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => { 
      
      
      chunks.push(e.data);
      const blob = new Blob(chunks, { type: 'audio/webm' });
      sendAudioToServer(blob);
      console.log('saving to server!!')
    }
    recorder.onstop = () => {
      console.log('recorder stopped')
      // const blob = new Blob(chunks, { type: 'audio/webm' });
      // sendAudioToServer(blob);
    };

    recorder.start();
    setIsRecording(true);
    setAudioChunks([]);

    // Stop recording after 5 seconds
    setTimeout(() => stopRecording(), 5000);
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  }

  async function sendAudioToServer(audioBlob: Blob) {
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
  }

  function handleButtonPress() {
    console.log('Button pressed!');
    joinRoom(screenShareVideo.current, audioElement.current);
  }

  function handleRecordButtonPress() {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
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
    </div>
  );
}

// proxy  use(figma, 2) fun - (gmail, chatGPT)
const actualComponents = Object.entries({

  "livekit_audio": LivekitAudio,
  // "cognition_engine", - research paper -> diagram -> robot - stixels, waymo, 
    // "import_docs",
  
  });
// const llamaComponents = [
//   "youtube"
// ]


function LlamaGrid() {
  return           <LivekitAudio />
  // return (
  //   <>
  //     <div className="bg-white">
  //       <h1>anthropic artifact - chatbot blahlalblh - makes observable</h1>
  //       <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
  //         <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
  //         <LivekitAudio />
  //           {/* {actualComponents.map((component) => (
  //             <div key={component} className="relative lg:col-span-4">
  //               <div className="absolute inset-px rounded-lg bg-white"></div>
  //               <div className="relative flex h-full flex-col overflow-hidden">
  //                 <div className={`container-${component}`}></div>
  //                 <LivekitAudio>
  //                 {/* <iframe width="500"  
                  
                  
                  
  //                 height="500" src={`/deno/${component}`}></iframe> */}
  //                 <div className="p-10 pt-4"></div>
  //               </div>
  //               <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
  //             </div>
  //           {/* ))}} */}
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}

// ... (rest of the code remains unchanged)
      // <h1>goal by nov 1 - 1001 useful tools that shorten distance dynamicland</h1>

export default LlamaGrid;

// AI seinfeld but with all cartoons ever + robots - questionablecontent.net


// async function requestMicrophoneAndSpeechToText() {
//   try {
//     // Request microphone access
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     console.log('Microphone access granted');

//     // Initialize SpeechRecognition
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();

//     recognition.onstart = () => {
//       console.log('Speech recognition started');
//     };

//     recognition.onspeechend = () => {
//       console.log('Speech recognition ended');
//       recognition.stop();
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       console.log('Speech to text result:', transcript);
//     };

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//     };

//     // Start speech recognition
//     recognition.start();
//   } catch (error) {
//     console.error('Error accessing microphone:', error);
//   }
// }


//dating = a game like mounment valley or  the game amro playerd - farm ville 





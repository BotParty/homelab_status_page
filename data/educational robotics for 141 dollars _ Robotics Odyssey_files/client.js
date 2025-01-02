        // client.js




// function _Livekit() {
//     const videoRef = useRef<HTMLDivElement>(null);
//     const [room, setRoom] = useState<Room | null>(null);
//     const [participants, setParticipants] = useState<RemoteParticipant[]>([]);
  
//     useEffect(() => {
//       const url = "wss://your-livekit-server.com"; // Replace with your LiveKit server URL
//       const token = "YOUR_ACCESS_TOKEN"; // Replace with your LiveKit access token
  
//       const options: ConnectOptions = {
//         autoSubscribe: true,
//       };
  
//       let localRoom: Room;
  
//       const connectToRoom = async () => {
//         try {
//           localRoom = await connect(url, token, options);
//           setRoom(localRoom);
//           setParticipants(Array.from(localRoom.participants.values()));
  
//           localRoom.on("participantConnected", (participant) => {
//             setParticipants((prev) => [...prev, participant]);
//           });
  
//           localRoom.on("participantDisconnected", (participant) => {
//             setParticipants((prev) =>
//               prev.filter((p) => p.sid !== participant.sid)
//             );
//           });
  
//           localRoom.on("trackSubscribed", (track, participant) => {
//             if (track.kind === "video" && videoRef.current) {
//               const videoElement = document.createElement("video");
//               videoElement.srcObject = new MediaStream([track.mediaStreamTrack]);
//               videoElement.autoplay = true;
//               videoElement.playsInline = true;
//               videoElement.className = "w-40 h-40 object-cover mb-4";
//               videoRef.current?.appendChild(videoElement);
//             }
//           });
  
//           localRoom.on("trackUnsubscribed", (track, participant) => {
//             if (track.kind === "video" && videoRef.current) {
//               const videos = videoRef.current.querySelectorAll("video");
//               videos.forEach((video) => {
//                 if (video.srcObject === track.mediaStreamTrack) {
//                   video.remove();
//                 }
//               });
//             }
//           });
//         } catch (error) {
//           console.error("Failed to connect to LiveKit", error);
//         }
//       };
  
//       connectToRoom();
  
//       return () => {
//         localRoom?.disconnect();
//       };
//     }, []);
  
//     return (
//       <div ref={videoRef} className="livekit-video-container">
//         {/* Video streams will be appended here */}
//       </div>
//     );
//   }

// // Hydrate the client-side component
// render(<DinoCustomizer />, document.getElementById('dino-customizer'));
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm'

console.log('client.js', d3)
const words = ["engineer", "artist", "scientist", "analyst"];
let currentIndex = 0;

// Function to update text with a fade-in animation
function animateText() {
  // Select the element and apply fade-out
  d3.select(".rewriting-me")
    .transition()
    .duration(500) // Fade out duration
    .style("opacity", 0)
    .on("end", function() {
      // Update text and fade back in
      d3.select(this)
        .text(words[currentIndex])
        .transition()
        .duration(500) // Fade in duration
        .style("opacity", 1);

      // Update index for the next word
      currentIndex = (currentIndex + 1) % words.length;
    });
}

// Run the animation every 1.5 seconds
setInterval(animateText, 1500);
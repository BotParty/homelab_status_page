import dotenv from "dotenv";
import { AccessToken } from "livekit-server-sdk";
import { serve } from "bun";


const apiKey = process.env.LIVEKIT_API_KEY
const apiSecret = process.env.LIVEKIT_API_SECRET
const wsUrl = process.env.LIVEKIT_WS_URL


async function connect_to_livekit(options) {
  console.log("options", options);
  //if (!options.identity) throw new Error("requester must have an identity");
  if (!options.identity) {
    options.identity = 'anonymous' + Math.random().toString(36).substring(2, 15);
  }
  const token = new AccessToken(apiKey, apiSecret, {
    identity: options.identity,
  });
  token.addGrant({
    room: "example-room",
    roomJoin: true,
    canPublish: true,
  });
  const jwt = await token.toJwt();

  return { token: jwt, wsUrl };
}

export { connect_to_livekit };
// observable is the mueseum the wizards talked about
// see a canvas - add to it


const { EgressClient, RoomCompositeEgressRequest } = require('livekit-server-sdk');
import { spawn } from "bun";

//import {$} from "bun";
//op item list --vault=personal --tags=api --format json
//more tab - auto complete for everything - this repo coudl be good stdlib for robutts - for obs,toolchain(5things linux,go,zig,bun,python,C++,5apis,5apps) -- (english+diagrams) can gen the first 15.
//const api_keys = await $`op item list --vault=personal --tags=api --format json`.json()


// const api_keys = await new Promise((resolve, reject) => {
//   const proc = spawn(["op", "item", "list", "--vault=personal", "--tags=api", "--format", "json"]);
//   let output = "";

//   proc.stdout.on("data", (chunk) => {
//     output += chunk;
//   });

//   proc.on("close", () => {
//     try {
//       resolve(JSON.parse(output));
//     } catch (error) {
//       reject(error);
//     }
//   });

//   proc.on("error", (err) => {
//     reject(err);
//   });
// });

// const livekitHost = api_keys.find(item => item.name === 'LIVEKIT_WS_URL').value
// const apiKey = api_keys.find(item => item.name === 'LIVEKIT_API_KEY').value
// const apiSecret = api_keys.find(item => item.name === 'LIVEKIT_API_SECRET').value
//looking for best practices in mmphenomena --- because that was in importnati in games and cartoons.
//best practice in robotics engineerng - idk?

// const livekitHost = process.env.OPEN_AI_KEY
// const apiKey = process.env.LIVEKIT_API_KEY
// const apiSecret = process.env.LIVEKIT_API_SECRET

// const egressClient = new EgressClient(livekitHost, apiKey, apiSecret);
// // https://dev.twitch.tv/docs/api/
// //microbox + microsaur -
// //localhost -> connects to tailscale serve / funnel -> auto symlink to mothership - 4pb desktopx4
// async function startEgress() {
//   const request = RoomCompositeEgressRequest.fromPartial({
//     roomName: 'example-room',
//     layout: 'speaker-dark',
//     audioOnly: true,
//     fileOutputs: [
//       {
//         fileType: 'OGG', // LiveKit supports OGG for audio-only recordings
//         filepath: '/audio.ogg',
//       },
//     ],
//   });

//   const response = await egressClient.startRoomCompositeEgress(request);
//   console.log('Egress started with egress ID:', response.egressId);
//   return response.egressId
// }
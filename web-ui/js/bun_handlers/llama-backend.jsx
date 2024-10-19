const staticDir = join("static/");
import { join } from "node:path";
const fs = require("fs");
const path = require("path");
import React from "react";
import { renderToString } from "react-dom/server";

// import FlirtFlow from '../views/jsx/flirtflow'; // Adjust the path if necessary

const llamatoolsir = join("views", "llama-tools");

function App() {
  return <div>hello world</div>;
}

//export default App;


function livekit_speech_to_fn_call(req) {
  //what is rpc 
  //send audio p primary function -> use from app




  // from phone ---- speak -> 

  // send to server -> whisper -> find the function - call it -> schedules an gent 
  
  return new Response("blahblah");
}

const routes = {
  "/livekit_speech_to_rpc": livekit_speech_to_fn_call,
  "/cognition_engine": () => new Response("blahblah"),
  "/replay_analyzer": () => new Response("blahblah"),
  "/logs_viewer": () => new Response("blahblah"),
  "/import_docs": () => new Response("blahblah"),
  "/script_obs": () => new Response("blahblah"),
  "/for_jp": () => new Response("blahblah"),
  "/index": () => new Response("blahblah"),
  "/api_docs": () => new Response("blahblah"),
  "/flirtflow": () => new Response("blahblah"),
  "/rich_hickey": () => new Response("blahblah")
};

export default routes

// const path_maker = (route) => join(llamatoolsir, route + ".html");
// const goodOnesFiles = routes.map(path_maker);

// const compile_time_file_checker = (file) => {
//   return goodOnesFiles.includes(path_maker(file));
// };

// const filtered_good_ones_files = routes.filter(compile_time_file_checker);
// console.log("Files in goodOnesDir:", filtered_good_ones_files.length);
// console.log("filtered,  goodOnesFiles", compile_time_file_checker("index"));

// const render_page = (page_name) => {
//   console.log("page_name", page_name);
//   //if (page_name === 'flirtflow') {
//   const html = renderToString(<App></App>); // Change Render to FlirtFlowPanel
//   console.log("html", html);
//   return html;
//   //}

//   const page_path = path_maker(page_name);
//   if (filtered_good_ones_files.includes(page_name.replace("/", ""))) {
//     // Remove leading slash
//     return fs.readFileSync(page_path, "utf8");
//   } else {
//     return "404";
//   }
// };
// const port = 8004
// Bun.serve({
//   port: port,
//   async fetch(req) {
//     let url = new URL(req.url).pathname;
//     console.log("url", url);
//     if (url === "/") url = "index";
//     if (url.startsWith("/static")) {
//       // Remove .pathname
//       return Bun.file(join(staticDir, url.replace("/static", "")));
//     }
//     return new Response(render_page(url), {
//       headers: { "Content-Type": "text/html" },
//     });
//   },
// });

// console.log("running llama-backend on port " + port);
// const socket = new WebSocket('ws://your-websocket-server-url');

// // Event listener for when the connection is open
// socket.addEventListener('open', function (event) {
//     console.log('Connected to WebSocket server');
// });

// // Event listener for when a message is received from the server
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });

// Event listener for when the connection is closed
// socket.addEventListener('close', function (event) {
//     console.log('Disconnected from WebSocket server');
// });

// // Event listener for when an error occurs
// socket.addEventListener('error', function (event) {
//     console.error('WebSocket error: ', event);
// });

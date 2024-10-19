//augment reflect -> okay[ ], good[] , better[]  ----- pefect - tomorow ???? 5 impossibel things before preakfeast 
//figure out atuhenticaitors - try anyone 0 make own - make fulxu QR vodce

//rainbow amaterasu --  no golden path ------ 
//404 that llamas - and says """wrong route friend, hwodd you get here??? also did you mean?? coundown 5 sconds -> aut oroute to most porbable - prediction "
//tools that predict not obey -> people that predictionot obey their nature and the world 
//https://underscorejs.org/underscore-esm.js
import _ from 'https://cdn.jsdelivr.net/npm/underscore@1.13.7/underscore-esm.min.js';

const { exec } = require('child_process');
import { renderToString } from "react-dom/server";
import React from "react";
import { serve } from "bun";
const { spawn } = require("child_process");
import Blag from "./blag.jsx";
//import RoboticsOdyssey from "views/odyssey/robotics-odyssey.tsx";
import fs from "fs";
import path from "path";
import { watch } from "fs";
import { connect_to_livekit } from './bun_handlers/bun-livekit-server.js'
import serveMakeDenoCell from './serveMakeDenoCell.ts'
import serveMakePythonCell from './serveMakePythonCell.ts'

import serveMakeBunCell from './bun_helper.ts'
import docker_run from './docker_helper.ts'
import llamaRoutes from './bun_handlers/llama-backend.jsx'
import CgiRoutes from './bun_handlers/cgi-backend.js'
// doc = https://caddyserver.com/docs/

function serveLlamaTools(req: Request) { 
  return new Response("llama-tools", {
    headers: {
      "Content-Type": "text/html",
    },
  });
}


const CgiRoutesHandlers = Object.fromEntries(
  Object.entries(CgiRoutes).map(([key, value]) => [`/cgi-tools${key}`, value])
);

const llamaRoutesHandlers = Object.fromEntries(
  Object.entries(llamaRoutes).map(([key, value]) => [`/llama-tools${key}`, value])
);
//compile time check theese
//console.log('CgiRoutesHandlers', CgiRoutesHandlers)

function serveOutlierAgent() {

}

function serveOptimizelyPlaywrightSupervision() {
  //livekit webrtc the tab 


}

const routes = {
  //"/": (req: Request) => make_docs,
  "docs/": (req: Request) => response_404(req),
  "_outlier_agent": (req: Request) => serveOutlierAgent(req),
  "_optimizely_playwright_supervision": (req: Request) => serveOptimizelyPlaywrightSupervision(req),
  "/livekit_connect": (req: Request) => livekit_connect(req),
  "/robotics-odyssey": (req: Request) => serveRoboticsOdyssey(req),
  "/make_bun_cell": (req: Request) => serveMakeBunCell(req),
  "/make_deno_cell": (req: Request) => serveMakeDenoCell(req),
  "/make_python_cell": (req: Request) => serveMakePythonCell(req),
  "/blag": (req: Request) => serveBlag(req),
  "/llama-tools": (req: Request) => serveLlamaTools(req),
  "/cgi-tools": (req: Request) => serveCgiTools(req),
  ...CgiRoutesHandlers,
  ...llamaRoutesHandlers
 }


const docs_response = (routes) => { 
  const routes_links = Object.keys(routes).map(
    key => `<li><a href=${key}>${key}</a></li>`
  );
  const content = `<html><body>docs - please thank you
${routes_links.join("\n")}
</body></html>`



return new Response(content, {
  headers: {
    "Content-Type": "text/html",
  },
});
}

function serveCgiTools(req: Request) { 
  return  docs_response(CgiRoutes)
}

const response_404 = () => { 
  return docs_response(routes)
}


// console.log("req url", url.pathname);
// if (url.pathname === "/blag" || url.pathname === "/") return routes["/blag"](req)
//  if (url.pathname === "/docs") return response_404(req)
// if (url.pathname === '/livekit_connect') return handle_livekit_connect(req)  
// if (url.pathname === "/robotics-odyssey") return routes["/robotics-odyssey"](req)
// if (url.pathname == '/favicon.ico') return new Response(Bun.file('public/images/favicon.svg'))
//   //web-ui/public/images/favicon.svg//
// if (url.pathname === "/make_bun_cell") return routes["/make_bun_cell"](req)
// if (url.pathname === "/make_deno_cell") return routes["/make_deno_cell"](req)
// if (url.pathname === "/make_python_cell") return routes["/make_python_cell"](req)
// if (url.pathname.includes("/user_code")) return static_files(req)
// if (url.pathname === "/archive") return routes["/archive-blog"](req)
//if (url.pathname === "/obs-zed-prediction-mode") return routes["/llama-tools"](req) --- FOUNDATION -> RE_READ -> convert the tv show to graphic novel - guyaka girls
// if (url.pathname === "/llama-tools") return routes["/llama-tools"](req)
// if (url.pathname === "/llama-tools") return routes["/llama-tools"](req)
// if (url.pathname === "/cgi-tools") return routes["/cgi-tools"](req);
//if (url.pathname === "/science-tools*") return new Response("sciente-tools")  // redictrect - to all users contribute anytihn they wantnt //?! - they nsicee odnt 
// if (url.pathname === "/manifest.json") {
//   return new Response(JSON.stringify({"IDK":10}), {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
// try gpt then just redirect to 3 bun rpoceses in one bun file - started by systemd - a script... like levles 
// delete new relic 
//return response_404(routes)


async function proxy(req: Request) {
   const url = new URL(req.url);   
   console.log('url', url.pathname)
    if (routes[url.pathname]) {
      return routes[url.pathname](req)
    }
    return response_404(req)
}

// (nanosaur factory)
// peteer attia - rhonda patrick ----- bill nye


const port = 8080;
async function main() {
  serve({
    port,
    fetch: proxy,
  });
}
console.log('compile time checks: ' ,'typeof default_response === string' , typeof default_response === 'string');
main();
console.log("Server running at http://localhost", port);
// the intelillgence age is here - and the repsonsibliey of intellegnetn peple is to use it 
// alan - everyoen has infintie intleigenice ive thoguht this isince 5 years old - sister disagreeed -  show sister this 
// your were one of the msartest girls ive met - just used it for emotional intelligence because thats why you liked 
//-read sneuro -  

//kapil says - depression - as opspsosed cmheical ----- find out change yoru min dfw 


async function livekit_connect(req: Request) { 
  //const identity = url.searchParams.get("identity");
  //console.log('identity', identity)
const jsonData = await req.json();
console.log('Received JSON data:', jsonData);

  const identity = jsonData.identity;
  if (!identity) {
    return new Response("Identity parameter is missing", { status: 400 });
  }

  const json = await connect_to_livekit(jsonData);
  console.log(json, json);
    return new Response(JSON.stringify(json));
}

async function serveRoboticsOdyssey(req: Request) { 
  return new Response(makeReactApp(), {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
// writers are thinks, coders a thinkers, designers are ithnks ->>>> use your instrument of MIND > GOD 
function serveBlag(req: Request) { 
  const filePath = path.join(__dirname, "views/odyssey/blag.html");
  let indexHtmlContent = fs.readFileSync(filePath, "utf-8");

  const blag = indexHtmlContent.replace(
    "{{template blag}}",
    `${renderToString(<Blag />)}`,
  );

  return new Response(blag, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}


// async function static_files(req: Request) {
//   const url = new URL(req.url);    
//   //const files = fs.readdirSync(url.pathname.slice(1));
//   let dir_name = path.join(process.cwd(), url.pathname.slice(1));
//   console.log(dir_name);
//   console.log("Current working directory:", process.cwd());
//   const stats = fs.statSync(dir_name);
//   //dont duplicate - if is direcory - readisync - if its a file - split and then read-dir-sync
//   if (stats.isDirectory()) {
//     const files = fs.readdirSync(dir_name);
//     return new Response(`Files in user_code: ${files.join(", ")}`, {
//       headers: {
//         "Content-Type": "text/plain",
//       },
//     });
//   }
//   return new Response(Bun.file(dir_name));
// }

function makeReactApp() {
  const filePath = path.join(__dirname, "views/odyssey/index.html");

let indexHtmlContent = fs.readFileSync(filePath, "utf-8");

      //const App = () => <RoboticsOdyssey />;
      const App = () => { return <div>course_handler</div> }
      let html = indexHtmlContent.replace(
        "{{template roboticsodyssey}}",
        `${renderToString(<App />)}`,
      );
      return html
}

//tic tac toe not stephane and anyone who blah -> they have to recruit the most knowleable  they  know
// iq lead weight , hardw ork = gem stones ?
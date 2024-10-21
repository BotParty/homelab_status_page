import { renderToString } from "react-dom/server";
import React, { Suspense, lazy } from 'react';
import Bun from 'bun'
import fs from "fs";
import path from "path";
import { connect_to_livekit } from './bun_handlers/bun-livekit-server.js'
import llamaRoutes from './bun_handlers/llama-backend.js'
import CgiRoutes from './bun_handlers/cgi-backend.js'
import { renderToReadableStream } from 'react-dom/server';

const port = 8080;
console.log(`Server running at http://localhost:${port}`);

const LlamaGrid = lazy(() => import('./llama-grid.tsx'));
{/* <div>
<SimpleComponent />
<Suspense fallback={<div>Loading...</div>}>
  <ComplexComponent />
</Suspense>
</div> */}


import Blag from "./blag.jsx";

//const  indexHtmlContent = fs.readFileSync('/home/adnan/homelab_status_page/web-ui/views/index.html', 'utf-8')

async function serveLlamaTools(req: Request) {
  const filePath = path.join(process.cwd(), "js/views/blag.html");
  let indexHtmlContent = fs.readFileSync(filePath, "utf-8");

  const stream = await renderToReadableStream(
    <React.Suspense fallback={<div>Loading...</div>}>
      <LlamaGrid />
    </React.Suspense>
  );

  // Wait for all content to be ready
  await stream.allReady;

  const reader = stream.getReader();
  let result = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += new TextDecoder().decode(value);
  }

  const htmlContent = indexHtmlContent.replace(
    "{{template blag}}",
    result
  );

  return new Response(htmlContent, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}

function serveBlag(req: Request) { 
  //let path = '/home/adnan/homelab_status_page/web-ui/views/odyssey/blag.html'
//  const pathname = `/home/adnan/homelab_status_page/web-ui/views/llama-tools/livekit_speech_to_fn_call.html`

  const filePath = path.join(process.cwd(), "js/views/blag.html");
  console.log('filePath', filePath)
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

async function serveBlagArchive(req: Request) { 
  const url = `https://reflect.site/g/awahab/500-blog-posts---prolific---show-steps---12yr-exec--phd-x-7-in-2-yrs/d1ea069679c64f649827dd990648b17c`
  const response = await fetch(url);
  const htmlContent = await response.text();

  const turndownService = new TurndownService();
  const markdownContent = turndownService.turndown(htmlContent);
  const lines = markdownContent.split('\n');


  const docsPath = path.join(process.cwd(), 'docs');
  if (!fs.existsSync(docsPath)) {
    fs.mkdirSync(docsPath, { recursive: true });
  }

  lines.forEach(line => {
    if (line.startsWith('#')) {
      const header = line.replace(/#/g, '').trim();
      const folderName = header.replace(/\s+/g, '-');
      const folderPath = path.join(docsPath, folderName);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Create an HTML file in the folder with the title
      const htmlContent = `<html><head><title>${header}</title></head><body><h1>${header}</h1></body></html>`;
      const filePath = path.join(folderPath, `${folderName}.html`);
      fs.writeFileSync(filePath, htmlContent, 'utf-8');
    }
  });

  let content = '<ul>';
  for (let i = 0; i < 500; i++) {
    const randomLink = `https://example.com/${Math.random()}`;
    content += `<li><a href="${randomLink}">Link ${i + 1}</a></li>`;
  }
  content += '</ul>';

  return new Response(content, {
    headers: {
      "Content-Type": "text/html",
    },
  });



  return new Response('blag archive')
}

const CgiRoutesHandlers = Object.fromEntries(
  Object.entries(CgiRoutes).map(([key, value]) => [`/cgi-tools${key}`, value])
);

const llamaRoutesHandlers = Object.fromEntries(
  Object.entries(llamaRoutes).map(([key, value]) => [`/llama-tools${key}`, value])
);
const routes = {
  "/livekit_connect": (req: Request) => livekit_connect(req),
  ///"/os/*": (req: Request) => os_automation(req),
  "/docs": (req: Request) => docs_response(routes),
  "/": (req: Request) => serveBlag(req),
  "/robotics-odyssey": (req: Request) => serveRoboticsOdyssey(req),
  "/blag": (req: Request) => serveBlag(req),
  "/llama-tools": (req: Request) => serveLlamaTools(req),
  "/cgi-tools": (req: Request) => serveCgiTools(req),
  "/blag-archive": (req: Request) => serveBlagArchive(req),

  ...CgiRoutesHandlers,
  ...llamaRoutesHandlers
 }

async function main() {
  Bun.serve({
    port,
    fetch,
    // websocket: handle_websocket
  });
}
main();

async function fetch(req: Request) {
  const url = new URL(req.url);   
  console.log('url', url.pathname)
  if (url.pathname.startsWith("/assets")) return Bun.file('/Users/shelbernstein/homelab_status_page/web-ui/assets/output.css')

  if (url.pathname.startsWith("/webhook")) return webhook(req)

  //if (url.pathname.startsWith("/os_automation")) return os_automation(req);

   if (url.pathname.startsWith("/api/save_audio_to_whisper")) return save_audio_to_whisper(req);

   if (routes[url.pathname]) { //handles all HTTPS JSON regular bear routes
     return routes[url.pathname](req)
   }
   if (url.pathname.startsWith("/proxy")) {
     const targetUrl = url.pathname.replace("/proxy", "");
     if (targetUrl === "") { 
       return new Response("how to proxy??? - try /proxy/https://google.com", {
         headers: {
           "Content-Type": "text/html",
         },
       });
     }
   }
}


async function livekit_connect(req: Request) { 
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

// convert all books to music videos - read aloud + show diagrms - interactive if psosibel 
async function save_audio_to_whisper(req: Request) {
  console.log('save_audio_to_whisper called');

  try {
    // Check if the request method is POST
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Get the content type
    const contentType = req.headers.get('content-type');

    let data;
    if (contentType && contentType.includes('application/json')) {
      // If it's JSON data
      data = await req.json();
    } else if (contentType && contentType.includes('multipart/form-data')) {
      // If it's form data (e.g., file upload)
      const formData = await req.formData();
      data = Object.fromEntries(formData);
    } else {
      // For other content types, try to read as text
      data = await req.text();
    }

    console.log('Received data:', data);

    // Process the data (this is where you'd implement your whisper logic)
    // For now, we'll just echo back the received data
    return new Response(JSON.stringify({ message: 'Data received', data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in save_audio_to_whisper:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
function webhook(req: Request) { 
  //console.log('webhook', req)
  return new Response('webhook')
}



//console.log("Server running at http://localhost", port);

async function serveRoboticsOdyssey(req: Request) { 
  //const component_name = "views/odyssey/index.html"
  return new Response('', {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
// writers are thinks, coders a thinkers, designers are ithnks ->>>> use your instrument of MIND > GOD 


function makeReactApp(component_name) {
  const filePath = path.join(__dirname, component_name);

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

///robots nee dt o browweserewb - how else will they know when law changes a --- are they suppseod to wait for some guy to look it up and doit ?!?!?! 
// geofences shure but what about liek what kylge
//augment reflect -> okay[ ], good[] , better[]  ----- pefect - tomorow ???? 5 impossibel things before preakfeast 
//figure out atuhenticaitors - try anyone 0 make own - make fulxu QR vodce

//rainbow amaterasu --  no golden path ------ 
//404 that llamas - and says """wrong route friend, hwodd you get here??? also did you mean?? coundown 5 sconds -> aut oroute to most porbable - prediction "
//tools that predict not obey -> people that predictionot obey their nature and the world 
//https://underscorejs.org/underscore-esm.js


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
// the intelillgence age is here - and the repsonsibliey of intellegnetn peple is to use it 
// alan - everyoen has infintie intleigenice ive thoguht this isince 5 years old - sister disagreeed -  show sister this 
// your were one of the msartest girls ive met - just used it for emotional intelligence because thats why you liked 
//-read sneuro -  

//kapil says - depression - as opspsosed cmheical ----- find out change yoru min dfw 




//fn.name and 1m list of functions - each one cool - eval each for usefulness - find all fn in bun,py,etc --- be safe with CRIU any other kernel extension research papers like jetpack_nix
//log every shell exec, and  thing carefully and make infrastrcture easy to restart (immutable important parts + highly dynamicland parts)
// async function os_automation(req: Request) { 
//   const cmd =  new URL(req.url).searchParams.get('cmd');
//   // const is_safe = await Bun.$(`ollama prompt "is this command safe to run on my computer? - estimate "`).text();  
//   // if (is_safe.toLowerCase().includes("no")) {  // add error why?? 
//   //   return new Response(`command seems not safe sorry, email eggnog.wahab@gmail.com or text '+1 (346) 697-0747 ' with this timestamp ${Date.now()}`, { status: 400 });
//   // }
//   // place hodler - b4 + after - criu - 
//   //return new Response(await Bun.$`${cmd}`.text());

//   return new Response(`tbc`)
// }

//import RoboticsOdyssey from "views/odyssey/robotics-odyssey.tsx";

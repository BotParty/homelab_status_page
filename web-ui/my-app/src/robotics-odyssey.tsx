import React, { useRef, useEffect } from "react";
import Header from "../views/Header.js";

const  OdysseyIntro = function () {} 

//import OdysseyIntro from "./Odyssey-Intro.js"


import { readFileSync } from "fs";
import Hardware_Picker from "./odysssey/Hardware_picker.jsx";

import ObservablePreview from "./odysssey/ObservablePreview.js";
import Footer from "./odysssey/Footer.jsx";
import TwitchPlaysPokemonPanel from "./odysssey/TwitchPlaysPokemonPanel.js";
import TeleGuidance from "./odyssey/TeleGuidance.js";
import DynamicHow from "./odysssey/DynamicHow.js";
import PowerPoint from "./odysssey/PowerPoints.js";
import Box from "./odysssey/Box.js";
//import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
//import define from "https://api.observablehq.com/@observablehq/hello-world.js?v=4";
import Sisterschools from "./odysssey/sisterschools.js";
import _ from 'https://esm.sh/lodash';
//const  OdysseyIntro  =  require('https://files.hashirama.blog/homelab_status_page/web-ui/my-app/src/odysssey/OdysseyIntro.ts');

//import   OdysseyIntro  from 'homelaodysssey/OdysseyIntro.ts'

function LLamaCell(props) {
  const {src} = props
  return  (<>
  
  {/* <h1>{src}</h1> */}
  <iframe width="100%" height="500" frameborder="0"
  src={src}></iframe>
{/* <div className="p-10 pt-4">
  <h3 className="text-sm/4 font-semibold text-indigo-600">Performance</h3>
  <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950">Lightning-fast builds</p>
  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida justo et nulla efficitur, maximus
    egestas sem pellentesque.
  </p>
  </div> */}
  </>
  )
}



 function LlamaGrid() {
  // https://observablehq.com/@roboticsuniversity/perception
  // <iframe width="100%" height="500" frameborder="0"
  // src="h"></iframe> 
  // <iframe width="100%" height="500" frameborder="0"
  // src="https://observablehq.com/embed/@roboticsuniversity/simulation?cell=*&banner=false"></iframe>

  const  urls = [
    "https://observablehq.com/embed/@roboticsuniversity/perception?cell=*&banner=false",
    "https://observablehq.com/embed/@roboticsuniversity/prediction@106?cell=*",
    "https://observablehq.com/embed/@roboticsuniversity/simulation?cell=*&banner=false", //video games
    "https://observablehq.com/embed/@roboticsuniversity/dynamical-systems-xerox-parc-dynamicland?cell=*&banner=false",

  ]
  console.log(urls)
  
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        {/* <h2 className="text-base/7 font-semibold text-indigo-600">Deploy faster</h2>
        <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
          Everything you need to deploy your app
        </p> */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-16 lg:grid-cols-6 grid-rows-2">
          <div className="relative lg:col-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
            <LLamaCell src={urls[0]} />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
       
          <div className="relative col-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
            <LLamaCell src={urls[1]} />
     
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
          </div>
          <div className="relative col-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-bl-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
            <LLamaCell src={urls[2]} />
 
     
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-bl-[2rem]" />
          </div>
          <div className="relative col-span-6">
            <div className="absolute inset-px rounded-lg bg-white" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
            <LLamaCell src={urls[3]} />

            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
          </div>
          {/* <div className="relative col-span-3">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
            <LLamaCell src={urls[4]} />

            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
          </div> */}
        </div>
      </div>
      </div>
  )
}


function RoboticsOdyssey() {
  return (
    <div className="dark">
      {/* <Header /> */}
      <div className="text-gray-950 antialiased bg-slate-900">
        <div className="overflow-hidden flex justify-center items-center min-h-screen">
          <main>
          <h1 className="text-4xl font-bold text-center text-white">Robotics Odyssey - become a Robotics Odyssey</h1>

          <div> by adnan wahab </div>
          <h3 className="text-xl font-bold text-center text-white">93 hours of video to go from absolute beginner to advanced AI+Robotics Engineer</h3>
          <div className="text-center text-white">40 students already enrolled</div>
          <div>5 stars on trust pilot</div>
            <LlamaGrid />
  
    
            <Sisterschools />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}

// magic proxy + es6 proxy iframe --> 500 notebooks - being inscribed to and imbued with --- acutally anything --- 2x fly.io gpu for 
//$1000 for on-demand rendering + used compute for 200k llama-requests to refine notebook + hand edit for 10 hours a day for 10 days 

/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
//</link>import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
// import define from "https://api.observablehq.com/@roboticsuniversity/agent-dashboard@77.js?v=4&api_key=d656d272d7f07743922b44815d2905265f91507b";

function UseDirectImport() {
  const ref = useRef();

  const runtime = new Runtime().module(define, (name) => {
    if (name === "viewof table") return new Inspector(ref);
  });

  return <div ref={ref}></div>;
}

export default  RoboticsOdyssey
// tailwind fixed my design skills
// tailscale fixed my sysm-admin skills
// 3js journey fixed my grahpics skills
// fastai fixed my ML skills
// hackday fix my hardware skilsl

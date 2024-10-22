import React, { useRef, useEffect } from "react";
import Header from "../views/Header.js";

const  OdysseyIntro = function () {} 

//import OdysseyIntro from "./Odyssey-Intro.js"


import { readFileSync } from "fs";
import Hardware_Picker from "./odysssey/Hardware_picker.jsx";

import ObservablePreview from "./odysssey/ObservablePreview.js";
import Footer from "../views/Footer.js";
import TwitchPlaysPokemonPanel from ".//TwitchPlaysPokemonPanel.js";
import TeleGuidance from "./odyssey/TeleGuidance.js";
import DynamicHow from "./odysssey/DynamicHow.js";
import PowerPoint from "./odysssey/PowerPoints.js";
import Box from "./odysssey/Box.js";
//import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
//import define from "https://api.observablehq.com/@observablehq/hello-world.js?v=4";
import Sisterschools from "../views/sisterschools.js";
import _ from 'https://esm.sh/lodash';
//const  OdysseyIntro  =  require('https://files.hashirama.blog/homelab_status_page/web-ui/my-app/src/odysssey/OdysseyIntro.ts');

//import   OdysseyIntro  from 'homelaodysssey/OdysseyIntro.ts'


function RoboticsOdyssey() {
  return (
    <div className="dark">
      {/* <Header /> */}
      <div className="text-gray-950 antialiased bg-slate-900">
        <div className="overflow-hidden flex justify-center items-center min-h-screen">
          <main>
            {/* <iframe src="/_/OdysseyIntro.tsx" className="
    
    border-2 border-red-500
    w-full h-full"></iframe> */}
            <div className="">
              {/* <TeleGuidance />{" "} */}
              <iframe src="/_/TeleGuidance.tsx" className="
    
              border-2 border-red-500
              w-full h-full"></iframe>

            </div>
            <div className="">
              {/* <iframe src="/_/ObservablePreview.tsx" className="

 border-2 border-red-500
w-full h-full"></iframe> */}
            </div>
            <div className="relative" id="shit"
            >
<iframe src="/_/DynamicHow.tsx" className="

 border-2 border-red-500
w-full h-full"></iframe>
            </div>
            {/* <PowerPoint />
            <Box /> */}
            {/* <UseDirectImport /> */}
            <Pricing />
            <Footer />
            <Sisterschools />
            {/* <Hardware_Picker></Hardware_Picker> */}
          </main>
        </div>
      </div>
    </div>
  );
}

// magic proxy + es6 proxy iframe --> 500 notebooks - being inscribed to and imbued with --- acutally anything --- 2x fly.io gpu for 
//$1000 for on-demand rendering + used compute for 200k llama-requests to refine notebook + hand edit for 10 hours a day for 10 days 

function Pricing() {
  return (
    <div class="bg-gray-800 text-white p-8">
      <h2 class="text-2xl font-bold mb-4">Buy a Nanosaur.ai</h2>
      <p class="mb-6">Self Driving Open Source Somewhat Useful Robot</p>
      <div class="flex space-x-4">
        <div class="flex flex-col items-center">
          <div class="bg-gray-700 p-4 rounded-full">
            <svg
              class="w-12 h-12"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zM10.663 17.576l-.003-5.976c0-.269.224-.497.497-.497h1.645c.274 0 .498.224.498.497l-.003 5.976 3.217-3.217c.2-.2.5-.2.7 0 .2.2.2.5 0 .7l-4.312 4.312c-.2.2-.5.2-.7 0l-4.312-4.312c-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0l3.217 3.217z" />
            </svg>
          </div>
          <span class="mt-2">Base Model 141</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="bg-gray-700 p-4 rounded-full">
            <svg
              class="w-12 h-12"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zM10.663 17.576l-.003-5.976c0-.269.224-.497.497-.497h1.645c.274 0 .498.224.498.497l-.003 5.976 3.217-3.217c.2-.2.5-.2.7 0 .2.2.2.5 0 .7l-4.312 4.312c-.2.2-.5.2-.7 0l-4.312-4.312c-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0l3.217 3.217z" />
            </svg>
          </div>
          <span class="mt-2">Base + Arm - 300</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="bg-gray-700 p-4 rounded-full">
            <svg
              class="w-12 h-12"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zM10.663 17.576l-.003-5.976c0-.269.224-.497.497-.497h1.645c.274 0 .498.224.498.497l-.003 5.976 3.217-3.217c.2-.2.5-.2.7 0 .2.2.2.5 0 .7l-4.312 4.312c-.2.2-.5.2-.7 0l-4.312-4.312c-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0l3.217 3.217z" />
            </svg>
          </div>
          <span class="mt-2">Base + Jetson Orin</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="bg-gray-700 p-4 rounded-full">
            <svg
              class="w-12 h-12"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zM10.663 17.576l-.003-5.976c0-.269.224-.497.497-.497h1.645c.274 0 .498.224.498.497l-.003 5.976 3.217-3.217c.2-.2.5-.2.7 0 .2.2.2.5 0 .7l-4.312 4.312c-.2.2-.5.2-.7 0l-4.312-4.312c-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0l3.217 3.217z" />
            </svg>
          </div>
          <span class="mt-2">?</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="bg-gray-700 p-4 rounded-full"></div>
        </div>
      </div>
      {/* <img style={{width: "500px"}} src="https://nanosaur.ai/assets/images/nanosaur-wireframe-bw.png" /> */}
    </div>
  );
}

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

import React, { useRef, useEffect } from "react";
import Header from "./views/odyssey/Header.tsx";
import ObservablePreview from "views/odyssey/ObservablePreview.tsx";
import Footer from "views/odyssey/Footer.tsx";
import TwitchPlaysPokemonPanel from "views/odyssey/TwitchPlaysPokemonPanel.tsx";
import TeleGuidance from "views/odyssey/TeleGuidance.tsx";
import DynamicHow from "views/odyssey/Dynamichow.tsx";
import PowerPoint from "views/odyssey/PowerPoints.tsx";
import Box from "views/odyssey/Box.tsx";
import { Runtime, Inspector } from "@observablehq/runtime";
import Hardware_Picker from "./Hardware_picker.jsx";
import OdysseyIntro from "./Odyssey-Intro.tsx";

// function RoboticsOdyssey() {
//   return <div>Robotics Odyssey</div>;
// }

function RoboticsOdyssey() {
  return (
    <div className="dark">
      {/* <Header /> */}
      <div className="text-gray-950 antialiased bg-slate-900">
        <div className="overflow-hidden flex justify-center items-center min-h-screen">
          <main>
            <OdysseyIntro />

            <div className="">
              <TeleGuidance />{" "}
            </div>
            <div className="">
              <ObservablePreview></ObservablePreview>
            </div>
            <div className="relative">
              {" "}
              <DynamicHow />{" "}
            </div>
            {/* <PowerPoint />
            <Box /> */}
            {/* <UseDirectImport /> */}
            <Pricing />
            {/* <Footer /> */}
            {/* <Hardware_Picker></Hardware_Picker> */}
          </main>
        </div>
      </div>
    </div>
  );
}

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
      <img src="https://nanosaur.ai/assets/images/nanosaur-wireframe-bw.png" />
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
import define from "https://api.observablehq.com/@roboticsuniversity/agent-dashboard@77.js?v=4&api_key=d656d272d7f07743922b44815d2905265f91507b";

function UseDirectImport() {
  const ref = useRef();

  const runtime = new Runtime().module(define, (name) => {
    if (name === "viewof table") return new Inspector(ref);
  });

  return <div ref={ref}></div>;
}

export default RoboticsOdyssey;
// tailwind fixed my design skills
// tailscale fixed my sysm-admin skills
// 3js journey fixed my grahpics skills
// fastai fixed my ML skills
// hackday fix my hardware skilsl

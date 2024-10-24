import { html } from 'hono/html'
import { AccessToken } from "livekit-server-sdk";
const app = new Hono()
import odyssey from './robotics-odyssey.js'
import fs from 'fs'
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { basicAuth } from 'hono/basic-auth';
import { etag } from 'hono/etag';
import { serveStatic } from 'hono/serve-static';
import { jwt } from 'hono/jwt';
import { cors } from 'hono/cors';
import { Context, Hono } from 'hono'
import { WebhookReceiver } from 'livekit-server-sdk';
import { LiveKitClient } from 'livekit-server-sdk';
import * as utils from './utils.js'


import { $ } from "bun"

const apiKey = process.env.LIVEKIT_API_KEY
const apiSecret = process.env.LIVEKIT_API_SECRET
const wsUrl = process.env.LIVEKIT_WS_URL

const home = process.env.HOME


const derp = `${home}/derp`

const start_audio_publish = async function () {
    const timestamp = Date.now();
    const outputPath = `${derp}/recordings/audio-${timestamp}.mp3`;
}

const start_audio_egress = async function () {
    const timestamp = Date.now();
    const outputPath = `${derp}/recordings/audio-${timestamp}.mp3`;
    
    const result = await $`lk egress start \
      --url ${wsUrl} \
      --api-key ${apiKey} \
      --api-secret ${apiSecret} \
      --audio-only \
      --output ${outputPath}`;

    console.log('Audio egress started:', result);
    return outputPath;
}
export { start_audio_egress }
const start_egress_screeshare = async function () {
 
}

// const json_keys = await $`op item list --tags api --format json`.json()
// const shit = `#!/bin/bash

// # Fetch all item IDs tagged with 'api'
// item_ids=$(op item list --tags api --format json | jq -r '.[].id')

// # Loop through each item ID and retrieve the notes
// for id in $item_ids; do
//   # Get the item details in JSON
//   item_details=$(op item get "$id" --format json)
  
//   # Extract the title and notes
//   title=$(echo "$item_details" | jq -r '.overview.title')
//   notes=$(echo "$item_details" | jq -r '.notesPlain')
  
//   echo "------------------------------"
//   echo "Title: $title"
//   echo "Notes:"
//   echo "$notes"
//   echo "------------------------------"
// done`

const fetchApiItems = async () => {
    const itemIds = await $`op item list --tags api --format json`.json();
    
    for (const item of itemIds) {
      const itemDetails = await $`op item get ${item.id} --format json`.json();
      
      const title = itemDetails.overview.title;
      const notes = itemDetails.notesPlain;
      
      console.log("------------------------------");
      console.log("Title:", title);
      console.log("Notes:", notes);
      console.log("------------------------------");
    }
  }
  
  // Call the function to fetch items
//   const api_keys = await fetchApiItems();
//   console.log('api_keys', api_keys)
  



const receiver = new WebhookReceiver('apikey', 'apisecret');

export const webhook_receiver = async (c: Context) => {

    console.log('Webhook received:', );

    const auth_header = c.req.header('Authorization')
    //console.log('auth_header', auth_header)
    //console.log(c.json())

 
    return c.json({ success: true });
  }

  async function connect_to_livekit(options: { identity: string }) {
    console.log("options", options);
  
    // Default identity if not provided
    if (!options.identity) {
      options.identity = 'anonymous' + Math.random().toString(36).substring(2, 15);
    }
  
    // Creating a new AccessToken
    const token = new AccessToken(apiKey, apiSecret, {
      identity: options.identity,
    });
  
    // Add grant to the token (e.g., room access)
    token.addGrant({
      room: "example-room",  // Replace with your actual room name
      roomJoin: true,
      canPublish: true,
    });
  
    // Generate the JWT token
    const jwt = await token.toJwt();
  
    // Return token and WebSocket URL
    return { token: jwt, wsUrl };
  }

  export  const Layout = (content: string)  => html`
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://unpkg.com/htmx.org@1.9.3"></script>
      <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Hono + htmx</title>
    </head>
    <body>
      <div class="p-4">
        <h1 class="text-4xl font-bold mb-4"><a href="/">Robotics Odyssey</a></h1>
        <div>${content}</div>
      </div>
    </body>
  </html>
`
//  <a class="float-right" href="https://buy.stripe.com/test_28o6oZelUe8g2HubII">pay via stripe </a><
//after 1k signups - lower price to course by 10% by 1k till $5 for life.
//only need 20k per year -  (20k / 100) = (goal: 200per year) - rest -> reinveest to hardware
//1 buy per day = all beings (awaken + flourish)
//1000 users is 1000/20 = 50 years of free service.


export const llama_ = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://unpkg.com/htmx.org@1.9.3"></script>
      <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Hono + htmx</title>
    </head>
    <body>
      <div class="p-4">
        <h1 class="text-4xl font-bold mb-4"><a href="/">LLama Tools</a> <a class="float-right hidden" href="https://buy.stripe.com/test_28o6oZelUe8g2HubII">pay via stripe </a></h1>
<div class="bg-gray-900 py-2 sm:py-32">
    <div class="mx-auto px-6 lg:max-w-7xl lg:px-8">
      <h2 class="text-base/7 font-semibold text-indigo-400">Deploy faster</h2>
      <p class="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        LLama Tools
      </p>
  
      <!-- Toggle button -->
      <button class="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg">
       cool!
      </button>
  
      <div class="mt-6 grid grid-cols-1 gap-4">
        <!-- First grid item -->
        <div class="flex p-px col-span-1 ">
          <div class="overflow-scroll rounded-lg bg-gray-800 ring-1 ring-white/15 w-full">
            <iframe src="/iframe/lama-tools/livekit_audio.html" class="w-full h-full"></iframe>
            <div class="p-4">
              <h3 class="text-sm/4 font-semibold text-gray-400">livekit audio</h3>
              <p class="mt-2 text-lg/7 font-medium tracking-tight text-white">livekit audio</p>
            </div>
          </div>
        </div>
  
        <!-- Second grid item -->
        <div class="flex p-px col-span-1">
          <div class="overflow-scroll rounded-lg bg-gray-800 ring-1 ring-white/15 w-full">
            <iframe src="/iframe/lama-tools/livekit_share.html" class="w-full h-full"></iframe>
            <div class="p-4">
              <p class="mt-2 text-lg/7 font-medium tracking-tight text-white">livekit screenshare</p>
            </div>
          </div>
        </div>
  
        <!-- Third grid item -->
        <div class="flex p-px col-span-1">
          <div class="overflow-scroll rounded-lg bg-gray-800 ring-1 ring-white/15 w-full">
          <iframe src="/iframe/lama-tools/livekit_view_all.html" class="w-full h-full"></iframe>

            <div class="p-4">
              <h3 class="text-sm/4 font-semibold text-gray-400">view all</h3>
            </div>
          </div>
        </div>
  
        <!-- Fourth grid item -->
        <div class="flex p-px col-span-1">
          <div class="overflow-scroll rounded-lg bg-gray-800 ring-1 ring-white/15 w-full">
            <div class="p-4">
                  <iframe src="/iframe/lama-tools/replay_analyzer.html" class="w-full h-full"></iframe>

              <h3 class="text-sm/4 font-semibold text-gray-400">replay analyzer - day9</h3>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        </div>
    </body>
  </html>
`

export const indexPage = `<div>
    <h1> hono index </h1>


    <div>
    <li> add magic iframe -- htmx + some observable links --- grid %s 
    <li> auto refresh like vite 
    <li> add livekit screenshare 
     holman 
    </div>
  </div>`

  export const livekit_connect = async (c) => {
    console.log('livekit_connect');
  
    // Identity creation with timestamp to avoid conflicts
    const jsonData = { identity: 'voice to prompt?' + Date.now() };
    const identity = jsonData.identity;
  
    if (!identity) {
      return c.text("Identity parameter is missing", 400);
    }
  
    // Connecting to LiveKit
    const json = await connect_to_livekit(jsonData);
    //console.log('Generated token and wsUrl:', json);
  
    return c.json(json);
  }


  // the wizards are humans too -- shodan was right.
const blog = `<div class="bg-slate-900 font-white">
  <div class="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none h-full">
    <div class="w-[108rem] flex-none flex justify-end">
      <picture>
        <source srcset="https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif" type="image/avif" />
        <img src="https://tailwindcss.com/_next/static/media/docs-dark@tinypng.1bbe175e.png" alt="" class="w-[90rem] flex-none max-w-none block" decoding="async" />
      </picture>
    </div>
  </div>
  <div class="text-center space-y-5 border-gray-700 border-2-b border-slate-700"></div>
  <div class="flex min-h-full bg-slate-900">
    <div class="flex w-full flex-col">
      <div class="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
        <div class="hidden md:relative md:block md:flex-none border-gray-700 border-r-2">
          <div class="absolute inset-y-0 right-0 w-[50vw]"></div>
          <div class="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block"></div>
          <div class="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block"></div>
          <div class="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-24 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
            <nav class="text-base lg:text-sm">
              <ul role="list" class="space-y-9">
                <li>
                  <ul role="list" class="mt-2 space-y-2 lg:mt-4 lg:space-y-4">
                    <li class="relative">
                      <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full font-semibold text-sky-500 before:bg-sky-500" href="/">Posts</a>
                    </li>
                    <li class="relative">
                      <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="/about">About</a>
                    </li>
                    <li class="relative">
                      <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="https://twitter.com/adnan_wahab_">Twitter</a>
                    </li>
                    <li class="relative">
                      <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="/subscribe">Subscribe</a>
                    </li>
                    <li class="relative">
                      <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="/">___</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div class="mt-8 relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
          <div class="bg-gray-900 text-gray-400">
              <div><a href="/odyssey">Robotics Odyssey</a></div>
    <div><a href="/llama-tools">llamatools</a></div>
    <div><a href="/blag">blag</a></div>
            <div class="container mx-auto px-4">
              <section class="mb-6">
                <h2 id="memory-updated" class="text-3xl font-bold mb-4">
                  <a id="memory-updated" href="https://robotics-odyssey.com"> i dedicated my life to turning bret's dreams into reality.</a>
                </h2>
                <ul class="list-none pl-0 space-y-2">
                  <li>
                    <a href="/?" class="text-xl text-gray-400 hover:underline"></a>
                  </li>
                </ul>
              </section>

              <section class="mb-6">
                <h2 class="text-3xl font-bold mb-4">Robotics Sensors</h2>
                <ul class="list-none pl-0 space-y-2">
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">zed-2i</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">realsense</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">roomba</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">lidar</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">camera</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">flash_compute_observableHQ_all_pages</a></li>
                </ul>
              </section>

              <section class="mb-6">
                <h2 class="text-3xl font-bold mb-4">Robotic Manipulators</h2>
                <ul class="list-none pl-0 space-y-2">
                  <li>
                    <a href="/?" class="text-xl text-gray-400 hover:underline">trossen</a>
                    <a href="https://github.com/wuphilipp/gello_mechanical">GitHub Link</a>
                  </li>
                  <li>
                    <a href="/?" class="text-xl text-gray-400 hover:underline">gello</a>
                    <a href="https://github.com/wuphilipp/gello_mechanical">GitHub Link</a>
                  </li>
                  <li>
                    <a href="/?" class="text-xl text-gray-400 hover:underline">shadow</a>
                    <a href="https://github.com/wuphilipp/gello_mechanical">GitHub Link</a>
                  </li>
                </ul>
              </section>

              <section class="mb-6">
                <h2 class="text-3xl font-bold mb-4">Robotic Locomotion</h2>
                <ul class="list-none pl-0 space-y-2">
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">roomba</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">segway</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">wheelchair</a></li>
                </ul>
              </section>

              <section class="mb-6">
                <h2 class="text-3xl font-bold mb-4"></h2>
                <ul class="list-none pl-0 space-y-2">
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline"></a></li>
                </ul>
              </section>

              <section class="mb-6">
                <section class="">
                  <div><a href="/llama-tools">LLama Tools</a></div>
                  <div><a href="/cgi-tools">Computer Graphics Tools</a></div>
                  <div><a href="/hardware-tools">Hardware Tools</a></div>
                </section>
                <a href="/blag-archive" class="border border-gray-600 py-2 px-4 text-gray-400 hover:bg-gray-800 inline-block">View full archive (174 essays)</a>
                <section class="py-6 border-t border-gray-700 mt-12 border-t-2">
                  <h2 class="text-3xl font-bold mb-4 text-gray-400">Get new essays sent to you</h2>
                  <p class="text-xl text-gray-400 mb-4">Subscribe to my receive updates on Robotic Hardware, Published twice weekly.</p>
                  <form action="#" method="post" class="mb-4">
                    <div class="flex space-x-2">
                      <input type="email" placeholder="Your email address" class="flex-1 p-3 bg-gray-800 border border-gray-600 text-gray-400" />
                      <button type="submit" class="bg-green-900 text-white py-2 px-4 hover:bg-green-600">Subscribe</button>
                    </div>
                  </form>
                </section>
              </section>
            </div>
          </div>
        </div>

        <div id="display" class="relative flex h-full max-w-full flex-1 flex-col overflow-hidden hidden"></div>
      </div>
      <!-- put footer here -->
    </div>
  </div>
</div>`
  
  export { blog }
  
  // I’ve devoted my _life to shortening the distance between now and dynamicland.org
    //because in 2014, bret victor - implement research papers 
    // then i picked one, link imees, and did it , and got to meet him at openvisconf and that improved my life. 
  
    // no matter how hard i  tried i could never out think bret 
  
  //   5 years - learned to convert model to text .
  
  // 2 years ago - text to text translation became super fast and accurate.
  
  // thats cool - text is now more usefful... kinda
  
  // but.... whats most useful is text to pictures to reality.
  
  // text->reality === ?!?!?!?!?!? probaboiltiy hhard to contain .
  
  // read magic ink + ladder of abstraction.
  
  // {/\* bostock VR ghost in the shell \*/}
  
  // realtalk
  
  // he said 
  
  // my goal = break down every construct needed to help make seeing space and dynamciland in every home by 2026.
  
  // bret said this was cool https://worrydream.com/LadderOfAbstraction/
  // bret said magic ink was cool 
  //but then he said -> computer could not solve the real rpobelm. they are nice. they do augment human intelligence. but thet create bubbles where veryone is in their own singple player gmae/
  //dynamic land fixes that. it is alan kay's how. 
  
  

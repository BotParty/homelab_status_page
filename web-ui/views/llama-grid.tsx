
import React from 'react';






function LlamaGrid() {
  return (

    <>
  <div class="bg-white">
    <h1>anthropic artifact - chatbot blahlalblh - makes obserable </h1>
    <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <div
        class="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2"
      >
        <div class="relative lg:col-span-4">
          <div class="absolute inset-px rounded-lg bg-white"></div>
          <div class="relative flex h-full flex-col overflow-hidden">
            <div class="container-livekit_audio"></div>
            <iframe src="/llama-backend/livekit_audio"></iframe>

            <div class="p-10 pt-4"></div>
          </div>
          <div
            class="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"
          ></div>
        </div>

        <div class="relative lg:col-span-4">
          <div class="absolute inset-px rounded-lg bg-white"></div>
          <div class="relative flex h-full flex-col overflow-hidden">
            <div class="container-cognition_engine"></div>
            <iframe src="/llama-backend/cognition_engine"></iframe>

            <div class="p-10 pt-4"></div>
          </div>
          <div
            class="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"
          ></div>
        </div>

        <div class="relative lg:col-span-4">
          <div class="absolute inset-px rounded-lg bg-white"></div>
          <div class="relative flex h-full flex-col overflow-hidden">
            <div class="container-logs_viewer"></div>
            <iframe src="/llama-backend/logs_viewer"></iframe>

            <div class="p-10 pt-4"></div>
          </div>
          <div
            class="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"
          ></div>
        </div>

        <div class="relative lg:col-span-4">
          <div class="absolute inset-px rounded-lg bg-white"></div>
          <div class="relative flex h-full flex-col overflow-hidden">
            <div class="container-import_docs"></div>
            <iframe src="/llama-backend/import_docs"></iframe>

            <div class="p-10 pt-4"></div>
          </div>
          <div
            class="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"
          ></div>
        </div>
      </div>
    </div>
  </div>
  <h1> goal by nov 1 - 1001 useful tools that shorten distance dynamicland </h1>
  </>
  // useful = perosn clisk ones and come back some time later.
  )
}
                 



//chatbot but the  - codpy code CELL or 2 possiblites = observable notebook 
//use antohrpic api - rendrer the artifact in a obs notebook - 
export default LlamaGrid;


  //   <ul class="text-blue-500">
  //   <li class="label-1">livekit_audio</li>
  //   <li class="label-3">logs_viewer</li>
  //   <li class="label-4">import_docs</li>
  //   <li class="label-5">script_reflect</li>
  //   <li class="label-6">script_obs</li>
  //   <li class="label-7">livekit_video</li>
  //   <li class="label-8">llama_searchs</li>
  //   <li class="label-8">anthropic_bot_makeobs_</li>

  //   <li class="label-1">flirt-flow-self-hosted</li>
  // </ul>
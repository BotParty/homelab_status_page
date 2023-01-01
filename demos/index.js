
//TODO put directly in HTML 
//use import map to import the demos
//use import to import all 100 and 
//use unique {demo_title}.html for SEO which imports JS file and module from CDN for reusable Template
//add demo.js to each index.html that just calls the imported DEMO


import particles from "./particles";

import basic from "./basic";

import hexagon from "./h3-hexagon";

import cube from "./cube";

import light from "./light";

import postProcessing from "./postProcessing";


let defaultDemo = 'physics';
let data = {}

async function start_loop_static(options) {
  options.data = options.data || data; //extend 

  let draw = await init(options);
  if (! draw) return alert('webgpu not defined - please install chrome canary, go to chrome://flags, search for WebGPU')
  draw(data)
  
  // requestAnimationFrame(function test() {
  //   draw(data);
  //   requestAnimationFrame(test)
  // });
}

let demoTitles = [
  'basic' , 'particles', 'hexagon', 'cube', 'light', 'postProcessing'
]

let demos = [
  basic, particles, hexagon, cube, light, postProcessing
]

  document.querySelectorAll('input').forEach(e => {
   e.addEventListener('click', (event) => {
      select(event.target.value)
    })
  })

function cleanup() {
  document.querySelector(':checked').checked = null  
  let canvas = document.querySelector('canvas')
  
  if (canvas) canvas.remove()
}

function customShader(options) {
  let start = window.location.host === "localhost:3000" ? start_loop_static : start_loop_nb;
  start(options);
}

function select(name) {
  let idx = demoTitles.indexOf(name);
  let demo = demos[idx];

  cleanup()

  window.location.hash = name;
 demo()
 
}



select(document.querySelector(':checked').value)

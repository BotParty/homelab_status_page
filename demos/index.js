import shapeTransition from "./webgl/shape-transition";
import audioTexture from "./webgl/breath";
import { init } from "../lib/main";
import rings from './shaders/ringu.wgsl?raw';
import stripes from './shaders/stripes.wgsl?raw';
import checkerboard from './shaders/checkerboard.wgsl?raw';
import * as d3 from "d3";
import one from './shaders/one.wgsl?raw';
import textureShader from './shaders/four.wgsl?raw';

let data = {
  width: 900, //based on canvas
  height: 500, //based on canvas
  pixelRatio: 2, //based on canvas
  time: 0,
  mouseX: 0,
  mouseY: 0,
  angle: 0,
};

async function start_loop_static(options) {
  options.data = options.data || data; //extend 
  let draw = await init(options);
  requestAnimationFrame(function test() {
    data.time = performance.now()
    draw(data);
    requestAnimationFrame(test)
  });
}

function textureDemo () {
  let img = document.createElement('img')
  img.src = './late.png'
  
  customShader({
    data: {texture: img},
    shader: textureShader,
  }); 
}
//last resort
let demoTitles = [
  'shapeTransition', 'audioTexture', 'stripes', 'rings', 'checkerboard', 'one', 'textureDemo'
]

let demos = [
  shapeTransition, audioTexture, stripes, rings, checkerboard, one, textureDemo
]

//make 1 draw call per thing
//inline a  loop to draw currently selected draw call
//make sure animations save state when draw call is swapped

function choose(name) {
  let idx = demoTitles.indexOf(name);
  let demo = demos[idx];

  cleanup() 
  if (typeof demo === 'function') demo()
  else {
    customShader({
      shader: demo,
    }); 
  }
}

let template = document.querySelector('template').innerHTML
let controlpanel  =  document.querySelector('#control-panel');

// d3.select('#control-panel')
// .selectAll('input')
// .data(demos)
// .join('input')
// .attr('type', 'radio')

controlpanel.innerHTML += Object.keys(demos).map(
  title => template
  .replace(/{replace_me}/g, demoTitles[title]))
  .join('\n')
  
  d3.selectAll('input')
  .on('click', (event) => {
    choose(event.target.value)
  })

  console.log('hi')
function customShader(options) {
  let start = window.location.host === "localhost:3000" ? start_loop_static : start_loop_nb;
  start(options);
}

// async function video() {
//   async function createVideo() {
//     const video = document.createElement("video");
//     video.loop = true;
//     video.autoplay = true;
//     video.muted = true;
//     video.width = "480";
//     video.height = "270";
//     video.currentTime = 15;
//     video.loop = true;
//     video.crossorigin = "anonymous";
//     video.controls = "true";
//     video.src = './data/ue5-short.webm'
//     await video.play();
//     document.body.appendChild(video);
//     return video;
//   }
//   let vid = await createVideo()
//   customShader({
//     video: vid
//   })
// }


// document.querySelectorAll("input").forEach((e) => {
//   e.addEventListener("click", (e) => {
//     console.log('name', e.target.value);
//     cleanup()
//     demos[e.target.value]()
//   });
// });

function cleanup () {
  let video = document.querySelector('video')
  if (video) document.body.removeChild(video)
  let canvas = document.querySelector('canvas')
  
  d3.selectAll('canvas').remove()
}

choose('one')
import shapeTransition from "./webgl/shape-transition";
import breath from "./webgl/breath";
import { start_loop_static, start_loop_nb } from "../src/main";
import rings from './shaders/ringu.wgsl?raw';
import stripes from './shaders/stripes.wgsl?raw';
import checkerboard from './shaders/checkerboard.wgsl?raw';
//todo add video and more 
import * as d3 from "d3";

let demoTitles = [
  'shapeTransition', 'breath', 'stripes', 'rings', 'checkerboard'
]

let demos = [
  shapeTransition, breath, stripes, rings, checkerboard
]

function choose(name) {
  let idx = demoTitles.indexOf(name);
  console.log(idx, name)
  let demo = demos[idx];

  if (idx < 2) {
    demo()
  }
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

choose('checkerboard')
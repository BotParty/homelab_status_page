import shapeTransition from "/demos/webgl/shape-transition.js";
import { init} from "/lib/main.ts?t=1668331399592";
import rings from '/demos/shaders/rings.wgsl?import&raw';
import stripes from '/demos/shaders/stripes.wgsl?import&raw';
import checkerboard from '/demos/shaders/checkerboard.wgsl?import&raw';
import one from '/demos/shaders/one.wgsl?import&raw';
import mouse from '/demos/shaders/mouse.wgsl?import&raw';
import texture from '/demos/shaders/texture.wgsl?import&raw';
import sky from '/demos/shaders/sky.wgsl?import&raw';

import four from  '/demos/shaders/four.wgsl?import&raw'

import five from  '/demos/shaders/five.wgsl?import&raw'
// import hello from  '/Users/awahab/Simple-webgpu-compute/demos/shaders/morning.wgsl?raw'
import music from  '/demos/shaders/music.wgsl?import&raw'


import six from  '/demos/shaders/six.wgsl?import&raw'

import seven from  '/demos/shaders/seven.wgsl?import&raw'

import light from  '/demos/shaders/light.wgsl?import&raw'

//import halfBaked from  '/Users/awahab/Simple-webgpu-compute/demos/shaders/halfBaked.wgsl?raw'

import physics from "/demos/webgl/physics.js?t=1668331399592";

import postProcessing from "/demos/postProcessing.js?t=1668331399592";

import signalvsNoise from  '/demos/shaders/signal.wgsl?import&raw'

let defaultDemo = 'signal';
let data = {}
let stuff 
// function then(stream) {
//   const context = new AudioContext();
//   const analyser = context.createAnalyser();
//   context.createMediaStreamSource(stream).connect(analyser);
//   const fftSize = analyser.frequencyBinCount;
//   const frequencies = new Uint8Array(fftSize);
//   stuff = function abc() {
//     if (analyser)analyser.getByteFrequencyData(frequencies);
//     return frequencies;
//   }
// }
// (async function () {
//   let stream = await navigator.mediaDevices
//   .getUserMedia({ audio: true })
//   .then(then)
// })();


async function start_loop_static(options) {
  options.data = options.data || data; //extend 
  console.log('start draw loop')
  //options.data.texture = '../data/static.jpg'

  let draw = await init(options);
  draw(data);
  console.log('drawn')
  
  requestAnimationFrame(function test() {
    if (stuff) data.texture = stuff()
    draw(data);
      requestAnimationFrame(test)
      //setTimeout(test, 500)
  });
}

function textureDemo() {
  let img = document.createElement('img')
  img.src = './october.jpg'
  
  customShader({
    data: {texture: img},
    shader: textureShader,
  }); 
}

let demoTitles = [
  'signalvsNoise',  'stripes', 'rings', 'checkerboard', 'one', 'mouse', 'texture', 'sky', 
   'four', 'five', 'music', 'six', 'seven', 'light', 'physics', 
   'postProcessing', 
]

let demos = [
  signalvsNoise,  stripes, rings, checkerboard, one, mouse, texture, sky,
  four, five, music, six, seven, light, physics, postProcessing
]
function select(name) {
  let idx = demoTitles.indexOf(name);
  let demo = demos[idx];

  cleanup() 
  document.querySelectorAll('input')[idx].checked = true
  if (typeof demo === 'function') demo()
  else {
    customShader({
      shader: demo,
    }); 
  }
}

let template = document.querySelector('template').innerHTML
let controlpanel  =  document.querySelector('#control-panel');

controlpanel.innerHTML += Object.keys(demos).map(
  title => template
  .replace(/{template}/g, demoTitles[title]))
  .join('\n')
  
  document.querySelectorAll('input').forEach(e => {
   e.addEventListener('click', (event) => {
      select(event.target.value)
    })
  })

function customShader(options) {
  let start = window.location.host === "localhost:3001" ? start_loop_static : start_loop_nb;
  start(options);
}

function cleanup () {
  document.querySelector(':checked').checked = null  
  let canvas = document.querySelector('canvas')
  if (canvas) canvas.remove()
}

let choice = 0
function choose (idx) {
  let input = document.querySelectorAll('input')
  if (idx) choice = idx
  input[ 0 ].click()
}

//setInterval(choose, 2500)
choose(demoTitles.indexOf(defaultDemo))

document.querySelectorAll('label').forEach((el, idx) =>
  el.addEventListener('mouseover', () => {
    cleanup() 
    choose(idx)
  })
)
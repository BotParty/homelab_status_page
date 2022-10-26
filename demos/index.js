import shapeTransition from "./webgl/shape-transition";
import audioTexture from "./webgl/breath";
import { init } from "../lib/main";
import rings from './shaders/ringu.wgsl?raw';
import stripes from './shaders/stripes.wgsl?raw';
import checkerboard from './shaders/checkerboard.wgsl?raw';
import one from './shaders/one.wgsl?raw';
import mouse from './shaders/mouse.wgsl?raw';
import five from './shaders/five.wgsl?raw';

let data = {
  // width: 900, //based on canvas
  // height: 500, //based on canvas
  // pixelRatio: 2, //based on canvas
  // time: 0,
  // mouseX: 0,
  // mouseY: 0,
  // angle: 0,
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
let demoTitles = [
  'shapeTransition', 'audioTexture', 'stripes', 'rings', 'checkerboard', 'one', 'mouse', 'five'
]

let demos = [
  shapeTransition, audioTexture, stripes, rings, checkerboard, one, mouse, five
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
  .replace(/{replace_me}/g, demoTitles[title]))
  .join('\n')
  
  
  document.querySelectorAll('input').forEach(e => {
   e.addEventListener('click', (event) => {
      select(event.target.value)
    })
  })
  

function customShader(options) {
  let start = window.location.host === "localhost:3000" ? start_loop_static : start_loop_nb;
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
  else  choice += 1;
  input[choice].click()
}

//setInterval(choose, 2500)
choose(5)

document.querySelectorAll('label').forEach((el, idx) =>
  el.addEventListener('mouseover', () => {
    cleanup() 

    choose(idx)
  })
)
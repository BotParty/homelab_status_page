
import particles from "./particles";

import basic from "./basic";

let defaultDemo = 'physics';
let data = {}

async function start_loop_static(options) {
  options.data = options.data || data; //extend 
  options.canvas = document.querySelector('canvas')
  options.data.texture = img

  let draw = await init(options);
  if (! draw) return alert('webgpu not defined - please install chrome canary, go to chrome://flags, search for WebGPU')
  draw(data)
  
  requestAnimationFrame(function test() {
    draw(data);
    requestAnimationFrame(test)
  });
}

let demoTitles = [
  'basic' , 'particles'
]

let demos = [
  basic, particles
]

  document.querySelectorAll('input').forEach(e => {
   e.addEventListener('click', (event) => {
      select(event.target.value)
    })
  })

// function select(name) {
//   let idx = demoTitles.indexOf(name);
//   let demo = demos[idx];
//   cleanup() 
//   customShader({
//     shader: demo
//   })
//   // document.querySelectorAll('input')[idx].checked = true
//   // if (typeof demo === 'function') demo()
//   // else {
//   //   customShader({
//   //     shader: demo,
//   //   }); 
//   // }
// }

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

  //cleanup()
  if (typeof demo === 'string' )
    customShader({
      shader: demo,
    }); 
    else demo()
    
}

select(document.querySelector(':checked').value)

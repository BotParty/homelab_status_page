import abc from './abc';
import seven from  './shaders/stripes.wgsl?raw'

 abc()



import { init } from "../lib/main";

// import stripes from './shaders/stripes.wgsl?raw';
// import checkerboard from './shaders/checkerboard.wgsl?raw';
// import one from './shaders/one.wgsl?raw';
// import mouse from './shaders/mouse.wgsl?raw';
// import texture from './shaders/texture.wgsl?raw';
// import sky from './shaders/sky.wgsl?raw';

// import four from  './shaders/four.wgsl?raw'

// import five from  './shaders/five.wgsl?raw'
// import music from  './shaders/music.wgsl?raw'

// import six from  './shaders/six.wgsl?raw'

// import seven from  './shaders/seven.wgsl?raw'

// import light from  './shaders/light.wgsl?raw'

// import physics from "./webgl/physics";

// import postProcessing from "./postProcessing";

// import signalvsNoise from  './shaders/signal.wgsl?raw'


// let defaultDemo = 'physics';
 let data = {}
 //start_loop_static({shader: seven})
async function start_loop_static(options) {
  options.data = options.data || data; 
  console.log(555)

  console.log(888)
  // options.data.texture = '../data/static.jpg';

  // const img = new Image();
  // img.src = '../data/static.jpg';

  // options.data.texture =  img

  let draw = await init(options);
  draw(data);
  
  requestAnimationFrame(function test() {
    //if (stuff) data.texture = stuff()
    draw(data);
      requestAnimationFrame(test)
      //setTimeout(test, 500)
  });
}

// let demoTitles = [
//   'signalvsNoise',  'stripes', 'rings', 'checkerboard', 'one', 'mouse', 'texture', 'sky', 
//   'four', 'five', 'music', 'six', 'seven', 'light', 'physics', 
//   'postProcessing', 
// ]

// let demos = [
//   signalvsNoise,  stripes, rings, checkerboard, one, mouse, texture, sky,

//    four, five, music, six, seven, light, physics, postProcessing
// ]

//   document.querySelectorAll('input').forEach(e => {
//    e.addEventListener('click', (event) => {
//       select(event.target.value)
//     })
//   })

// function customShader(options) {
//   let start = window.location.host === "localhost:3000" ? start_loop_static : start_loop_nb;
//   start(options);
// }

// function select(name) {
//   let idx = demoTitles.indexOf(name);
//   let demo = demos[idx];

//   if (typeof demo === 'string' )
//     customShader({
//       shader: demo,
//     }); 
//     else demo()
// }

// select(document.querySelector(':checked').value)

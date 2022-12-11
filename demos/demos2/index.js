import quad from './quad'
import particles from  './particle'
import points from './points'
import lines from './lines'
import imgTexture from './imgTexture'
import audioTexture from './audioTexture'
import physics from "./webgl/physics";

let defaultDemo = 'physics';
 let data = {}
 //start_loop_static({shader: seven})
 //
//particles()
//gladly trade relationships and secrets for finishing module sooner. 

async function start_loop_static(options) {
  options.data = options.data || data; 
  options.clearValue =  { r: 0.1, g: 0.1, b: 0.1, a: 1.0 }
  
  
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

let demoTitles = [
 'quad', 'particles', 'points', 'lines', 'imgTexture', 
 'audioTexture', 'physics' 
]

let demos = [
  quad, particles, points, lines, imgTexture, audioTexture, physics
]

  document.querySelectorAll('input').forEach(e => {
   e.addEventListener('click', (event) => {
      select(event.target.value)
    })
  })

// function customShader(options) {
//   let start = window.location.host === "localhost:3000" ? start_loop_static : start_loop_nb;
//   start(options);
// }

function select(name) {
  let idx = demoTitles.indexOf(name);
  let demo = demos[idx];

  console.log(demo)
demo.init()
  // if (typeof demo === 'string' )
  //   customShader({
  //     shader: demo,
  //   }); 
  //   else demo()
}

import shapeTransition from "./webgl/shape-transition";
import breath from "./webgl/breath";
import { start_loop_static, start_loop_nb } from "../src/main";
import ringShader from './rings.wgsl?raw';
import stripesShader from './stripes.wgsl?raw';
import checkerboardShader from './checkerboard.wgsl?raw';
//todo add video and more 
let demos = {
  shapeTransition, breath, stripes, rings, checkerboard//, video
}

function stripes()  {
  video({
    shader: stripesShader,
  });
}

function rings() {
  customShader({
    shader: ringShader,
  });
}

function checkerboard() {
  customShader({
    shader: checkerboardShader,
  });
}

let template = document.querySelector('template').innerHTML

let controlpanel  =  document.querySelector('#control-panel');

controlpanel.innerHTML += Object.keys(demos).map(
  title => template
  .replace(/{replace_me}/g, title))
  .join('\n')


function customShader(options) {
  let start = window.location.host === "localhost:3000" ? start_loop_static : start_loop_nb;
  start(options);
}

async function video() {
  async function createVideo() {
    const video = document.createElement("video");
    video.loop = true;
    video.autoplay = true;
    video.muted = true;
    video.width = "480";
    video.height = "270";
    video.currentTime = 15;
    video.loop = true;
    video.crossorigin = "anonymous";
    video.controls = "true";
    video.src = './data/ue5-short.webm'
    await video.play();
    document.body.appendChild(video);
    return video;
  }
  let vid = await createVideo()
  customShader({
    video: vid
  })
}
video()
//todo make this swap between demos in a elegant but not too abstract way. 
//or just glue it together
document.querySelectorAll("input").forEach((e) => {
  e.addEventListener("click", (e) => {
    console.log('name', e.target.value);
    cleanup()
    demos[e.target.value]()
    
  });
});

function cleanup () {
  console.log('hello')
  let video = document.querySelector('video')
  if (video) document.body.removeChild(video)
  let canvas = document.querySelector('canvas')

  document.body.removeChild(canvas)
}
//checkbox to hide and show layer
//checkbox = hide / show
//each checked layer adds its config to the control-panel
//get back to nb by fixing video(clean up code first while keeping resources in same interpreter context no random async)
//passing data between canvas's & compute shaders probably is waay slower than reading it back into js-land and back into worker/gpu
//but for demo-driven-development, could use 5 canvas's and pass the data back to js-land so its easy to read/debug
//then convert to all one canvas after
//prettier-ignore
//
//future planning - end in mind
//1. audio visualizer of microphone
//2. video - visualize the color channel histogram  (how much of each color is in the frame vs under the pixel under mouse...)
//3. video - turn the pixels into sand and fall through a hour glass and then blow away in the wind from the top layer ()
//4. heatmap - hex binning via h3 - main / difficult layer for my side-project. other layers just inform this one.
//5. scatterplot = svg
//6. map = mapboxgl

//audio from microphone = 1 texture
//sand simulation = 2 textures ping ponging w/ compute shaders calculating vel/pos
//video = 1 texture
//video analysis = = 2 textures ping ponging w/ compute shaders counting values

//heatmap = count how many trees / service_requests are in that hexagonal 'bucket'/bin

//hard part is doing it in a simple and modular way so the legos can be taken out

//challenging parts = data flow between gpgpu layers w/ a (declarative / non)-api like yaml/regl/d3-selection/vega
//as little api surface area but not 'magic' just exposing webgpu's built-in design w/o boilerplate
//multi canvas vs 1 canvas many renderTarget - profile

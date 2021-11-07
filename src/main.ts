// import {
//   makeVideoBindGroupDescriptor,
//   webGPUTextureFromImageUrl,
//   recordRenderPass,
//   bindGroup,
//   updateUniforms,
//   makePipeline,
//   makeShaderModule,
//   init,
//   start_loop,
//   createVideo,
// } from "./utils";
//import createVideo from "./utils";

import { scaleLinear } from "d3-scale";

let a = {
  static: 35044,
  dynamic: 35048,
  stream: 35040,
};

let c = {
  "[object Int8Array]": 5120,
  "[object Int16Array]": 5122,
  "[object Int32Array]": 5124,
  "[object Uint8Array]": 5121,
  "[object Uint8ClampedArray]": 5121,
  "[object Uint16Array]": 5123,
  "[object Uint32Array]": 5125,
  "[object Float32Array]": 5126,
  "[object Float64Array]": 5121,
  "[object ArrayBuffer]": 5121,
};

let b = {
  int8: 5120,
  int16: 5122,
  int32: 5124,
  uint8: 5121,
  uint16: 5123,
  uint32: 5125,
  float: 5126,
  float32: 5126,
};

async function createVideo() {
  const video = document.createElement("video");
  video.loop = true;
  video.autoplay = true;
  video.muted = true;
  video.width = "480";
  video.height = "270";
  video.currentTime = 25;
  video.loop = true;
  video.crossorigin = "anonymous";
  video.controls = "true";
  video.src = "./data/ue5-short.webm";
  video.style.zIndex = -1002;
  video.style.position = "absolute";
  await video.play();
  document.body.appendChild(video);
  return video;
}
import init from "./utils";

let data = {
  width: 900, //based on canvas
  height: 500, //based on canvas
  pixelRatio: 2, //based on canvas
  time: 0,
  mouseX: 0,
  mouseY: 0,
  angle: 0,
  //texture: (video)
};
let helloWorld: string = "hello";
console.log("a");
const width = 960,
  height = 500;
//user land below
async function start_loop_nb() {
  const canvas = document.createElement("canvas");

  canvas.addEventListener("mousemove", function (e) {
    data.mouseX = e.clientX / width;
    data.mouseY = e.clientY / height;
  });

  let copiedData = Object.assign({}, data); //should come from args
  copiedData.time = Date.now() % 1000; //le clock
  let options = { data: copiedData, canvas: canvas, width, height };
  let state = await init.init(options);
  let next_state = state.draw(state); //this should have all the inner stuff
  return next_state;
}

async function start_loop_static(options) {
  const canvas = document.querySelector(".three");

  let video = await createVideo();
  let copiedData = Object.assign({}, data); //should come from args
  copiedData.texture = video;

  let stuff = { data: copiedData, canvas: canvas, width, height, ...options}
  stuff.width = canvas.clientWidth
  stuff.height = canvas.clientHeight
  
  let state = await init.init(stuff);
  requestAnimationFrame(function test() {
    data.time = performance.now();
    //console.log('test')
    //console.log('oo')
    state.updateUniforms(data);
    let next_state = state.draw(state);

    requestAnimationFrame(test)
  });
  let scaleX = scaleLinear().domain([0, 1]).range([0, 0.3]);

  let scaleY = scaleLinear().domain([1, 0]).range([0, 1]);
  canvas.addEventListener("mousemove", function (e) {
    //console.log('updating uniforms');
    data.mouseX = scaleX(e.clientX / e.target.clientWidth);
    data.mouseY = scaleY(e.clientY / e.target.clientHeight);
    ///console.log(data.time)
    //console.log(data.mouseX, data.mouseY);
    state.updateUniforms(data);
  });

  //return next_state;
  // requestAnimationFrame(async function () {
  //   let canvas = start_loop().then((stuff) => {
  //     //stuff has to have a canvas to add to vue / anything
  //     document.body.append(stuff.canvas);
  //   });
  // });
}

export { start_loop_static, start_loop_nb };

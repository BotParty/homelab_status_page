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
  video.src = "./data/test-video.webm";
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

async function start_loop_static() {
  const canvas = document.createElement("canvas");
  canvas.addEventListener("mousemove", function (e) {
    data.mouseX = e.clientX / width;
    data.mouseY = e.clientY / height;
  });
  let video = await createVideo();
  let copiedData = Object.assign({}, data); //should come from args
  copiedData.time = Date.now() % 1000; //le clock
  copiedData.texture = video;
  let options = { data: copiedData, canvas: canvas, width, height };

  let state = await init.init(options);
  document.querySelector("#container").appendChild(state.canvas);
  let next_state = state.draw(state); //this should have all the inner stuff
  return next_state;
  // requestAnimationFrame(async function () {
  //   let canvas = start_loop().then((stuff) => {
  //     //stuff has to have a canvas to add to vue / anything
  //     document.body.append(stuff.canvas);
  //   });
  // });
}

let main =
  window.location.host === "localhost:3000" ? start_loop_static : start_loop_nb;

if (window.location.host === "localhost:3000") main();
export default main;

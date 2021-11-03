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

async function start_loop_nb() {
  const canvas = document.createElement("canvas");
  canvas.addEventListener("mousemove", function (e) {
    data.mouseX = e.clientX / width;
    data.mouseY = e.clientY / height;
  });
  let copiedData = Object.assign({}, data); //should come from args
  copiedData.time = Date.now() % 1000; //le clock
  let options = { data: copiedData, canvas: canvas, width, height };
  //stuff.video = createVideo();
  //let video = stuff.video; oops
  //await video.play();
  //init returns a draw call with a canvas on it.... for chrome extension
  //init could just return an object with draw, canvas, and state
  //i would mutate state inbetween draw calls
  //and append / hide canvas to whatever framekwork (vue, obs, react, etc)
  let state = await init.init(options);
  let next_state = state.draw(state); //this should have all the inner stuff
  return next_state;
  //console.log("o-land");
  //this block should get compiled  out by vite so still fast like regl
}

console.log("hi");
async function start_loop_static() {
  const canvas = document.createElement("canvas");
  canvas.addEventListener("mousemove", function (e) {
    data.mouseX = e.clientX / width;
    data.mouseY = e.clientY / height;
  });
  let copiedData = Object.assign({}, data); //should come from args
  copiedData.time = Date.now() % 1000; //le clock
  let options = { data: copiedData, canvas: canvas, width, height };
  console.log("test");
  //stuff.video = createVideo();
  //let video = stuff.video; oops
  //await video.play();
  //init returns a draw call with a canvas on it.... for chrome extension
  //init could just return an object with draw, canvas, and state
  //i would mutate state inbetween draw calls
  //and append / hide canvas to whatever framekwork (vue, obs, react, etc)
  let state = await init.init(options);

  console.log(init);
  let next_state = state.draw(state); //this should have all the inner stuff
  return next_state;
  // requestAnimationFrame(async function () {
  //   let canvas = start_loop().then((stuff) => {
  //     //stuff has to have a canvas to add to vue / anything
  //     document.body.append(stuff.canvas);
  //   });
  // });
}

console.log("123");

let main =
  window.location.host === "localhost:3000" ? start_loop_static : start_loop_nb;

main();
export default main;

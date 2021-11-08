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


import init from "./utils";


let helloWorld: string = "hello";

//user land below
let width = 960, height = 500;
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
let data = {
  width: 900, //based on canvas
  height: 500, //based on canvas
  pixelRatio: 2, //based on canvas
  time: 0,
  mouseX: 0,
  mouseY: 0,
  angle: 0,
};
async function start_loop_static(options) {
  let copiedData = Object.assign({}, data); //should come from args
  //only stuff about whats being rendered should be required.
  options.data = copiedData;
  let state = await init.init(options);
  addMouseEvents(state);
console.log(options.data)
  requestAnimationFrame(function test() {
    //console.log(data.time)
    data.time = performance.now();
    //state.updateUniforms(data);
    let next_state = state.draw(state);
    //requestAnimationFrame(test)
    setInterval(test, 250)
//    console.log('cool', data.time)
  });
  
  //return next_state;
  // requestAnimationFrame(async function () {
  //   let canvas = start_loop().then((stuff) => {
  //     //stuff has to have a canvas to add to vue / anything
  //     document.body.append(stuff.canvas);
  //   });
  // });
}


function addMouseEvents(state) {
  let scaleX = scaleLinear().domain([0, 1]).range([0, 0.3]);

  let scaleY = scaleLinear().domain([1, 0]).range([0, 1]);
  state.canvas.addEventListener("mousemove", function (e) {
    data.mouseX = scaleX(e.clientX / e.target.clientWidth);
    data.mouseY = scaleY(e.clientY / e.target.clientHeight);
    ///console.log(data.time)
    //console.log(data.mouseX, data.mouseY);
    state.updateUniforms(data);
  });
}

export { start_loop_static, start_loop_nb };

import { scaleLinear } from "d3-scale";

import init from "./utils";


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
  //only stuff about whats being rendered should be required.
  options.data = data;
  let state = await init.init(options);
  addMouseEvents(state);
  requestAnimationFrame(function test() {
    data.time = Date.now() % 1000 / 1000
    
    //state.updateUniforms(data);
    let next_state = state.draw(state);
    //requestAnimationFrame(test)
    setTimeout(test, 250)
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
    state.updateUniforms(data);
  });
}

export { start_loop_static, start_loop_nb };

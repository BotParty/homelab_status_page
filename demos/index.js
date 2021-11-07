import start from "./webgl/shape-transition";
import breath from "./webgl/breath";
import { start_loop_static, start_loop_nb } from "../src/main";
import shader from './two.wgsl?raw';
//stripes = 0

function map() {
  //document.querySelector('#embed').classList +=
}

let video =
  window.location.host === "localhost:3000" ? start_loop_static : start_loop_nb;
video({
  shader: shader,

});
document.querySelectorAll("input").forEach((e) => {

  return void 0
  e.addEventListener("click", (e) => {
    console.log(e.target.name);
    e.target.classList.toggle("dot");
    if ("breath" === e.target.name) breath();
    if ("shape-transition" === e.target.name) start();
    if ("webgpu-video" === e.target.name) video();
    if ("map" === e.target.name) map();
  });
});





//checkbox to hide and show layer
//checkbox = hide / show
//each checked layer adds its config to the control-panel
//get back to nb by fixing video(clean up code first while keeping resources in same interpreter context no random async)
//passing data between canvas's & compute shaders probably is waay slower than reading it back into js-land and back into worker/gpu
//but for demo-driven-development, could use 5 canvas's and pass the data back to js-land so its easy to read/debug
//then convert to all one canvas after
//prettier-ignore
//
//
//
//
//
//
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

import { init } from "../lib/main";
import stripes from '../demos/shaders/stripes.wgsl?raw'

const tileDim = 128;
const batch = [4, 4];
const blockDim = 15

console.log()
const options = {
  data: {},
  texture: '../data.png',
  shader: stripes,
  compute: {
    shader: blur,
    dispatchWorkGroups: () => {
      return [
        Math.ceil(800 / blockDim),
        Math.ceil(600 / batch[1])
      ]
    },
  }  
}
async function physics() {
  options.data = options.data  //extend 
  let draw = await init(options);
  draw({});

  requestAnimationFrame(function test() {
    draw({});
      requestAnimationFrame(test)

  });
  }
  
  export default physics;
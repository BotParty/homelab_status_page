import { init } from "../lib/main";
import stripes from '../demos/shaders/stripes.wgsl?raw'

const tileDim = 128;
const batch = [4, 4];

console.log()
const options = {
  data: {},
  texture: '../data.png',
  shader: stripes,
  compute: {
    shader: blur,
    dispatchWorkGroups: () => {
      return computePass.dispatchWorkgroups(
        Math.ceil(srcHeight / blockDim),
        Math.ceil(srcWidth / batch[1])
       )
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
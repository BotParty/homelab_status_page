import { init } from "../lib/main";
import stripes from '../demos/shaders/stripes.wgsl?raw'


//change uniforms
//make data available in all shaders
//
//2 stages, compute and screen


const options = {
  data: {},
  texture: '../data.png',
  shader: stripes,
  compute: {
    shader: blur,
    
  }  
//   compute: { //optional
//    simParams:{
//       deltaT: 0.04,
//       rule1Distance: 0.1,
//       rule2Distance: 0.025,
//       rule3Distance: 0.025,
//       rule1Scale: 0.02,
//       rule2Scale: 0.05,
//       rule3Scale: 0.005,
//     },
//   }
}

//make compute pipeline with a blur shader

// what are buffer 0,1 for ?
//blur params = uniforms
//compute constants 
    //binding 0,1
//compute bind group
    //1 , 2 ,3

    //why are there two bind group layouts 

    //block dimensions = number 
//computePass.dispatchWorkGroups - why are there two


//add texture

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
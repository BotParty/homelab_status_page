//import simpleWebgpu from "../lib/main";
import simpleWebgpu from '../lib/main';

// Calling simplewebgpu.init() creates a new partially evaluated draw command
let webgpu = await simpleWebgpu.init()
//console.log(webgpu)
//module thinks this is a draw call but its actually an init draw call
const draw = await webgpu.initDrawCall({
  // Shaders in simplewebgpu. are just strings.  You can use glslify or whatever you want
  // to define them.  No need to manually create shader objects.
  frag: `
  @fragment
  fn main(
    //@location(0) position: vec4<f32>,
    //@location(1) color: vec4<f32>,
  ) -> @location(0) vec4<f32> {
    //return color;
    return vec4(.5, 0.0, .0, 1.0);
  }`,

  vert: `
  struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
   // Color: vec3<f32>,
  }

  @vertex
  fn main (
    @builtin(vertex_index) VertexIndex : u32,
    @location(0) position : vec2<f32>,
    @location(1) color : vec3<f32>,
  ) -> VertexOutput {

  var output: VertexOutput;
  //output.Color = color;

  output.Position = vec4<f32>(position.xy, 0.0, 1.0);
  return output;
  }`,

  // Here we define the vertex attributes for the above shader
  attributes: {
    // simplewebgpu.buffer creates a new array buffer object
    position: webgpu.buffer([
      [.0, .5],   // no need to flatten nested arrays, simpleWebgpu automatically
      [-0.5, -0.5],    // unrolls them into a typedarray (default Float32)
      [.5,  -.5]
    ]), color: webgpu.buffer([
      [1,0,0],
      [0,1,0],
      [1,0,1],
    ])
    // simpleWebgpu automatically infers sane defaults for the vertex attribute pointers
  },

  uniforms: {
    // This defines the color of the triangle to be a dynamic variable
    color: webgpu.prop('color')
  },

  // This tells simpleWebgpu the number of vertices to draw in this command
  count: 3
})

// webgpu.frame() wraps requestAnimationFrame and also handles viewport changes

function particles () {
  let time = 0
console.log('draw Triangle', 234)
  draw({
        color: [
          Math.cos(time * 0.001),
          Math.sin(time * 0.0008),
          Math.cos(time * 0.003),
          1
        ]
      })

      draw({
        color: [
          Math.cos(time * 0.001),
          Math.sin(time * 0.0008),
          Math.cos(time * 0.003),
          1
        ]
      })
}

export default particles

// simpleWebgpu.frame(({time}) => {
//   // clear contents of the drawing buffer
//   simpleWebgpu.clear({
//     color: [0, 0, 0, 0],
//     depth: 1
//   })

//   // draw a triangle using the command defined above
//   drawTriangle({
//     color: [
//       Math.cos(time * 0.001),
//       Math.sin(time * 0.0008),
//       Math.cos(time * 0.003),
//       1
//     ]
//   })
// })
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
    return vec4(2., 0.0, .9, 1.0);
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

function basic () {
  let time = 0
  console.log('draw Triangle', Math.random())
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

export default basic

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


/*
  tags: basic

  <p>This example show how you can render point particles in regl</p>
 */

  // const regl = require('../regl')()
  // const mat4 = require('gl-mat4')
  // const hsv2rgb = require('hsv2rgb')
  
  // const NUM_POINTS = 1e4
  // const VERT_SIZE = 4 * (4 + 4 + 3)
  
  // const pointBuffer = regl.buffer(Array(NUM_POINTS).fill().map(function () {
  //   const color = hsv2rgb(Math.random() * 360, 0.6, 1)
  //   return [
  //     // freq
  //     Math.random() * 10,
  //     Math.random() * 10,
  //     Math.random() * 10,
  //     Math.random() * 10,
  //     // phase
  //     2.0 * Math.PI * Math.random(),
  //     2.0 * Math.PI * Math.random(),
  //     2.0 * Math.PI * Math.random(),
  //     2.0 * Math.PI * Math.random(),
  //     // color
  //     color[0] / 255, color[1] / 255, color[2] / 255
  //   ]
  // }))
  
  // const drawParticles = regl({
  //   vert: `
  //   precision mediump float;
  //   attribute vec4 freq, phase;
  //   attribute vec3 color;
  //   uniform float time;
  //   uniform mat4 view, projection;
  //   varying vec3 fragColor;
  //   void main() {
  //     vec3 position = 8.0 * cos(freq.xyz * time + phase.xyz);
  //     gl_PointSize = 5.0 * (1.0 + cos(freq.w * time + phase.w));
  //     gl_Position = projection * view * vec4(position, 1);
  //     fragColor = color;
  //   }`,
  
  //   frag: `
  //   precision lowp float;
  //   varying vec3 fragColor;
  //   void main() {
  //     if (length(gl_PointCoord.xy - 0.5) > 0.5) {
  //       discard;
  //     }
  //     gl_FragColor = vec4(fragColor, 1);
  //   }`,
  
  //   attributes: {
  //     freq: {
  //       buffer: pointBuffer,
  //       stride: VERT_SIZE,
  //       offset: 0
  //     },
  //     phase: {
  //       buffer: pointBuffer,
  //       stride: VERT_SIZE,
  //       offset: 16
  //     },
  //     color: {
  //       buffer: pointBuffer,
  //       stride: VERT_SIZE,
  //       offset: 32
  //     }
  //   },
  
  //   uniforms: {
  //     view: ({tick}) => {
  //       const t = 0.01 * tick
  //       return mat4.lookAt([],
  //         [30 * Math.cos(t), 2.5, 30 * Math.sin(t)],
  //         [0, 0, 0],
  //         [0, 1, 0])
  //     },
  //     projection: ({viewportWidth, viewportHeight}) =>
  //       mat4.perspective([],
  //         Math.PI / 4,
  //         viewportWidth / viewportHeight,
  //         0.01,
  //         1000),
  //     time: ({tick}) => tick * 0.001
  //   },
  
  //   count: NUM_POINTS,
  
  //   primitive: 'points'
  // })
  
  // regl.frame(() => {
  //   regl.clear({
  //     depth: 1,
  //     color: [0, 0, 0, 1]
  //   })
  
  //   drawParticles()
  // })
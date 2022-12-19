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
  fn main_fragment() -> @location(0) vec4<f32> {
    return vec4(1.0, 0.0, 0.0, 1.0);
  }`,

  vert: `
  @vertex
  fn main_vertex(
    @builtin(vertex_index) VertexIndex : u32
  ) -> @builtin(position) vec4<f32> {
    var pos = array<vec2<f32>, 3>(
      vec2(0.0, 0.5),
      vec2(-0.5, -0.5),
      vec2(0.5, -0.5));
  
    return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
  }`,

  // Here we define the vertex attributes for the above shader
  attributes: {
    // simplewebgpu.buffer creates a new array buffer object
    position: webgpu.buffer([
      [-2, -2],   // no need to flatten nested arrays, simpleWebgpu automatically
      [4, -2],    // unrolls them into a typedarray (default Float32)
      [4,  4]
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

function drawTriangle () {
  let time = 0
  //console.log('draw Triangle', webgpu)
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

export default drawTriangle

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
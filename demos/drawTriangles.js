//const webgpu = require('simple-webgpu')

import simpleWebgpu from "../../lib/main";

// Calling simplewebgpu.init() creates a new partially evaluated draw command
const drawTriangle = simpleWebgpu.init({

  // Shaders in simplewebgpu. are just strings.  You can use glslify or whatever you want
  // to define them.  No need to manually create shader objects.
  frag: `
    precision mediump float;
    uniform vec4 color;
    void main() {
      gl_FragColor = color;
    }`,

  vert: `
    precision mediump float;
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0, 1);
    }`,

  // Here we define the vertex attributes for the above shader
  attributes: {
    // simplewebgpu.buffer creates a new array buffer object
    position: simpleWebgpu.buffer([
      [-2, -2],   // no need to flatten nested arrays, simpleWebgpu automatically
      [4, -2],    // unrolls them into a typedarray (default Float32)
      [4,  4]
    ])
    // simpleWebgpu automatically infers sane defaults for the vertex attribute pointers
  },

  uniforms: {
    // This defines the color of the triangle to be a dynamic variable
    color: simpleWebgpu.prop('color')
  },

  // This tells simpleWebgpu the number of vertices to draw in this command
  count: 3
})

// webgpu.frame() wraps requestAnimationFrame and also handles viewport changes

function drawTrianglesDemo () {
    drawTriangle({
        color: [
          Math.cos(time * 0.001),
          Math.sin(time * 0.0008),
          Math.cos(time * 0.003),
          1
        ]
      })
}

export default drawTrianglesDemo

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
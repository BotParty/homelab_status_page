//import simpleWebgpu from "../lib/main";
import simpleWebgpu from '../lib/main';
import { mat4, vec3 } from 'gl-matrix';


const cubeVertexSize = 4 * 10; // Byte size of one cube vertex.
const cubePositionOffset = 0;
const cubeColorOffset = 4 * 4; // Byte offset of cube vertex color attribute.
const cubeUVOffset = 4 * 8;
const cubeVertexCount = 36;

// prettier-ignore
const cubeVertexArray = ([
  //float4 position, float4 color, float2 uv,
  1, -1, 1, 1,   1, 0, 1, 1,  1, 1,
  -1, -1, 1, 1,  0, 0, 1, 1,  0, 1,
  -1, -1, -1, 1, 0, 0, 0, 1,  0, 0,
  1, -1, -1, 1,  1, 0, 0, 1,  1, 0,
  1, -1, 1, 1,   1, 0, 1, 1,  1, 1,
  -1, -1, -1, 1, 0, 0, 0, 1,  0, 0,

  1, 1, 1, 1,    1, 1, 1, 1,  1, 1,
  1, -1, 1, 1,   1, 0, 1, 1,  0, 1,
  1, -1, -1, 1,  1, 0, 0, 1,  0, 0,
  1, 1, -1, 1,   1, 1, 0, 1,  1, 0,
  1, 1, 1, 1,    1, 1, 1, 1,  1, 1,
  1, -1, -1, 1,  1, 0, 0, 1,  0, 0,

  -1, 1, 1, 1,   0, 1, 1, 1,  1, 1,
  1, 1, 1, 1,    1, 1, 1, 1,  0, 1,
  1, 1, -1, 1,   1, 1, 0, 1,  0, 0,
  -1, 1, -1, 1,  0, 1, 0, 1,  1, 0,
  -1, 1, 1, 1,   0, 1, 1, 1,  1, 1,
  1, 1, -1, 1,   1, 1, 0, 1,  0, 0,

  -1, -1, 1, 1,  0, 0, 1, 1,  1, 1,
  -1, 1, 1, 1,   0, 1, 1, 1,  0, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,
  -1, -1, -1, 1, 0, 0, 0, 1,  1, 0,
  -1, -1, 1, 1,  0, 0, 1, 1,  1, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,

  1, 1, 1, 1,    1, 1, 1, 1,  1, 1,
  -1, 1, 1, 1,   0, 1, 1, 1,  0, 1,
  -1, -1, 1, 1,  0, 0, 1, 1,  0, 0,
  -1, -1, 1, 1,  0, 0, 1, 1,  0, 0,
  1, -1, 1, 1,   1, 0, 1, 1,  1, 0,
  1, 1, 1, 1,    1, 1, 1, 1,  1, 1,

  1, -1, -1, 1,  1, 0, 0, 1,  1, 1,
  -1, -1, -1, 1, 0, 0, 0, 1,  0, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,
  1, 1, -1, 1,   1, 1, 0, 1,  1, 0,
  1, -1, -1, 1,  1, 0, 0, 1,  1, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,
]);

var cubePosition = [
  [-0.5, +0.5, +0.5], [+0.5, +0.5, +0.5], [+0.5, -0.5, +0.5], [-0.5, -0.5, +0.5], // positive z face.
  [+0.5, +0.5, +0.5], [+0.5, +0.5, -0.5], [+0.5, -0.5, -0.5], [+0.5, -0.5, +0.5], // positive x face
  [+0.5, +0.5, -0.5], [-0.5, +0.5, -0.5], [-0.5, -0.5, -0.5], [+0.5, -0.5, -0.5], // negative z face
  [-0.5, +0.5, -0.5], [-0.5, +0.5, +0.5], [-0.5, -0.5, +0.5], [-0.5, -0.5, -0.5], // negative x face.
  [-0.5, +0.5, -0.5], [+0.5, +0.5, -0.5], [+0.5, +0.5, +0.5], [-0.5, +0.5, +0.5], // top face
  [-0.5, -0.5, -0.5], [+0.5, -0.5, -0.5], [+0.5, -0.5, +0.5], [-0.5, -0.5, +0.5]  // bottom face
]

var cubeUv = [
  [0.0, 0.0], [1.0, 0.0], [1.0, 1.0], [0.0, 1.0], // positive z face.
  [0.0, 0.0], [1.0, 0.0], [1.0, 1.0], [0.0, 1.0], // positive x face.
  [0.0, 0.0], [1.0, 0.0], [1.0, 1.0], [0.0, 1.0], // negative z face.
  [0.0, 0.0], [1.0, 0.0], [1.0, 1.0], [0.0, 1.0], // negative x face.
  [0.0, 0.0], [1.0, 0.0], [1.0, 1.0], [0.0, 1.0], // top face
  [0.0, 0.0], [1.0, 0.0], [1.0, 1.0], [0.0, 1.0]  // bottom face
]

const cubeElements = [
  [2, 1, 0], [2, 0, 3],       // positive z face.
  [6, 5, 4], [6, 4, 7],       // positive x face.
  [10, 9, 8], [10, 8, 11],    // negative z face.
  [14, 13, 12], [14, 12, 15], // negative x face.
  [18, 17, 16], [18, 16, 19], // top face.
  [20, 21, 22], [23, 20, 22]  // bottom face
]

//cube is probably scaled too big so only showing one triangle strip
//might be two bugs, too big and not enough vertices 

//try regl method of multiply matrices in shader : tradeoff complicates upload of vertices
//try austin-eng's vertices - dont do 

//not using elements
//use austin


//TODO
//use austin eng's code and ignore regl code but use api as is because works for trangle
//fix texture by using 2nd set of UV coordinates 
//not uploading uv coordinates
//was hardcoding-uv coordinates in shader before

function getTransformationMatrix() {
  const presentationSize = [500, 500]
  const aspect = presentationSize[0] / presentationSize[1];
  const projectionMatrix = mat4.create();
  mat4.perspective(projectionMatrix, (2 * Math.PI) / 5, aspect, 1, 100.0);

  const viewMatrix = mat4.create();
  mat4.translate(viewMatrix, viewMatrix, vec3.fromValues(0, 0, -4));
  const now = Date.now() / 1000;
  mat4.rotate(
    viewMatrix,
    viewMatrix,
    1,
    vec3.fromValues(Math.sin(now), Math.cos(now), 0)
  );

  const modelViewProjectionMatrix = mat4.create();
  mat4.multiply(modelViewProjectionMatrix, projectionMatrix, viewMatrix);

  return modelViewProjectionMatrix
}
async function basic () {

// Calling simplewebgpu.init() creates a new partially evaluated draw command
let webgpu = await simpleWebgpu.init()
let img = new Image();
img.src = './data/october.png'
document.body.appendChild(img)

await img.decode();

//module thinks this is a draw call but its actually an init draw call
const drawCube = await webgpu.initDrawCall({
  // Shaders in simplewebgpu. are just strings.  You can use glslify or whatever you want
  // to define them.  No need to manually create shader objects.
  frag: `
  // @group(0) @binding(1) var mySampler: sampler;
  // @group(0) @binding(2) var myTexture: texture_2d<f32>;
  
  @fragment
  fn main(
    @location(0) fragUV: vec2<f32>,
    @location(1) fragPosition: vec4<f32>
  ) -> @location(0) vec4<f32> {

    return fragPosition;
    //return vec4<f32>(1., 1., 2., 1.);
    //return textureSample(myTexture, mySampler, fragUV) * fragPosition + vec4<f32>(1.,0., 1., 1.);
  }`,

  vert: `
  struct Uniforms {
    modelViewProjectionMatrix : mat4x4<f32>,
  }
  @binding(0) @group(0) var<uniform> uniforms : Uniforms;
  
  struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) fragUV : vec2<f32>,
    @location(1) fragPosition: vec4<f32>,
  }
  
  @vertex
  fn main(
    @location(0) position : vec4<f32>,
    @location(1) uv : vec2<f32>
  ) -> VertexOutput {
    var output : VertexOutput;
    output.Position = uniforms.modelViewProjectionMatrix * position;
    output.fragUV = uv;
    output.fragPosition = 0.51 * (position + vec4(1.0, 1.0, 1.0, 1.0));
    return output;
  }`,

  // Here we define the vertex attributes for the above shader
  attributes: {
    // simplewebgpu.buffer creates a new array buffer object
    position: webgpu.buffer(cubeVertexArray)
    // simpleWebgpu automatically infers sane defaults for the vertex attribute pointers
  },
  //elements: cubeElements,

  uniforms: {
    modelViewProjectionMatrix: getTransformationMatrix,
  //   view: ({tick}) => {
  //     const t = 0.01 * tick
  //     return mat4.lookAt([],
  //                        [5 * Math.cos(t), 2.5 * Math.sin(t), 5 * Math.sin(t)],
  //                        [0, 0.0, 0],
  //                        [0, 1, 0])
  //   },
  //   projection: ({viewportWidth, viewportHeight}) =>
  //   mat4.perspective([],
  //                    Math.PI / 4,
  //                    viewportWidth / viewportHeight,
  //                    0.01,
  //                    10),
   texture: img,
  },

  // This tells simpleWebgpu the number of vertices to draw in this command
  count: cubeVertexCount
})
 

setInterval(
  function () {
    drawCube({
      texture: img
    })
  }, 50
)
  
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
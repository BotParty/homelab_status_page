//import simpleWebGPU from ''
import simpleWebGPU from "../lib/main";

let data = {
  width: 500,
  height: 500,
  time: performance.now()
}

const uniforms = Object.keys(data)
.filter(() => typeof data[name] === "number")
.map((name) => `${name}: f32,`)
.join("\n");

const num_points = 5000
let options = {
  vert: 
  
  `
  struct Uniforms {
    ${uniforms}
  }
 @binding(0) @group(0) var<uniform> u: Uniforms;
 @binding(1) @group(0) var mySampler: sampler;
 @binding(2) @group(0) var myTexture: texture_2d<f32>;

 struct VertexOutput {
   @builtin(position) Position : vec4<f32>,
   @location(0) fragUV : vec2<f32>,
   @location(1) fragPosition: vec4<f32>,
 } // 
 
 @vertex
 fn main_vertex(
   @builtin(vertex_index) VertexIndex : u32,
 ) -> VertexOutput {
   const pos = array(
     vec2( .0, .0),
     vec2( .0, .0),
     vec2(.0, .0),
     vec2( .0,  .0),
     vec2(.0, .0),
     vec2(.0,  .0),
   ); //default for quad 
 
   const uv = array(
     vec2(1.0, 0.0),
     vec2(1.0, 1.0),
     vec2(0.0, 1.0),
     vec2(1.0, 0.0),
     vec2(0.0, 1.0),
     vec2(0.0, 0.0),
   ); // default for quad 
   var output : VertexOutput;
   output.Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
   output.fragUV = uv[VertexIndex];
   output.fragPosition = (output.Position + vec4<f32>(1.0, 1.0, 1.0, 1.0));
   output.fragPosition.g = 1.5 - output.fragPosition.g;
   return output;
 }` , 
  frag: `
  @fragment //too much boilerplate? 
  fn main_fragment(
    @location(0) fragUV: vec2<f32>,
    @location(1) fragPosition: vec4<f32>
  ) -> location(0) vec4<f32> {
  var pointColor = vec4<f32>(1., 0., 0., 1.);
  //todo add color as vertex attribute 
  return vec4(fragColor, 1);
}`  , 
  attributes: {
    position: [ 0,0, 0,  .1, .1, 0, .3, .3, 0., -.5, -.5, -.5], //both nested and flat arrays TODO 
    color: [ 1,1,1, .5,.5,.5, 1., 0., 0., 0., 0, 0, 0]
  },
  uniforms: {
    size: 10.
    //view: () => {}, key: function () {}, 
    //texture: simpleWebGPU.texture('carebears shooting rainbows') },
  },
  count: num_points,
  primitive: 'points'
}

console.log(123123)
let drawParticles = await simpleWebGPU.init(options)


export default function () {
  console.log(555)
simpleWebGPU.frame( async () => {
   drawParticles({})
})
}
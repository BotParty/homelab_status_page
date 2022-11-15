(function(f,s){typeof exports=="object"&&typeof module!="undefined"?s(exports):typeof define=="function"&&define.amd?define(["exports"],s):(f=typeof globalThis!="undefined"?globalThis:f||self,s(f.MyLib={}))})(this,function(f){"use strict";const s=(e,r,i)=>{let t={size:r.byteLength+3&-4,usage:i,mappedAtCreation:!0},u=e.createBuffer(t);return r[5]=Date.now(),(r instanceof Uint16Array?new Uint16Array(u.getMappedRange()):new Float32Array(u.getMappedRange())).set(r),u.unmap(),u};function x(e){if(typeof e.width!="number")throw new Error("bad data!!")}const b=function(e,r){e.addEventListener("mousemove",i=>{let t=i.pageX,u=i.pageY;r.mouseX=t/i.target.clientWidth,r.mouseY=u/i.target.clientHeight})};function h(e=innerWidth,r=innerHeight){let i=devicePixelRatio;var t=document.createElement("canvas");return t.width=i*e,t.height=i*r,t.style.width=e+"px",document.body.appendChild(t),t}var p={createBuffer:s,createCanvas:h,validateData:x,addMouseEvents:b},y=`// let size = 4.0;

// let b = 0.3;		//size of the smoothed border

//     fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {
//       let aspect = iResolution.x/iResolution.y;
//       let position = (fragCoord.xy) * aspect;
//       let dist = distance(position, vec2<f32>(aspect*0.5, 0.5));
//       let offset=u.time * 000.0001;
//       let conv=4.;
//       let v=dist*4.-offset;
//       let ringr=floor(v);
      
//       var stuff = 0.;
//       if (v % 3. > .5) {
//         stuff = 0.;
//       }

// 	var color=smoothStep(-b, b, abs(dist- (ringr+stuff+offset)/conv));
//       if (ringr % 2. ==1.) {
//        color=2.-color;
//       }

//     let distToMouseX = distance(u.mouseX, fragCoord.x);
//     let distToMouseY = distance(u.mouseY, fragCoord.y);

//     return vec4<f32>(
//       distToMouseX, 
//       color, 
//       color, 
//       1.
//       );
//   };

//   fn main(uv: vec2<f32>) -> vec4<f32> {
//     let fragCoord = vec2<f32>(uv.x, uv.y);
//     var base = vec4<f32>(cos(u.time * .000001), .5, sin(u.time * 0.000001), 1.);
//     let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));
//     return mainImage(fragCoord, vec2<f32>(u.width, u.height));
//   }

@fragment
  fn main_fragment(in: VertexOutput) -> @location(0) vec4<f32> {
    return vec4<f32>(.8);
  }
  `;let P=e=>{let{device:r}=e;e.compute.vertexBufferData&&(e.computeVertexBufferData=r.createBuffer({size:e.compute.vertexBufferData.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Float32Array(e.computeVertexBufferData.getMappedRange()).set(e.compute.vertexBufferData),e.computeVertexBufferData.unmap()),e.compute.buffers&&(e.particleBuffers=e.compute.buffers.map(a=>{let o=r.createBuffer({size:a.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.STORAGE,mappedAtCreation:!0});return new Float32Array(o.getMappedRange()).set(a),o.unmap(),o}));const i=7*Float32Array.BYTES_PER_ELEMENT;e.simParamBuffer=r.createBuffer({size:i,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const t=r.createComputePipeline({compute:{module:r.createShaderModule({code:e.compute.cs}),entryPoint:"main_vertex"}}),u=e.options.compute.simParams;r.queue.writeBuffer(e.simParamBuffer,0,new Float32Array(Object.values(u)));let n=e.compute.buffers.map(function(a,o){return r.createBindGroup({layout:t.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.simParamBuffer}},{binding:1,resource:{buffer:e.particleBuffers[o],offset:0,size:e.compute.buffers[0].byteLength}},{binding:2,resource:{buffer:e.particleBuffers[(o+1)%2],offset:0,size:e.compute.buffers[1].byteLength}}]})});n.length||n.push(...e.compute.bindGroups(r,t)),Object.assign(e,{computePipeline:t,particleBindGroups:n})},l=async e=>{const r=document.createElement("img"),i=r;return i.width=innerWidth,i.height=innerHeight,r.src=e.data.texture,await r.decode(),await createImageBitmap(r)};async function T(e){var r,i;if(HTMLImageElement===((i=(r=e==null?void 0:e.data)==null?void 0:r.texture)==null?void 0:i.constructor)){let t=e.data.texture;await t.decode(),await createImageBitmap(t);let u=await l(e),n=e.device.createTexture({size:[u.width,u.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});return e.device.queue.copyExternalImageToTexture({source:u},{texture:n},[u.width,u.height]),e.texture=n,d(e),n}else if(typeof e.data.texture=="string"){let t=e.device.createTexture({size:[900,500,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),u=await l(e);return e.device.queue.copyExternalImageToTexture({source:u},{texture:t},[u.width,u.height]),e.texture=t,d(e),t}else{let t=e.device.createTexture({size:[256,1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),u=new Float32Array(new Array(800).fill(5).map((n,a)=>e.data.texture?e.data.texture[a%e.data.texture.length+n]:Math.random()));return e.texture=t,e.data.music=u,d(e),t}}let g=0;function d(e){if(!!e.texture&&e.data.texture){let r=new Uint8Array(new Array(1024).fill(5).map((i,t)=>e.data.texture?e.data.texture[t%e.data.texture.length]:Math.random()));e.device.queue.writeTexture({texture:e.texture},r.buffer,{bytesPerRow:3200,rowsPerImage:600},[256,1])}}function G(e){var c;e.compute&&P(e);let{computePipeline:r,particleBindGroups:i,particleBuffers:t,computeVertexBufferData:u,device:n}=e;const a=n.createBindGroup(e.bindGroupDescriptor);e.renderPasses=[],e.compute&&e.renderPasses.push({pipeline:r,bindGroup:i,dispatchWorkGroups:e.compute.dispatchWorkGroups(),type:"compute"});const o={renderPassDescriptor:e.renderPassDescriptor,texture:e.texture,pipeline:e.pipeline,bindGroup:a,type:"draw"};(c=e==null?void 0:e.compute)!=null&&c.numVertices&&(o.numVertices=e.compute.numVertices()),e.compute&&t&&(o.vertexBuffers=[t[0],u]),e.renderPasses.push(o)}const U=async function(e){let{device:r,renderPassDescriptor:i}=e;i.colorAttachments[0].view=e.context.getCurrentTexture().createView();const t=r.createCommandEncoder();e.renderPasses.forEach(function(n){let a=n.type==="compute",o=a?t.beginComputePass():t.beginRenderPass(i);n.texture&&d(e),o.setPipeline(n.pipeline),o.setBindGroup(0,Array.isArray(n.bindGroup)?n.bindGroup[g%2]:n.bindGroup),n.vertexBuffers&&n.vertexBuffers.forEach(function(c,A){o.setVertexBuffer(A,c)}),n.numVertices?o.draw(3,n.numVertices,0,0):!a&&(n.type,o.draw(3*2,1,0,0)),n.dispatchWorkGroups&&(Array.isArray(n.dispatchWorkGroups)?o.dispatchWorkgroups(...n.dispatchWorkGroups):o.dispatchWorkgroups(n.dispatchWorkGroups)),o.end()}),r.queue.submit([t.finish()]),g++};function m(e){let{data:r,device:i}=e,t=Object.values(r).filter(n=>typeof n!="object"),u=new Float32Array(t.length);return u.set(t,0),e.uniformsBuffer?(i.queue.writeBuffer(e.uniformsBuffer,0,u.buffer,0,28),e.uniformsBuffer):e.uniformsBuffer=p.createBuffer(i,u,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST)}async function B(e){let{device:r}=e,i={layout:"auto",vertex:{module:e.shader,entryPoint:"main_vertex",buffers:[]},fragment:{module:e.shader,entryPoint:"main_fragment",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list"}};e.compute&&i.vertex.buffers.push({arrayStride:4*4,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:2*4,format:"float32x2"}]},{arrayStride:2*4,stepMode:"vertex",attributes:[{shaderLocation:2,offset:0,format:"float32x2"}]});const t=r.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"nearest"}),u=r.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT|GPUShaderStage.COMPUTE,buffer:{type:"uniform",minBindingSize:4*7}},{binding:1,visibility:GPUShaderStage.FRAGMENT|GPUShaderStage.COMPUTE,type:"sampler",sampler:t},{binding:2,visibility:GPUShaderStage.FRAGMENT|GPUShaderStage.COMPUTE,texture:{}}]}),n=r.createPipelineLayout({bindGroupLayouts:[u]});e.bindGroupLayout=u,m(e);const a={colorAttachments:[{view:void 0,clearValue:{r:.5,g:.5,b:.5,a:1},loadOp:"clear",storeOp:"store"}]};e.renderPassDescriptor=a;let o=r.createRenderPipeline({...i,layout:n}),c=await T(e);return e.bindGroupDescriptor={layout:o.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.uniformsBuffer}},{binding:1,resource:t},{binding:2,resource:c.createView({baseMipLevel:0,mipLevelCount:1}),texture:{sampleType:"float",viewDimension:"2d",multisampled:0}}]},e.bindGroupDescriptor.entries[0].resource.buffer=m(e),e.bindGroupDescriptor.entries[2].resource=c.createView({baseMipLevel:0,mipLevelCount:1}),o}function w(e,r){const{device:i,data:t}=e;r||(r=y),p.validateData(t);const n=`
    struct Uniforms {
     ${Object.keys(t).filter(a=>typeof t[a]=="number").map(a=>`${a}: f32,`).join(`
`)}
   }
  @binding(0) @group(0) var<uniform> u: Uniforms;
  @binding(1) @group(0) var mySampler: sampler;
  @binding(2) @group(0) var myTexture: texture_2d<f32>;

  struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) fragUV : vec2<f32>,
    @location(1) fragPosition: vec4<f32>,
  }
  
  @vertex
  fn main_vertex(
    @builtin(vertex_index) VertexIndex : u32,
  ) -> VertexOutput {
    const pos = array(
      vec2( 1.0,  1.0),
      vec2( 1.0, -1.0),
      vec2(-1.0, -1.0),
      vec2( 1.0,  1.0),
      vec2(-1.0, -1.0),
      vec2(-1.0,  1.0),
    );
  
    const uv = array(
      vec2(1.0, 0.0),
      vec2(1.0, 1.0),
      vec2(0.0, 1.0),
      vec2(1.0, 0.0),
      vec2(0.0, 1.0),
      vec2(0.0, 0.0),
    );
    var output : VertexOutput;
    output.Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
    output.fragUV = uv[VertexIndex];
    output.fragPosition = (output.Position + vec4<f32>(1.0, 1.0, 1.0, 1.0));
    output.fragPosition.g = 1.5 - output.fragPosition.g;
    return output;
  }
  ${r}`;return e.compute?i.createShaderModule({code:e.options.vs+e.options.shader}):i.createShaderModule({code:n})}async function E(e,r){e.shader=w(e,r.shader),e.pipeline=await B(e),G(e)}let M={width:innerWidth,height:innerHeight,pixelRatio:2,time:0,mouseX:0,mouseY:0,angle:0};async function v(e){let r=e.canvas||p.createCanvas();const i={renderPassDescriptor:{},options:e,data:Object.assign(M,e.data),compute:e.compute,renderPasses:[]};p.addMouseEvents(r,i.data);const t=r.getContext("webgpu"),u=await navigator.gpu.requestAdapter(),n=await(u==null?void 0:u.requestDevice()),a=navigator.gpu.getPreferredCanvasFormat();Object.assign(i,{device:n,context:t,adapter:u}),t.configure({device:n,format:a,alphaMode:"opaque",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});function o(c){return c.time=performance.now(),d(i),Object.assign(i.data,c),m(i),U(i),o}return o.canvas=r,E(i,e),o}v.version="0.9.5",f.init=v,Object.defineProperties(f,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});

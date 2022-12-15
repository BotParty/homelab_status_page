var N=Object.defineProperty,F=Object.defineProperties;var k=Object.getOwnPropertyDescriptors;var T=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable;var B=(a,u,s)=>u in a?N(a,u,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[u]=s,G=(a,u)=>{for(var s in u||(u={}))z.call(u,s)&&B(a,s,u[s]);if(T)for(var s of T(u))X.call(u,s)&&B(a,s,u[s]);return a},U=(a,u)=>F(a,k(u));(function(a,u){typeof exports=="object"&&typeof module!="undefined"?u(exports):typeof define=="function"&&define.amd?define(["exports"],u):(a=typeof globalThis!="undefined"?globalThis:a||self,u(a.MyLib={}))})(this,function(a){"use strict";const u=(e,t,i)=>{let r={size:t.byteLength+3&~3,usage:i,mappedAtCreation:!0},n=e.createBuffer(r);return t[5]=Date.now(),(t instanceof Uint16Array?new Uint16Array(n.getMappedRange()):new Float32Array(n.getMappedRange())).set(t),n.unmap(),n};function s(e){if(typeof e.width!="number")throw new Error("bad data!!")}const w=function(e,t){e.addEventListener("mousemove",i=>{let r=i.pageX,n=i.pageY;t.mouseX=r/i.target.clientWidth,t.mouseY=n/i.target.clientHeight})};function E(e=innerWidth,t=innerHeight){console.log("5555");let i=devicePixelRatio;var r=document.createElement("canvas");return r.width=i*e,r.height=i*t,r.style.width=e+"px",document.body.appendChild(r),r}var m={createBuffer:u,createCanvas:E,validateData:s,addMouseEvents:w},A=`// let size = 4.0;

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
  `;let C=e=>{let{device:t}=e;e.compute.vertexBufferData&&(e.computeVertexBufferData=t.createBuffer({size:e.compute.vertexBufferData.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Float32Array(e.computeVertexBufferData.getMappedRange()).set(e.compute.vertexBufferData),e.computeVertexBufferData.unmap()),e.compute.buffers&&(e.particleBuffers=e.compute.buffers.map(r=>{let n=t.createBuffer({size:r.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.STORAGE,mappedAtCreation:!0});return new Float32Array(n.getMappedRange()).set(r),n.unmap(),n}));const i=7*Float32Array.BYTES_PER_ELEMENT;if(e.simParamBuffer=t.createBuffer({size:i,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),e.options.compute.simParams){const r=e.options.compute.simParams;t.queue.writeBuffer(e.simParamBuffer,0,new Float32Array(Object.values(r)))}e.compute.buffers},M=async e=>{const t=document.createElement("img"),i=t;return i.width=innerWidth,i.height=innerHeight,t.src=e.data.texture,await t.decode(),await createImageBitmap(t)};async function R(e){var t,i;if(HTMLImageElement===((i=(t=e==null?void 0:e.data)==null?void 0:t.texture)==null?void 0:i.constructor)){let r=e.data.texture;await r.decode(),await createImageBitmap(r),await r.decode();let n=await createImageBitmap(r),o=e.device.createTexture({size:[n.width,n.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});return e.device.queue.copyExternalImageToTexture({source:n},{texture:o},[n.width,n.height]),e.texture=o,p(e),o}else if(typeof e.data.texture=="string"){let r=e.device.createTexture({size:[900,500,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),n=await M(e);return e.device.queue.copyExternalImageToTexture({source:n},{texture:r},[n.width,n.height]),e.texture=r,p(e),r}else{let r=e.device.createTexture({size:[256,1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),n=new Float32Array(new Array(800).fill(5).map((o,c)=>e.data.texture?e.data.texture[c%e.data.texture.length+o]:Math.random()));return e.texture=r,e.data.music=n,p(e),r}}let x=0;function p(e){if(!!e.texture&&e.data.texture){let t=new Uint8Array(new Array(1024).fill(5).map((i,r)=>e.data.texture?e.data.texture[r%e.data.texture.length]:Math.random()));e.device.queue.writeTexture({texture:e.texture},t.buffer,{bytesPerRow:3200,rowsPerImage:600},[256,1])}}function D(e){var c;e.compute&&C(e);let{particleBuffers:t,computeVertexBufferData:i,device:r}=e;const n=r.createBindGroup(e.bindGroupDescriptor),o={renderPassDescriptor:e.renderPassDescriptor,texture:e.texture,pipeline:e.pipeline,bindGroup:n,type:"draw"};((c=e==null?void 0:e.compute)==null?void 0:c.numVertices)&&(o.numVertices=e.compute.numVertices()),e.compute&&t&&(o.vertexBuffers=[t[0],i]),e.renderPasses.push(o)}const S=async function(e){let{device:t,renderPassDescriptor:i}=e;i.colorAttachments[0].view=e.context.getCurrentTexture().createView();const r=t.createCommandEncoder();e.renderPasses.forEach(function(o){let c=o.type==="compute",f=c?r.beginComputePass():r.beginRenderPass(i);o.texture&&p(e),f.setPipeline(o.pipeline),f.setBindGroup(0,Array.isArray(o.bindGroup)?o.bindGroup[x%2]:o.bindGroup),o.vertexBuffers&&o.vertexBuffers.forEach(function(d,l){f.setVertexBuffer(l,d)}),o.numVertices?f.draw(3,o.numVertices,0,0):!c&&(o.type,f.draw(3*2,1,0,0)),o.dispatchWorkGroups&&(Array.isArray(o.dispatchWorkGroups)?f.dispatchWorkgroups(...o.dispatchWorkGroups):f.dispatchWorkgroups(o.dispatchWorkGroups)),f.end()}),t.queue.submit([r.finish()]),x++};function g(e){let{data:t,device:i}=e,r=Object.values(t).filter(o=>typeof o!="object"),n=new Float32Array(r.length);return n.set(r,0),e.uniformsBuffer?(i.queue.writeBuffer(e.uniformsBuffer,0,n.buffer,0,4*n.length),e.uniformsBuffer):e.uniformsBuffer=m.createBuffer(i,n,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST)}async function V(e){let{device:t}=e;const i=new Float32Array(new Array(1e4).fill(5).map((Y,v)=>{let P=v/1e3;if(v%2==1)return P%1;if(v%2==0)return P/10})),r=t.createBuffer({size:i.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0});new Float32Array(r.getMappedRange()).set(i),r.unmap(),e.cubeVertices=r;let n={layout:"auto",vertex:{module:e.shader,entryPoint:"main_vertex",buffers:[]},fragment:{module:e.shader,entryPoint:"main_fragment",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list"}};e.compute&&n.vertex.buffers.push({arrayStride:4*4,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:2*4,format:"float32x2"}]},{arrayStride:2*4,stepMode:"vertex",attributes:[{shaderLocation:2,offset:0,format:"float32x2"}]});const o=t.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"nearest"}),c=t.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT|GPUShaderStage.COMPUTE,buffer:{type:"uniform",minBindingSize:4*7}},{binding:1,visibility:GPUShaderStage.FRAGMENT|GPUShaderStage.COMPUTE,type:"sampler",sampler:o},{binding:2,visibility:GPUShaderStage.FRAGMENT|GPUShaderStage.COMPUTE,texture:{}}]}),f=t.createPipelineLayout({bindGroupLayouts:[c]});e.bindGroupLayout=c,g(e);const d={colorAttachments:[{view:void 0,clearValue:{r:.5,g:.5,b:.5,a:1},loadOp:"clear",storeOp:"store"}]};e.renderPassDescriptor=d;let l=t.createRenderPipeline(U(G({},n),{layout:f})),y=await R(e);return e.bindGroupDescriptor={layout:l.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.uniformsBuffer}},{binding:1,resource:o},{binding:2,resource:y.createView({baseMipLevel:0,mipLevelCount:1}),texture:{sampleType:"float",viewDimension:"2d",multisampled:0}}]},e.bindGroupDescriptor.entries[0].resource.buffer=g(e),e.bindGroupDescriptor.entries[2].resource=y.createView({baseMipLevel:0,mipLevelCount:1}),l}function b(e,t){const{device:i,data:r}=e;t||(t=A),m.validateData(r);let o=`
    struct Uniforms {
     ${Object.keys(r).filter(c=>typeof r[c]=="number").map(c=>`${c}: f32,`).join(`
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
  ${t}`;return e.options.vs&&(o=e.options.vs+e.options.shader),i.createShaderModule({code:o})}function L(e){var r;let t=e.device;b(e,e.compute.cs);const i=e.device.createComputePipeline({compute:{module:e.device.createShaderModule({code:e.compute.shader}),entryPoint:"main_vertex"}});return e.compute.buffers&&(e.particleBindGroups=e.compute.buffers.map(function(n,o){return t.createBindGroup({layout:i.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.simParamBuffer}},{binding:1,resource:{buffer:e.particleBuffers[o],offset:0,size:e.compute.buffers[0].byteLength}},{binding:2,resource:{buffer:e.particleBuffers[(o+1)%2],offset:0,size:e.compute.buffers[1].byteLength}}]})})),((r=e.computeBindGroups)==null?void 0:r.length)&&e.particleBindGroups.push(...e.compute.bindGroups(e.device,i)),{pipeline:i,bindGroup:e.particleBindGroups,dispatchWorkGroups:e.compute.dispatchWorkGroups(),type:"compute"}}async function O(e,t){e.renderPasses=[],e.compute&&e.compute.cs&&e.renderPasses.push(L(e));let i=e.options.shader;e.shader=b(e,i),e.pipeline=await V(e),D(e)}let I={width:innerWidth,height:innerHeight,pixelRatio:2,time:0,mouseX:0,mouseY:0,angle:0};async function h(e){let t=e.canvas||m.createCanvas();const i={renderPassDescriptor:{},options:e,data:Object.assign(I,e.data),compute:e.compute,renderPasses:[]};m.addMouseEvents(t,i.data);const r=t.getContext("webgpu"),n=await navigator.gpu.requestAdapter(),o=await(n==null?void 0:n.requestDevice()),c=navigator.gpu.getPreferredCanvasFormat();Object.assign(i,{device:o,context:r,adapter:n}),r.configure({device:o,format:c,alphaMode:"opaque",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});function f(d){return d.time=performance.now(),p(i),Object.assign(i.data,d),g(i),S(i),f}return f.canvas=t,O(i),f}h.version="0.9.9",a.init=h,Object.defineProperty(a,"__esModule",{value:!0}),a[Symbol.toStringTag]="Module"});

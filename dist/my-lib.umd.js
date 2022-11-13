(function(s,c){typeof exports=="object"&&typeof module!="undefined"?c(exports):typeof define=="function"&&define.amd?define(["exports"],c):(s=typeof globalThis!="undefined"?globalThis:s||self,c(s.MyLib={}))})(this,function(s){"use strict";const c=(e,r,t)=>{let n={size:r.byteLength+3&-4,usage:t,mappedAtCreation:!0},o=e.createBuffer(n);return r[5]=Date.now(),(r instanceof Uint16Array?new Uint16Array(o.getMappedRange()):new Float32Array(o.getMappedRange())).set(r),o.unmap(),o};function v(e){if(typeof e.width!="number")throw new Error("bad data!!")}const b=function(e,r){e.addEventListener("mousemove",t=>{let n=t.pageX,o=t.pageY;r.mouseX=n/t.target.clientWidth,r.mouseY=o/t.target.clientHeight})};function x(e=innerWidth,r=innerHeight){let t=devicePixelRatio;var n=document.createElement("canvas");return n.width=t*e,n.height=t*r,n.style.width=e+"px",document.body.appendChild(n),n}var d={createBuffer:c,createCanvas:x,validateData:v,addMouseEvents:b},h=`// let size = 4.0;

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
  `;let y=e=>{let{device:r}=e;e.compute.vertexBufferData&&(e.computeVertexBufferData=r.createBuffer({size:e.compute.vertexBufferData.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Float32Array(e.computeVertexBufferData.getMappedRange()).set(e.compute.vertexBufferData),e.computeVertexBufferData.unmap()),e.compute.buffers&&(e.particleBuffers=e.compute.buffers.map(a=>{let u=r.createBuffer({size:a.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.STORAGE,mappedAtCreation:!0});return new Float32Array(u.getMappedRange()).set(a),u.unmap(),u}));const t=7*Float32Array.BYTES_PER_ELEMENT;e.simParamBuffer=r.createBuffer({size:t,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const n=r.createComputePipeline({compute:{module:r.createShaderModule({code:e.compute.cs}),entryPoint:"main_vertex"}}),o=e.options.compute.simParams;r.queue.writeBuffer(e.simParamBuffer,0,new Float32Array(Object.values(o)));let i=e.compute.buffers.map(function(a,u){return r.createBindGroup({layout:n.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.simParamBuffer}},{binding:1,resource:{buffer:e.particleBuffers[u],offset:0,size:e.compute.buffers[0].byteLength}},{binding:2,resource:{buffer:e.particleBuffers[(u+1)%2],offset:0,size:e.compute.buffers[1].byteLength}}]})});i.length||i.push(...e.compute.bindGroups(r,n)),Object.assign(e,{computePipeline:n,particleBindGroups:i})},P=async e=>{const r=document.createElement("img"),t=r;return t.width=innerWidth,t.height=innerHeight,r.src=e.data.texture,await r.decode(),await createImageBitmap(r)};async function G(e){if(typeof e.data.texture=="string"){let r=e.device.createTexture({size:[900,900,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),t=await P(e);return e.device.queue.copyExternalImageToTexture({source:t},{texture:r},[t.width,t.height]),e.texture=r,p(e),r}else{let r=e.device.createTexture({size:[256,1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),t=new Float32Array(new Array(800).fill(5).map((n,o)=>e.data.texture?e.data.texture[o%e.data.texture.length+n]:Math.random()));return e.texture=r,e.data.music=t,p(e),r}}let l=0;function p(e){if(!!e.texture&&e.data.texture){let r=new Uint8Array(new Array(1024).fill(5).map((t,n)=>e.data.texture?e.data.texture[n%e.data.texture.length]:Math.random()));e.device.queue.writeTexture({texture:e.texture},r.buffer,{bytesPerRow:3200,rowsPerImage:600},[256,1])}}function B(e){var f;e.compute&&y(e);let{computePipeline:r,particleBindGroups:t,particleBuffers:n,computeVertexBufferData:o,device:i}=e;const a=i.createBindGroup(e.bindGroupDescriptor);e.renderPasses=[],e.compute&&e.renderPasses.push({pipeline:r,bindGroup:t,dispatchWorkGroups:e.compute.dispatchWorkGroups(),type:"compute"});const u={renderPassDescriptor:e.renderPassDescriptor,texture:e.texture,pipeline:e.pipeline,bindGroup:a,type:"draw"};(f=e==null?void 0:e.compute)!=null&&f.numVertices&&(u.numVertices=e.compute.numVertices()),e.compute&&n&&(u.vertexBuffers=[n[0],o]),e.renderPasses.push(u)}const T=async function(e){let{device:r,renderPassDescriptor:t}=e;t.colorAttachments[0].view=e.context.getCurrentTexture().createView();const n=r.createCommandEncoder();e.renderPasses.forEach(function(i){let a=i.type==="compute",u=a?n.beginComputePass():n.beginRenderPass(t);i.texture&&p(e),u.setPipeline(i.pipeline),u.setBindGroup(0,Array.isArray(i.bindGroup)?i.bindGroup[l%2]:i.bindGroup),i.vertexBuffers&&i.vertexBuffers.forEach(function(f,A){u.setVertexBuffer(A,f)}),i.numVertices?u.draw(3,i.numVertices,0,0):!a&&(i.type,u.draw(3*2,1,0,0)),i.dispatchWorkGroups&&(Array.isArray(i.dispatchWorkGroups)?u.dispatchWorkgroups(...i.dispatchWorkGroups):u.dispatchWorkgroups(i.dispatchWorkGroups)),u.end()}),r.queue.submit([n.finish()]),l++};function m(e){let{data:r,device:t}=e,n=Object.values(r).filter(i=>typeof i!="object"),o=new Float32Array(n.length);return o.set(n,0),e.uniformsBuffer?(t.queue.writeBuffer(e.uniformsBuffer,0,o.buffer,0,28),e.uniformsBuffer):e.uniformsBuffer=d.createBuffer(t,o,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST)}async function U(e){let{device:r}=e,t={layout:"auto",vertex:{module:e.shader,entryPoint:"main_vertex",buffers:[]},fragment:{module:e.shader,entryPoint:"main_fragment",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list"}};e.compute&&t.vertex.buffers.push({arrayStride:4*4,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:2*4,format:"float32x2"}]},{arrayStride:2*4,stepMode:"vertex",attributes:[{shaderLocation:2,offset:0,format:"float32x2"}]});const n=r.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"nearest"}),o=r.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT|GPUShaderStage.COMPUTE,buffer:{type:"uniform",minBindingSize:4*7}},{binding:1,visibility:GPUShaderStage.FRAGMENT|GPUShaderStage.COMPUTE,type:"sampler",sampler:n},{binding:2,visibility:GPUShaderStage.FRAGMENT|GPUShaderStage.COMPUTE,texture:{}}]}),i=r.createPipelineLayout({bindGroupLayouts:[o]});e.bindGroupLayout=o,m(e);const a={colorAttachments:[{view:void 0,clearValue:{r:.5,g:.5,b:.5,a:1},loadOp:"clear",storeOp:"store"}]};e.renderPassDescriptor=a;let u=r.createRenderPipeline({...t,layout:i}),f=await G(e);return e.bindGroupDescriptor={layout:u.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.uniformsBuffer}},{binding:1,resource:n},{binding:2,resource:f.createView({baseMipLevel:0,mipLevelCount:1}),texture:{sampleType:"float",viewDimension:"2d",multisampled:0}}]},e.bindGroupDescriptor.entries[0].resource.buffer=m(e),e.bindGroupDescriptor.entries[2].resource=f.createView({baseMipLevel:0,mipLevelCount:1}),u}function w(e,r){const{device:t,data:n}=e;r||(r=h),d.validateData(n);const i=`
    struct Uniforms {
     ${Object.keys(n).filter(a=>typeof n[a]=="number").map(a=>`${a}: f32,`).join(`
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
  ${r}`;return e.compute?t.createShaderModule({code:e.options.vs+e.options.shader}):t.createShaderModule({code:i})}async function E(e,r){e.shader=w(e,r.shader),e.pipeline=await U(e),B(e)}let M={width:innerWidth,height:innerHeight,pixelRatio:2,time:0,mouseX:0,mouseY:0,angle:0};async function g(e){let r=e.canvas||d.createCanvas();const t={renderPassDescriptor:{},options:e,data:Object.assign(M,e.data),compute:e.compute,renderPasses:[]};d.addMouseEvents(r,t.data);const n=r.getContext("webgpu"),o=await navigator.gpu.requestAdapter(),i=await(o==null?void 0:o.requestDevice()),a=navigator.gpu.getPreferredCanvasFormat();Object.assign(t,{device:i,context:n,adapter:o}),n.configure({device:i,format:a,alphaMode:"opaque",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});function u(f){return f.time=performance.now(),p(t),Object.assign(t.data,f),m(t),T(t),u}return u.canvas=r,E(t,e),u}g.version="0.9.0",s.init=g,Object.defineProperties(s,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});

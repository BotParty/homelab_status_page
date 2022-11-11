(function(f,d){typeof exports=="object"&&typeof module!="undefined"?d(exports):typeof define=="function"&&define.amd?define(["exports"],d):(f=typeof globalThis!="undefined"?globalThis:f||self,d(f.MyLib={}))})(this,function(f){"use strict";const d=(e,r,t)=>{let n={size:r.byteLength+3&-4,usage:t,mappedAtCreation:!0},o=e.createBuffer(n);return r[5]=Date.now(),(r instanceof Uint16Array?new Uint16Array(o.getMappedRange()):new Float32Array(o.getMappedRange())).set(r),o.unmap(),o};function y(e=innerWidth,r=innerHeight){let t=devicePixelRatio;var n=document.createElement("canvas");return n.width=t*e,n.height=t*r,n.style.width=e+"px",document.body.appendChild(n),n}var m={createBuffer:d,createCanvas:y},x=`// let size = 4.0;

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
  `;let h=e=>{let{device:r}=e;const t=new Float32Array([-.01,-.02,.01,-.02,0,.02]),n=r.createBuffer({size:t.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0});new Float32Array(n.getMappedRange()).set(t),n.unmap();const o={deltaT:.04,rule1Distance:.1,rule2Distance:.025,rule3Distance:.025,rule1Scale:.02,rule2Scale:.05,rule3Scale:.005},i=new Array(2),s=new Array(2);for(let a=0;a<2;++a)i[a]=r.createBuffer({size:e.compute.buffers.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.STORAGE,mappedAtCreation:!0}),new Float32Array(i[a].getMappedRange()).set(e.compute.buffers),i[a].unmap();const u=7*Float32Array.BYTES_PER_ELEMENT;e.simParamBuffer=r.createBuffer({size:u,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const c=r.createComputePipeline({compute:{module:r.createShaderModule({code:e.compute.cs}),entryPoint:"main_vertex"}});r.queue.writeBuffer(e.simParamBuffer,0,new Float32Array([o.deltaT,o.rule1Distance,o.rule2Distance,o.rule3Distance,o.rule1Scale,o.rule2Scale,o.rule3Scale]));for(let a=0;a<2;++a)s[a]=r.createBindGroup({layout:c.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.simParamBuffer}},{binding:1,resource:{buffer:i[a],offset:0,size:e.compute.buffers.byteLength}},{binding:2,resource:{buffer:i[(a+1)%2],offset:0,size:e.compute.buffers.byteLength}}]});Object.assign(e,{computePipeline:c,particleBindGroups:s,particleBuffers:i,spriteVertexBuffer:n})},g=!1;async function P(e){let r=e.device.createTexture({size:[256,1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),t=new Float32Array(new Array(800).fill(5).map((n,o)=>e.data.texture?e.data.texture[o%e.data.texture.length+n]:Math.random()));return e.cubeTexture=r,e.data.music=t,e.cubeTexture=r,p(e),r}let v=0;function p(e){let r=new Uint8Array(new Array(1024).fill(5).map((t,n)=>(console.log(t),e.data.texture?e.data.texture[n%e.data.texture.length]:Math.random())));e.device.queue.writeTexture({texture:e.cubeTexture},r.buffer,{bytesPerRow:3200,rowsPerImage:600},[256,1])}function T(e){!g&&e.compute&&(g=!0,h(e));let{computePipeline:r,particleBindGroups:t,particleBuffers:n,spriteVertexBuffer:o,device:i}=e;const s=i.createBindGroup(e.bindGroupDescriptor);e.renderPasses=[],e.compute&&e.renderPasses.push({pipeline:r,bindGroup:t,dispatchWorkGroups:Math.ceil(e.compute.buffers.length/64),type:"compute"});const u={renderPassDescriptor:e.renderPassDescriptor,texture:e.texture,pipeline:e.pipeline,bindGroup:s,type:"draw"};e.compute&&(u.numVertices=e.compute.buffers.length/4),e.compute&&(u.vertexBuffers=[n[0],o]),e.renderPasses.push(u)}const G=async function(e){let{device:r,renderPassDescriptor:t}=e;t.colorAttachments[0].view=e.context.getCurrentTexture().createView();const n=r.createCommandEncoder();e.renderPasses.forEach(function(i){let s=i.type==="compute",u=s?n.beginComputePass():n.beginRenderPass(t);i.texture&&p(i),u.setPipeline(i.pipeline),u.setBindGroup(0,Array.isArray(i.bindGroup)?i.bindGroup[v%2]:i.bindGroup),i.vertexBuffers&&i.vertexBuffers.forEach(function(c,a){u.setVertexBuffer(a,c)}),i.numVertices?u.draw(3,i.numVertices,0,0):!s&&(i.type,u.draw(3*2,1,0,0)),i.dispatchWorkGroups&&u.dispatchWorkgroups(i.dispatchWorkGroups),u.end()}),r.queue.submit([n.finish()]),v++};function l(e){let{data:r,device:t}=e,n=Object.values(r).filter(i=>typeof i!="object"),o=new Float32Array(n.length);return o.set(n,0),e.uniformsBuffer?(t.queue.writeBuffer(e.uniformsBuffer,0,o.buffer,0,28),e.uniformsBuffer):e.uniformsBuffer=m.createBuffer(t,o,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST)}async function B(e){var a;let{device:r}=e,t={layout:"auto",vertex:{module:((a=e==null?void 0:e.shader)==null?void 0:a.vs)||e.shader,entryPoint:"main_vertex",buffers:[]},fragment:{module:e.shader,entryPoint:"main_fragment",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list"}};e.compute&&t.vertex.buffers.push({arrayStride:4*4,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:2*4,format:"float32x2"}]},{arrayStride:2*4,stepMode:"vertex",attributes:[{shaderLocation:2,offset:0,format:"float32x2"}]});const n=r.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"nearest"}),o=r.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT|GPUShaderStage.COMPUTE,buffer:{type:"uniform",minBindingSize:4*7}},{binding:1,visibility:GPUShaderStage.FRAGMENT|GPUShaderStage.COMPUTE,type:"sampler",sampler:n},{binding:2,visibility:GPUShaderStage.FRAGMENT|GPUShaderStage.COMPUTE,texture:{}}]}),i=r.createPipelineLayout({bindGroupLayouts:[o]});e.bindGroupLayout=o,l(e);const s={colorAttachments:[{view:void 0,clearValue:{r:.5,g:.5,b:.5,a:1},loadOp:"clear",storeOp:"store"}]};e.renderPassDescriptor=s;let u=r.createRenderPipeline({...t,layout:i}),c=await P(e);return e.bindGroupDescriptor={layout:u.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.uniformsBuffer}},{binding:1,resource:n},{binding:2,resource:c.createView({baseMipLevel:0,mipLevelCount:1}),texture:{sampleType:"float",viewDimension:"2d",multisampled:0}}]},e.bindGroupDescriptor.entries[0].resource.buffer=l(e),e.bindGroupDescriptor.entries[2].resource=e.cubeTexture.createView({baseMipLevel:0,mipLevelCount:1}),u}function U(e,r){const{device:t,data:n}=e;r||(r=x),S(n);const i=`
    struct Uniforms {
     ${Object.keys(n).filter(s=>typeof n[s]=="number").map(s=>`${s}: f32,`).join(`
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
  ${r}`;return console.log(123123),console.log(i),e.compute?t.createShaderModule({code:e.compute.vs+e.compute.fs}):t.createShaderModule({code:i})}let w={width:innerWidth,height:innerHeight,pixelRatio:2,time:0,mouseX:0,mouseY:0,angle:0};function S(e){if(typeof e.width!="number")throw new Error("bad data!!")}const M=function(e,r){e.addEventListener("mousemove",t=>{let n=t.pageX,o=t.pageY;r.mouseX=n/t.target.clientWidth,r.mouseY=o/t.target.clientHeight})};async function b(e){let r=e.canvas||m.createCanvas();const t={renderPassDescriptor:{},data:Object.assign(w,e.data),compute:e.compute,renderPasses:[]};M(r,t.data);const n=r.getContext("webgpu"),o=await navigator.gpu.requestAdapter(),i=await(o==null?void 0:o.requestDevice()),s=navigator.gpu.getPreferredCanvasFormat();Object.assign(t,{device:i,context:n,adapter:o}),n.configure({device:i,format:s,alphaMode:"opaque",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),t.shader=U(t,e.shader),t.pipeline=await B(t),T(t);function u(c){return c.time=performance.now(),p(t),Object.assign(t.data,c),l(t),G(t),u}return u.canvas=r,u}b.version="0.6.0",f.init=b,Object.defineProperties(f,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});

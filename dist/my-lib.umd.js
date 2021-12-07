(function(a,u){typeof exports=="object"&&typeof module!="undefined"?u(exports):typeof define=="function"&&define.amd?define(["exports"],u):(a=typeof globalThis!="undefined"?globalThis:a||self,u(a.MyLib={}))})(this,function(a){"use strict";const u=(n,t,e)=>{let r={size:t.byteLength+3&~3,usage:e,mappedAtCreation:!0},o=n.createBuffer(r);return t[5]=Date.now(),(t instanceof Uint16Array?new Uint16Array(o.getMappedRange()):new Float32Array(o.getMappedRange())).set(t),o.unmap(),o};function b(n=960,t=500){let e=devicePixelRatio;var r=document.createElement("canvas");return r.width=e*n,r.height=e*t,r.style.width=n+"px",document.body.appendChild(r),r}var l={createBuffer:u,createCanvas:b},y=`let size = 4.0;

    let b = 0.3;		//size of the smoothed border

    fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {
      let aspect = iResolution.x/iResolution.y;
      let position = (fragCoord.xy) * aspect;
      let dist = distance(position, vec2<f32>(aspect*0.5, 0.5));
      let offset=u.time * 000.0001;
      let conv=4.;
      let v=dist*4.-offset;
      let ringr=floor(v);
      
      var stuff = 0.;
      if (v % 3. > .5) {
        stuff = 0.;
      }

	var color=smoothStep(-b, b, abs(dist- (ringr+stuff+offset)/conv));
      if (ringr % 2. ==1.) {
       color=2.-color;
      }

    let distToMouseX = distance(u.mouseX, fragCoord.x);
    let distToMouseY = distance(u.mouseY, fragCoord.y);

    return vec4<f32>(
      distToMouseX, 
      color, 
      color, 
      1.
      );
  };

  fn main(uv: vec2<f32>) -> vec4<f32> {
    let fragCoord = vec2<f32>(uv.x, uv.y);
    var base = vec4<f32>(cos(u.time * .000001), .5, sin(u.time * 0.000001), 1.);
    let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));
    return mainImage(fragCoord, vec2<f32>(u.width, u.height));
  }

  [[stage(fragment)]]
  fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
    return main(in.uv) - vec4<f32>(.8);
  }
  `;const h=new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),x=async function(n){let{attribsBuffer:t,context:e,gpuDevice:r,pipeline:o,uniformsBuffer:i,renderPassDescriptor:c}=n;const f=r.createCommandEncoder(),p=e.getCurrentTexture().createView();c.colorAttachments[0].view=p;let s=f.beginRenderPass(c);s.setPipeline(o);const d=r.createBindGroup({layout:o.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:i}}]});s.setBindGroup(0,d),s.setVertexBuffer(0,t),s.draw(3*2,1,0,0),s.endPass(),r.queue.submit([f.finish()])};function w(n){let{data:t,gpuDevice:e}=n,r=Object.values(t),o=new Float32Array(r.length);o.set(r,0),n.uniformsBuffer=l.createBuffer(e,o,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST)}function P(n,t){let e={vertex:{module:n,entryPoint:"main_vertex",buffers:[{arrayStride:Float32Array.BYTES_PER_ELEMENT*2,attributes:[{offset:0,shaderLocation:0,format:"float32x2"}]}]},fragment:{module:n,entryPoint:"main_fragment",targets:[{format:"bgra8unorm"}]},primitives:{topology:"triangle-list"}};return t.createRenderPipeline(e)}function B(n,t,e){e||(e=y),R(t);const o=`
  [[block]] struct Uniforms {
    ${Object.keys(t).map(i=>`${i}: f32;`).join(`
`)}
  };
  [[group(0), binding(0)]] var<uniform> u: Uniforms;
  // [[group(0), binding(1)]] var mySampler: sampler;
  // [[group(0), binding(2)]] var myTexture: texture_external;
  struct VertexInput {
    [[location(0)]] pos: vec2<f32>;
  };
  struct VertexOutput {
    [[builtin(position)]] pos: vec4<f32>;
    [[location(0)]] uv: vec2<f32>;
  };

  [[stage(vertex)]]
  fn main_vertex(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;
    var pos: vec2<f32> = input.pos * 3.0 - 1.0;
    output.pos = vec4<f32>(pos, 0.0, 1.0);
    output.uv = input.pos;
    return output;
  }
  ${e}`;return n.createShaderModule({code:o})}let C={width:900,height:500,pixelRatio:2,time:0,mouseX:0,mouseY:0,angle:0};function R(n){if(typeof n.width!="number")throw new Error("bad data!!")}const E=function(n,t){n.addEventListener("mousemove",e=>{let r=e.pageX,o=e.pageY;t.mouseX=r/e.target.clientWidth,t.mouseY=o/e.target.clientHeight})};async function O(n){let t=n.canvas||l.createCanvas();const e={renderPassDescriptor:{},attribsBuffer:{},data:Object.assign(C,n.data)};E(t,e.data);const r=t.getContext("webgpu"),o=await navigator.gpu.requestAdapter(),i=await(o==null?void 0:o.requestDevice()),c=r.getPreferredFormat(o),f=[t.width*devicePixelRatio,t.height*devicePixelRatio];Object.assign(e,{gpuDevice:i,context:r,adapter:o}),r.configure({device:i,format:c,size:f});let p=B(i,e.data,n.shader);const s=P(p,i),d=r.getCurrentTexture().createView(),v={colorAttachments:[{view:d,loadValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]};e.renderPassDescriptor=v,Object.assign(e,{textureView:d,renderPassDescriptor:v,pipeline:s}),e.attribsBuffer=l.createBuffer(i,h,GPUBufferUsage.VERTEX);function m(g){return g.time||(g.time=performance.now()),Object.assign(e.data,g),w(e),x(e),m}return m.canvas=t,m}a.init=O,Object.defineProperty(a,"__esModule",{value:!0}),a[Symbol.toStringTag]="Module"});

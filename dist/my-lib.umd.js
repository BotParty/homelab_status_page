(function(a,u){typeof exports=="object"&&typeof module!="undefined"?u(exports):typeof define=="function"&&define.amd?define(["exports"],u):(a=typeof globalThis!="undefined"?globalThis:a||self,u(a.MyLib={}))})(this,function(a){"use strict";const u=(t,n,e)=>{let r={size:n.byteLength+3&~3,usage:e,mappedAtCreation:!0},o=t.createBuffer(r);return n[5]=Date.now(),(n instanceof Uint16Array?new Uint16Array(o.getMappedRange()):new Float32Array(o.getMappedRange())).set(n),o.unmap(),o};function g(t=960,n=500){let e=devicePixelRatio;var r=document.createElement("canvas");return r.width=e*t,r.height=e*n,r.style.width=t+"px",document.body.appendChild(r),r}function b(t){return t}var l={createBuffer:u,createCanvas:g,addMouseEvents:b},y=`let size = 4.0;

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
  `;const x=new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),h=async function(t){let{attribsBuffer:n,context:e,gpuDevice:r,pipeline:o,uniformsBuffer:i,renderPassDescriptor:c}=t;const f=r.createCommandEncoder(),p=e.getCurrentTexture().createView();c.colorAttachments[0].view=p;let s=f.beginRenderPass(c);s.setPipeline(o);const d=r.createBindGroup({layout:o.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:i}}]});s.setBindGroup(0,d),s.setVertexBuffer(0,n),s.draw(3*2,1,0,0),s.endPass(),r.queue.submit([f.finish()])};function w(t){let{data:n,gpuDevice:e}=t,r=Object.values(n),o=new Float32Array(r.length);o.set(r,0),t.uniformsBuffer=l.createBuffer(e,o,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST)}function P(t,n){let e={vertex:{module:t,entryPoint:"main_vertex",buffers:[{arrayStride:Float32Array.BYTES_PER_ELEMENT*2,attributes:[{offset:0,shaderLocation:0,format:"float32x2"}]}]},fragment:{module:t,entryPoint:"main_fragment",targets:[{format:"bgra8unorm"}]},primitives:{topology:"triangle-list"}};return n.createRenderPipeline(e)}function B(t,n,e){e||(e=y),R(n);const o=`
  [[block]] struct Uniforms {
    ${Object.keys(n).map(i=>`${i}: f32;`).join(`
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
  ${e}`;return t.createShaderModule({code:o})}let C={width:900,height:500,pixelRatio:2,time:0,mouseX:0,mouseY:0,angle:0};function R(t){if(typeof t.width!="number")throw new Error("bad data!!")}async function O(t){let n=t.canvas||l.createCanvas();const e={renderPassDescriptor:{},attribsBuffer:{},data:Object.assign(C,t.data)},r=n.getContext("webgpu"),o=await navigator.gpu.requestAdapter(),i=await(o==null?void 0:o.requestDevice()),c=r.getPreferredFormat(o),f=[n.width*devicePixelRatio,n.height*devicePixelRatio];Object.assign(e,{gpuDevice:i,context:r,adapter:o}),r.configure({device:i,format:c,size:f});let p=B(i,e.data,t.shader);const s=P(p,i),d=r.getCurrentTexture().createView(),m={colorAttachments:[{view:d,loadValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]};e.renderPassDescriptor=m,Object.assign(e,{textureView:d,renderPassDescriptor:m,pipeline:s}),e.attribsBuffer=l.createBuffer(i,x,GPUBufferUsage.VERTEX);function v(A){return Object.assign(e.data,A),w(e),h(e),v}return v.canvas=n,v}a.init=O,Object.defineProperty(a,"__esModule",{value:!0}),a[Symbol.toStringTag]="Module"});

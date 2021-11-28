(function(a,u){typeof exports=="object"&&typeof module!="undefined"?u(exports):typeof define=="function"&&define.amd?define(["exports"],u):(a=typeof globalThis!="undefined"?globalThis:a||self,u(a.MyLib={}))})(this,function(a){"use strict";let u=`//This is rings
let size = 4.0;

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
  
  `;const m=(n,e,r)=>{let t={size:e.byteLength+3&~3,usage:r,mappedAtCreation:!0},o=n.createBuffer(t);return e[5]=Date.now(),(e instanceof Uint16Array?new Uint16Array(o.getMappedRange()):new Float32Array(o.getMappedRange())).set(e),o.unmap(),o};function g(n=960,e=500){let r=devicePixelRatio;var t=document.createElement("canvas");return t.width=r*n,t.height=r*e,t.style.width=n+"px",document.body.appendChild(t),t}let l={createBuffer:m,createCanvas:g};const b=new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),y=async function(n){let{attribsBuffer:e,context:r,gpuDevice:t,pipeline:o,uniformsBuffer:s,renderPassDescriptor:c}=n;const f=t.createCommandEncoder(),p=r.getCurrentTexture().createView();c.colorAttachments[0].view=p;let i=f.beginRenderPass(c);i.setPipeline(o);const d=t.createBindGroup({layout:o.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:s}}]});i.setBindGroup(0,d),i.setVertexBuffer(0,e),i.draw(3*2,1,0,0),i.endPass(),t.queue.submit([f.finish()])};function x(n){let{data:e,gpuDevice:r}=n,t=Object.values(e),o=new Float32Array(t.length);o.set(t,0),n.uniformsBuffer=l.createBuffer(r,o,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST)}function h(n,e){let r={vertex:{module:n,entryPoint:"main_vertex",buffers:[{arrayStride:Float32Array.BYTES_PER_ELEMENT*2,attributes:[{offset:0,shaderLocation:0,format:"float32x2"}]}]},fragment:{module:n,entryPoint:"main_fragment",targets:[{format:"bgra8unorm"}]},primitives:{topology:"triangle-list"}};return e.createRenderPipeline(r)}function P(n,e,r){r||(r=u);const o=`
  [[block]] struct Uniforms {
    ${Object.keys(e).map(s=>`${s}: f32;`).join(`
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
  ${r}`;return n.createShaderModule({code:o})}async function w(n){const e={renderPassDescriptor:{},attribsBuffer:{},data:n.data||{},canvas:n.canvas||l.createCanvas(),state:{}},r=e.canvas.value||e.canvas.getContext("webgpu"),t=await navigator.gpu.requestAdapter(),o=await(t==null?void 0:t.requestDevice()),s=r.getPreferredFormat(t),c=[e.canvas.width*devicePixelRatio,e.canvas.height*devicePixelRatio];Object.assign(e,{gpuDevice:o,context:r,adapter:t}),r.configure({device:o,format:s,size:c});let f=P(o,e.data,n.shader);const p=h(f,o),i=r.getCurrentTexture().createView(),d={colorAttachments:[{view:i,loadValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]};e.renderPassDescriptor=d,Object.assign(e,{textureView:i,renderPassDescriptor:d,pipeline:p}),e.attribsBuffer=l.createBuffer(o,b,GPUBufferUsage.VERTEX);function v(B){return Object.assign(e.data,B),x(e),y(e),v}return v.canvas=e.canvas,v}a.init=w,Object.defineProperty(a,"__esModule",{value:!0}),a[Symbol.toStringTag]="Module"});

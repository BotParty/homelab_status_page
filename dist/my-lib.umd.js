(function(a,c){typeof exports=="object"&&typeof module!="undefined"?c(exports):typeof define=="function"&&define.amd?define(["exports"],c):(a=typeof globalThis!="undefined"?globalThis:a||self,c(a.MyLib={}))})(this,function(a){"use strict";let c=`//This is rings
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
  
  `;const g=(t,e,n)=>{let r={size:e.byteLength+3&~3,usage:n,mappedAtCreation:!0},i=t.createBuffer(r);return e[5]=Date.now(),(e instanceof Uint16Array?new Uint16Array(i.getMappedRange()):new Float32Array(i.getMappedRange())).set(e),i.unmap(),i};function b(t=960,e=500){let n=devicePixelRatio;var r=document.createElement("canvas");return r.width=n*t,r.height=n*e,r.style.width=t+"px",document.body.appendChild(r),r}let l={createBuffer:g,createCanvas:b};const h=new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),y=async function(t){let{attribsBuffer:e,context:n,gpuDevice:r,pipeline:i,uniformsBuffer:s,renderPassDescriptor:u}=t;const f=r.createCommandEncoder(),v=n.getCurrentTexture().createView();u.colorAttachments[0].view=v;let o=f.beginRenderPass(u);o.setPipeline(i);const d=r.createBindGroup({layout:i.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:s}}]});o.setBindGroup(0,d),o.setVertexBuffer(0,e),o.draw(3*2,1,0,0),o.endPass(),r.queue.submit([f.finish()])};function x(t){let{data:e,gpuDevice:n}=t,r=Object.values(e),i=new Float32Array(r.length);i.set(r,0),t.uniformsBuffer=l.createBuffer(n,i,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST)}function w(t,e){let n={vertex:{module:t,entryPoint:"main_vertex",buffers:[{arrayStride:Float32Array.BYTES_PER_ELEMENT*2,attributes:[{offset:0,shaderLocation:0,format:"float32x2"}]}]},fragment:{module:t,entryPoint:"main_fragment",targets:[{format:"bgra8unorm"}]},primitives:{topology:"triangle-list"}};return e.createRenderPipeline(n)}function P(t,e,n){n||(n=c);const i=`
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
  ${n}`;return t.createShaderModule({code:i})}async function p(t){const e={renderPassDescriptor:{},attribsBuffer:{},data:t.data,canvas:t.canvas||l.createCanvas(),state:{}},n=e.canvas.value||e.canvas.getContext("webgpu"),r=await navigator.gpu.requestAdapter(),i=await(r==null?void 0:r.requestDevice()),s=n.getPreferredFormat(r),u=[e.canvas.width*devicePixelRatio,e.canvas.height*devicePixelRatio];Object.assign(e,{gpuDevice:i,context:n,adapter:r}),n.configure({device:i,format:s,size:u});let f=P(i,m,t.shader);const v=w(f,i),o=n.getCurrentTexture().createView(),d={colorAttachments:[{view:o,loadValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]};e.renderPassDescriptor=d,Object.assign(e,{textureView:o,renderPassDescriptor:d,pipeline:v}),e.attribsBuffer=l.createBuffer(i,h,GPUBufferUsage.VERTEX);function C(A){return x(e),y(e),A}return{draw:C,canvas:e.canvas}}async function _(t){const e=document.createElement("canvas");e.addEventListener("mousemove",function(u){t.mouseX=u.clientX/t.width,t.mouseY=u.clientY/t.height});let n=Object.assign({},t);n.time=Date.now()%1e3;let r={data:n,canvas:e,width:t.width,height:t.height},i=await p(r);return i.draw(i)}let m={width:900,height:500,pixelRatio:2,time:0,mouseX:0,mouseY:0,angle:0};async function B(t){t.data=t.data||m;let e=await p(t);requestAnimationFrame(function n(){m.time=performance.now(),e=e.draw(e),requestAnimationFrame(n)})}a.init=p,a.start_loop_nb=_,a.start_loop_static=B,Object.defineProperty(a,"__esModule",{value:!0}),a[Symbol.toStringTag]="Module"});

(function(o,c){typeof exports=="object"&&typeof module!="undefined"?c(exports):typeof define=="function"&&define.amd?define(["exports"],c):(o=typeof globalThis!="undefined"?globalThis:o||self,c(o.MyLib={}))})(this,function(o){"use strict";let c=`//This is rings
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
  
  `;const g=(t,e,r)=>{let n={size:e.byteLength+3&~3,usage:r,mappedAtCreation:!0},a=t.createBuffer(n);return e[5]=Date.now(),(e instanceof Uint16Array?new Uint16Array(a.getMappedRange()):new Float32Array(a.getMappedRange())).set(e),a.unmap(),a};function b(t=960,e=500){let r=devicePixelRatio;var n=document.createElement("canvas");return n.width=r*t,n.height=r*e,n.style.width=t+"px",document.body.appendChild(n),n}let l={createBuffer:g,createCanvas:b};const h=new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),y=async function(t){let{attribsBuffer:e,context:r,gpuDevice:n,pipeline:a,uniformsBuffer:s,renderPassDescriptor:u}=t;const f=n.createCommandEncoder(),m=r.getCurrentTexture().createView();u.colorAttachments[0].view=m;let i=f.beginRenderPass(u);i.setPipeline(a);const d=n.createBindGroup({layout:a.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:s}}]});i.setBindGroup(0,d),i.setVertexBuffer(0,e),i.draw(3*2,1,0,0),i.endPass(),n.queue.submit([f.finish()])};function x(t){let{data:e,gpuDevice:r}=t,n=Object.values(e),a=new Float32Array(n.length);a.set(n,0),t.uniformsBuffer=l.createBuffer(r,a,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST)}function w(t,e){let r={vertex:{module:t,entryPoint:"main_vertex",buffers:[{arrayStride:Float32Array.BYTES_PER_ELEMENT*2,attributes:[{offset:0,shaderLocation:0,format:"float32x2"}]}]},fragment:{module:t,entryPoint:"main_fragment",targets:[{format:"bgra8unorm"}]},primitives:{topology:"triangle-list"}};return e.createRenderPipeline(r)}function P(t,e,r){r||(r=c);const a=`
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
  ${r}`;return t.createShaderModule({code:a})}async function v(t){const e={renderPassDescriptor:{},attribsBuffer:{},data:t.data,canvas:t.canvas||l.createCanvas(),state:{}},r=e.canvas.value||e.canvas.getContext("webgpu"),n=await navigator.gpu.requestAdapter(),a=await(n==null?void 0:n.requestDevice()),s=r.getPreferredFormat(n),u=[e.canvas.width*devicePixelRatio,e.canvas.height*devicePixelRatio];Object.assign(e,{gpuDevice:a,context:r,adapter:n}),r.configure({device:a,format:s,size:u});let f=P(a,p,t.shader);const m=w(f,a),i=r.getCurrentTexture().createView(),d={colorAttachments:[{view:i,loadValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]};e.renderPassDescriptor=d,Object.assign(e,{textureView:i,renderPassDescriptor:d,pipeline:m}),e.attribsBuffer=l.createBuffer(a,h,GPUBufferUsage.VERTEX);function C(A){return x(e),y(e),A}return{draw:C,canvas:e.canvas}}async function _(t){const e=document.createElement("canvas");e.addEventListener("mousemove",function(u){t.mouseX=u.clientX/t.width,t.mouseY=u.clientY/t.height});let r=Object.assign({},t);r.time=Date.now()%1e3;let n={data:r,canvas:e,width:t.width,height:t.height},a=await v(n);return a.draw(a)}let p={width:900,height:500,pixelRatio:2,time:0,mouseX:0,mouseY:0,angle:0};async function B(t){t.data=t.data||p;let e=await v(t);requestAnimationFrame(function r(){p.time=performance.now(),e=e.draw(e),requestAnimationFrame(r)})}o.start_loop_nb=_,o.start_loop_static=B,Object.defineProperty(o,"__esModule",{value:!0}),o[Symbol.toStringTag]="Module"});

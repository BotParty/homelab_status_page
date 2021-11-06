import{l as b,c as y}from"./vendor.6dc65a70.js";const U=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}};U();let E={width:900,height:500,pixelRatio:2,time:0,mouseX:0,mouseY:0,angle:0};const R=async function(e){let{attribsBuffer:o,context:n,gpuDevice:a,pipeline:t,uniformsBuffer:r,renderPassDescriptor:s}=e;const i=a.createCommandEncoder(),l=n.getCurrentTexture().createView();s.colorAttachments[0].view=l;const u=i.beginRenderPass(s);u.setPipeline(t);const p=a.createBindGroup({layout:t.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:r}}]});u.setBindGroup(0,p),u.setVertexBuffer(0,o),u.draw(3*2,1,0,0),u.endPass(),a.queue.submit([i.finish()])};function _(e){let{data:o,gpuDevice:n,uniformsBuffer:a,state:t,renderPassDescriptor:r,pipeline:s,attribsBuffer:i}=e,l=Object.values(o),u=new Float32Array(l.length);return u.set(l,0,l.length),w(n,u,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST)}function D(e,o,n){let a={vertex:{module:e,entryPoint:"main_vertex",buffers:[{arrayStride:Float32Array.BYTES_PER_ELEMENT*2,attributes:[{offset:0,shaderLocation:0,format:"float32x2"}]}]},fragment:{module:e,entryPoint:"main_fragment",targets:[{format:"bgra8unorm"}]},primitives:{topology:"triangle-list"}};return o.createRenderPipeline(a)}const w=(e,o,n)=>{let a={size:o.byteLength+3&~3,usage:n,mappedAtCreation:!0},t=e.createBuffer(a);return(o instanceof Uint16Array?new Uint16Array(t.getMappedRange()):new Float32Array(t.getMappedRange())).set(o),t.unmap(),t};function C(e,o,n,a){let t=`
    let size = 3.0;



    let b = 0.003;		//size of the smoothed border

    fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {
      let aspect = iResolution.x/iResolution.y;
      let position = (fragCoord.xy/iResolution.xy) * aspect;
      let dist = distance(position, vec2<f32>(aspect*0.5, 0.5));
      let offset=u.time;
      let conv=4.;
      let v=dist*4.-offset;
      let ringr=floor(v);
      //let color=smoothstep(-b, b, abs(dist- (ringr+float(fract(v)>0.5)+offset)/conv));
      //let color=smoothstep(-b, b, abs(dist- (ringr+((v)>0.5)+offset)/conv));
      var color = b;
      if (ringr % 2. ==1.) {
       color=2.-color;
      }
    return vec4<f32>(.5, color, color, 1.);
  };


  fn main(uv: vec2<f32>) -> vec4<f32> {
    let fragCoord = vec2<f32>(uv.x, uv.y);
    var base = vec4<f32>(cos(u.time), .5, sin(u.time), 1.);
    let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));
    return vec4<f32>(.3, .3, sin(u.time), 1.) + mainImage(fragCoord, vec2<f32>(u.width, u.height));
  }

  [[stage(fragment)]]
  fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
    return main(in.uv);
  }
  `;const r=Object.keys(o).map(i=>`${i}: f32;`).join(`
`);return e.createShaderModule({code:`
  [[block]] struct Uniforms {
    ${r}
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
  ${t}`})}function S(){return console.log("todo")}async function V(e){const o={data:e.data,canvas:e.canvas||S(),state:{}},n=o.canvas.value||o.canvas.getContext("webgpu"),a=await navigator.gpu.requestAdapter(),t=await a.requestDevice(),r=n.getPreferredFormat(a),s=[e.width*devicePixelRatio,e.height*devicePixelRatio];Object.assign(o,{gpuDevice:t,context:n,adapter:a}),n.configure({device:t,format:r,size:s});let i=C(t,E);const l=D(i,t),u=n.getCurrentTexture().createView(),p={colorAttachments:[{view:u,loadValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]};o.renderPassDescriptor=p,Object.assign(o,{textureView:u,renderPassDescriptor:p,pipeline:l});const O=new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]);o.attribsBuffer=w(t,O,GPUBufferUsage.VERTEX);function A(m){let B=_(o);return o.uniformsBuffer=B,R(o).finally(()=>{}),m}return{draw:A,canvas:e.canvas,updateUniforms:function(m){o.data=m,_(o)}}}var x={init:V};async function L(){const e=document.createElement("video");return e.loop=!0,e.autoplay=!0,e.muted=!0,e.width="480",e.height="270",e.currentTime=25,e.loop=!0,e.crossorigin="anonymous",e.controls="true",e.src="./data/ue5-short.webm",e.style.zIndex=-1002,e.style.position="absolute",await e.play(),document.body.appendChild(e),e}let c={width:900,height:500,pixelRatio:2,time:0,mouseX:0,mouseY:0,angle:0};console.log("a");const g=960,v=500;async function T(){const e=document.createElement("canvas");e.addEventListener("mousemove",function(r){c.mouseX=r.clientX/g,c.mouseY=r.clientY/v});let o=Object.assign({},c);o.time=Date.now()%1e3;let n={data:o,canvas:e,width:g,height:v},a=await x.init(n);return a.draw(a)}async function j(){const e=document.querySelector(".three");let o=await L(),n=Object.assign({},c);n.texture=o;let a={data:n,canvas:e,width:g,height:v},t=await x.init(a);requestAnimationFrame(function i(){c.time=Date.now()/1e3%1e3,t.updateUniforms(c),t.draw(t),requestAnimationFrame(i)});let r=b().domain([0,1]).range([0,.3]),s=b().domain([1,0]).range([0,1]);e.addEventListener("mousemove",function(i){console.log("updating uniforms"),c.mouseX=r(i.clientX/i.target.clientWidth),c.mouseY=s(i.clientY/i.target.clientHeight),console.log(c.time),t.updateUniforms(c)})}/*
 * From https://www.redblobgames.com/x/2122-shape-transition/
 * Copyright 2021 Red Blob Games <redblobgames@gmail.com>
 * @license CC-0 <https://creativecommons.org/share-your-work/public-domain/cc0/>
 */const P=2*Math.PI,f=1e5;let h={alpha:.3,speed:.2,spread:.1,chromaticblur:.1};const d=y({canvas:document.querySelector(".two")});let F=d.buffer(f),M=d.buffer(f);Array.from({length:f},e=>P*Math.random());let q=Array.from({length:f},e=>Math.random());d({frag:`
        precision highp float;
        uniform vec3 u_color;
        uniform float u_alpha;
        void main () {
            gl_FragColor = vec4(u_color * u_alpha, u_alpha);
        }`,vert:`
        precision highp float;
        uniform float u_time, u_chromaticblur, u_spread, u_speed;
        attribute float a_jitter;
        attribute vec2 a_position1, a_position2;
        void main () {
            float phase = 0.5 * (1.0 + cos(u_speed * (u_time + u_chromaticblur) + a_jitter * u_spread));
            phase = smoothstep(0.1, 0.9, phase);
            // TODO: make this a parameter, as the range seems like it's interesting to play with
            // phase = smoothstep(-0.9, 0.9, phase);
            // phase = smoothstep(0.1, 1.5, phase);
            gl_PointSize = 2.0; // TODO: should this be a parameter too?
            gl_Position = vec4(mix(a_position1, a_position2, phase), 0, 1);
        }`,depth:{enable:!1},blend:{enable:!0,func:{src:"one",dst:"one"}},attributes:{a_jitter:q,a_position1:F,a_position2:M},uniforms:{u_alpha:()=>h.alpha,u_speed:()=>4*h.speed,u_spread:()=>P*h.spread,u_color:d.prop("u_color"),u_chromaticblur:d.prop("u_chromaticblur"),u_time:e=>e.time},count:f,primitive:"points"});y({canvas:document.querySelector(".one")});let Y=window.location.host==="localhost:3000"?j:T;Y();document.querySelectorAll("input").forEach(e=>{});

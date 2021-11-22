import{l as P,c as C,s as I}from"./vendor.04b8817d.js";const k=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}};k();const L=new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]);let V={width:innerWidth,height:innerHeight,time:0,mouseX:0,mouseY:0,angle:0};const q=async function(t,e){let{attribsBuffer:r,context:o,gpuDevice:n,pipeline:i,uniformsBuffer:a,renderPassDescriptor:s}=t;const c=n.createCommandEncoder(),f=o.getCurrentTexture().createView();s.colorAttachments[0].view=f;let u;e?u=e:u=c.beginRenderPass(s),u.setPipeline(i);const b=n.createBindGroup({layout:i.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:a}}]});u.setBindGroup(0,b),u.setVertexBuffer(0,r),u.draw(3*2,1,0,0),u.endPass(),n.queue.submit([c.finish()])};function A(t){let{data:e,gpuDevice:r,uniformsBuffer:o,state:n,renderPassDescriptor:i,pipeline:a,attribsBuffer:s}=t,c=Object.values(e),f=new Float32Array(c.length);return f.set(c,0,c.length),O(r,f,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST)}function j(t,e,r){let o={vertex:{module:t,entryPoint:"main_vertex",buffers:[{arrayStride:Float32Array.BYTES_PER_ELEMENT*2,attributes:[{offset:0,shaderLocation:0,format:"float32x2"}]}]},fragment:{module:t,entryPoint:"main_fragment",targets:[{format:"bgra8unorm"}]},primitives:{topology:"triangle-list"}};return e.createRenderPipeline(o)}const O=(t,e,r)=>{let o={size:e.byteLength+3&~3,usage:r,mappedAtCreation:!0},n=t.createBuffer(o);return e[5]=Date.now(),(e instanceof Uint16Array?new Uint16Array(n.getMappedRange()):new Float32Array(n.getMappedRange())).set(e),n.unmap(),n};function X(t,e,r){let o=r;const n=Object.keys(e).map(a=>`${a}: f32;`).join(`
`);return t.createShaderModule({code:`
  [[block]] struct Uniforms {
    ${n}
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
  ${o}`})}function Y(t=960,e=500,r={}){let o=devicePixelRatio;var n=document.createElement("canvas");return n.width=o*t,n.height=o*e,n.style.width=t+"px",document.body.appendChild(n),n}async function z(t){const e={data:t.data,canvas:t.canvas||Y(),state:{}},r=e.canvas.value||e.canvas.getContext("webgpu"),o=await navigator.gpu.requestAdapter(),n=await o.requestDevice(),i=r.getPreferredFormat(o),a=[e.canvas.width*devicePixelRatio,e.canvas.height*devicePixelRatio];Object.assign(e,{gpuDevice:n,context:r,adapter:o}),r.configure({device:n,format:i,size:a});let s=X(n,V,t.shader);const c=j(s,n),f=r.getCurrentTexture().createView(),u={colorAttachments:[{view:f,loadValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]};e.renderPassDescriptor=u,Object.assign(e,{textureView:f,renderPassDescriptor:u,pipeline:c}),e.attribsBuffer=O(n,L,GPUBufferUsage.VERTEX);function b(y){let F=A(e);return e.uniformsBuffer=F,q(e),y}return{draw:b,canvas:e.canvas,updateUniforms:function(y){e.data=y,A(e)}}}var M={init:z};let S=960,T=500;async function G(){const t=document.createElement("canvas");t.addEventListener("mousemove",function(i){l.mouseX=i.clientX/S,l.mouseY=i.clientY/T});let e=Object.assign({},l);e.time=Date.now()%1e3;let r={data:e,canvas:t,width:S,height:T},o=await M.init(r);return o.draw(o)}let l={width:900,height:500,pixelRatio:2,time:0,mouseX:0,mouseY:0,angle:0};async function $(t){t.data=l;let e=await M.init(t);H(e),requestAnimationFrame(function r(){l.time=Date.now()%1e3/1e3,e.draw(e),setTimeout(r,250)})}function H(t){let e=P().domain([0,1]).range([0,.3]),r=P().domain([1,0]).range([0,1]);t.canvas.addEventListener("mousemove",function(o){l.mouseX=e(o.clientX/o.target.clientWidth),l.mouseY=r(o.clientY/o.target.clientHeight),t.updateUniforms(l)})}/*
 * From https://www.redblobgames.com/x/2122-shape-transition/
 * Copyright 2021 Red Blob Games <redblobgames@gmail.com>
 * @license CC-0 <https://creativecommons.org/share-your-work/public-domain/cc0/>
 */const _=2*Math.PI,d=1e5,N=.9,W=.4;let h={circleCount1:1,multiplier1:1,circleCount2:6,multiplier2:4},v={alpha:.3,speed:.2,spread:.1,chromaticblur:.1},p,x,w,Z=Array.from({length:d},t=>_*Math.random()),K=Array.from({length:d},t=>Math.random());function B(t,e){if(e===1)return[[0,0]];let r=[];for(let o=0;o<e;o++){let n=o%e*_/e;r.push([t*Math.sin(n),t*Math.cos(n)])}return r}function R(t,e,r,o){let n=[];for(let i=0;i<d;i++){let a=Z[i],s=e[i%e.length];n.push(s[0]+r*Math.sin(o*a),s[1]+r*Math.cos(o*a))}t({data:n})}function J(){let t=N,e=W;R(x,B(t,h.circleCount1),t,h.multiplier1),R(w,B(e,h.circleCount2),e,h.multiplier2)}function Q(t,e){return{frag:`
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
          }`,depth:{enable:!1},blend:{enable:!0,func:{src:"one",dst:"one"}},attributes:{a_jitter:K,a_position1:t,a_position2:e},uniforms:{u_alpha:()=>v.alpha,u_speed:()=>4*v.speed,u_spread:()=>_*v.spread,u_color:()=>[1,1,1],u_chromaticblur:()=>.3,u_time:o=>o.time},count:d,primitive:"points"}}let m;function ee(){p.clear({color:[0,0,0,1],depth:1});const t=.1*v.chromaticblur;m({u_color:[0,.1,.9],u_chromaticblur:0}),m({u_color:[0,.3,.5],u_chromaticblur:t}),m({u_color:[.1,.7,.1],u_chromaticblur:2*t}),m({u_color:[.5,.3,0],u_chromaticblur:3*t}),m({u_color:[.9,.1,0],u_chromaticblur:4*t})}function te(){console.log("hi 2"),p=C(),x=p.buffer(d),w=p.buffer(d),console.log("no worky");let t=Q(x,w);console.log(t),m=p(t),console.log("why no worky"),J(),p.frame(ee)}let g,ne=t=>{console.log("after get user media");const e=new AudioContext,r=e.createAnalyser();e.createMediaStreamSource(t).connect(r);const o=r.frequencyBinCount,n=new Uint8Array(o),i=g.buffer({length:o,type:"uint8",usage:"dynamic"}),a=g({vert:`
  precision mediump float;

  #define FFT_SIZE ${o}
  #define PI ${Math.PI}

  attribute float index, frequency;

  void main() {
    float theta = 2.0 * PI * index / float(FFT_SIZE);
    gl_Position = vec4(
      0.5 * cos(theta) * (1.0 + frequency),
      0.5 * sin(theta) * (1.0 + frequency),
      0,
      1);
  }`,frag:`
  void main() {
    gl_FragColor = vec4(1, 1, 1, 1);
  }`,attributes:{index:Array(o).fill().map((s,c)=>c),frequency:{buffer:i,normalized:!0}},elements:null,instances:-1,lineWidth:1,depth:{enable:!1},count:o,primitive:"line loop"});g.frame(({tick:s})=>{g.clear({color:[0,0,0,1],depth:1}),r.getByteFrequencyData(n),i.subdata(n),a()})},oe=t=>{console.log(t),console.log("ground")};async function re(){g=C(),console.log("b4 get user media"),await navigator.mediaDevices.getUserMedia({audio:!0}).then(ne).then(oe),console.log("hello")}var ie=`//This is rings
let size = 4.0;

    let b = 0.3;		//size of the smoothed border

    fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {
      let aspect = iResolution.x/iResolution.y;
      let position = (fragCoord.xy) * aspect;
      let dist = distance(position, vec2<f32>(aspect*0.5, 0.5));
      let offset=u.time * 0.1;
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
    return main(in.uv);
  }
  
  `,ae=`let size = 3.0;
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

    if (fragCoord.x > .5) {color = 1.; }
    return vec4<f32>(.5, 0., color, 1.);
  };


  fn main(uv: vec2<f32>) -> vec4<f32> {
    let fragCoord = vec2<f32>(uv.x, uv.y);
    var base = vec4<f32>(cos(u.time), .5, sin(u.time), 1.);
    let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));
    return vec4<f32>(.3, .3, sin(u.time * .001), 1.) + mainImage(fragCoord, vec2<f32>(u.width, u.height));
  }

  [[stage(fragment)]]
  fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
    
    let fragPosition = in.uv * vec2<f32>(u.height, u.width);
    
    var color = vec4<f32>(1., 1., 0., 1.);
    if (in.uv.x < .3) { color.x = 0.; }
    if (fragPosition.x % 2. == 1.) {color.x = 0.;}
    if (fragPosition.x % 2. == 1.) {color.y = 0.;}
        return color;


  }
  `,se=`[[stage(fragment)]]
  fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
    let fragPosition = in.uv * vec2<f32>(u.height, u.width);
    
    var color = vec4<f32>(1., 1., 0., 1.);
    if (in.uv.x < .3) { color.x = 0.; }
    if (fragPosition.x % 2. == 1.) {color.x = 0.;}
    if (fragPosition.x % 2. == 1.) {color.y = 0.;}

    return color;
}

`;let D=["shapeTransition","breath","stripes","rings","checkerboard"],U=[te,re,ae,ie,se];function E(t){let e=D.indexOf(t);console.log(e,t);let r=U[e];e<2&&r(),typeof r=="function"?r():le({shader:r})}let ce=document.querySelector("template").innerHTML,ue=document.querySelector("#control-panel");ue.innerHTML+=Object.keys(U).map(t=>ce.replace(/{replace_me}/g,D[t])).join(`
`);I("input").on("click",t=>{E(t.target.value)});function le(t){(window.location.host==="localhost:3000"?$:G)(t)}E("checkerboard");

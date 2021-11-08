import{l as x,c as w}from"./vendor.6dc65a70.js";const j=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerpolicy&&(a.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?a.credentials="include":o.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}};j();const k=new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]);let Y=`
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
  `,z={width:innerWidth,height:innerHeight,time:0,mouseX:0,mouseY:0,angle:0};const X=async function(e){let{attribsBuffer:t,context:n,gpuDevice:r,pipeline:o,uniformsBuffer:a,renderPassDescriptor:i}=e;const c=r.createCommandEncoder(),s=n.getCurrentTexture().createView();i.colorAttachments[0].view=s;const u=c.beginRenderPass(i);u.setPipeline(o);const p=r.createBindGroup({layout:o.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:a}}]});u.setBindGroup(0,p),u.setVertexBuffer(0,t),u.draw(3*2,1,0,0),u.endPass(),r.queue.submit([c.finish()])};function C(e){let{data:t,gpuDevice:n,uniformsBuffer:r,state:o,renderPassDescriptor:a,pipeline:i,attribsBuffer:c}=e,s=Object.values(t),u=new Float32Array(s.length);return u.set(s,0,s.length),P(n,u,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST)}function G(e,t,n){let r={vertex:{module:e,entryPoint:"main_vertex",buffers:[{arrayStride:Float32Array.BYTES_PER_ELEMENT*2,attributes:[{offset:0,shaderLocation:0,format:"float32x2"}]}]},fragment:{module:e,entryPoint:"main_fragment",targets:[{format:"bgra8unorm"}]},primitives:{topology:"triangle-list"}};return t.createRenderPipeline(r)}const P=(e,t,n)=>{let r={size:t.byteLength+3&~3,usage:n,mappedAtCreation:!0},o=e.createBuffer(r);return(t instanceof Uint16Array?new Uint16Array(o.getMappedRange()):new Float32Array(o.getMappedRange())).set(t),o.unmap(),o};function $(e,t,n){let r=n||Y;const o=Object.keys(t).map(i=>`${i}: f32;`).join(`
`);return e.createShaderModule({code:`
  [[block]] struct Uniforms {
    ${o}
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
  ${r}`})}function H(e=960,t=500,n={}){let r=devicePixelRatio;var o=document.createElement("canvas");return o.width=r*e,o.height=r*t,o.style.width=e+"px",document.body.appendChild(o),o}async function N(e){const t={data:e.data,canvas:e.canvas||H(),state:{}},n=t.canvas.value||t.canvas.getContext("webgpu"),r=await navigator.gpu.requestAdapter(),o=await r.requestDevice(),a=n.getPreferredFormat(r),i=[t.canvas.width*devicePixelRatio,t.canvas.height*devicePixelRatio];Object.assign(t,{gpuDevice:o,context:n,adapter:r}),n.configure({device:o,format:a,size:i});let c=$(o,z,e.shader);const s=G(c,o),u=n.getCurrentTexture().createView(),p={colorAttachments:[{view:u,loadValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]};t.renderPassDescriptor=p,Object.assign(t,{textureView:u,renderPassDescriptor:p,pipeline:s}),t.attribsBuffer=P(o,k,GPUBufferUsage.VERTEX);function L(b){let V=C(t);return t.uniformsBuffer=V,X(t).finally(()=>{}),b}return{draw:L,canvas:t.canvas,updateUniforms:function(b){t.data=b,C(t)}}}var A={init:N};let S=960,E=500;async function W(){const e=document.createElement("canvas");e.addEventListener("mousemove",function(a){l.mouseX=a.clientX/S,l.mouseY=a.clientY/E});let t=Object.assign({},l);t.time=Date.now()%1e3;let n={data:t,canvas:e,width:S,height:E},r=await A.init(n);return r.draw(r)}let l={width:900,height:500,pixelRatio:2,time:0,mouseX:0,mouseY:0,angle:0};async function Z(e){let t=Object.assign({},l);e.data=t;let n=await A.init(e);K(n),requestAnimationFrame(function(){l.time=performance.now(),n.updateUniforms(l),n.draw(n)})}function K(e){let t=x().domain([0,1]).range([0,.3]),n=x().domain([1,0]).range([0,1]);e.canvas.addEventListener("mousemove",function(r){l.mouseX=t(r.clientX/r.target.clientWidth),l.mouseY=n(r.clientY/r.target.clientHeight),e.updateUniforms(l)})}/*
 * From https://www.redblobgames.com/x/2122-shape-transition/
 * Copyright 2021 Red Blob Games <redblobgames@gmail.com>
 * @license CC-0 <https://creativecommons.org/share-your-work/public-domain/cc0/>
 */const y=2*Math.PI,m=1e5,O=.9,B=.4;let f={circleCount1:1,multiplier1:1,circleCount2:6,multiplier2:4},h={alpha:.3,speed:.2,spread:.1,chromaticblur:.1};const d=w({canvas:document.querySelector(".two")});let R=d.buffer(m),U=d.buffer(m),J=Array.from({length:m},e=>y*Math.random()),Q=Array.from({length:m},e=>Math.random());function M(e,t){if(t===1)return[[0,0]];let n=[];for(let r=0;r<t;r++){let o=r%t*y/t;n.push([e*Math.sin(o),e*Math.cos(o)])}return n}function D(e,t,n,r){let o=[];for(let a=0;a<m;a++){let i=J[a],c=t[a%t.length];o.push(c[0]+n*Math.sin(r*i),c[1]+n*Math.cos(r*i))}e({data:o})}function q(){let e=f.circleCount1===1?O:B,t=f.circleCount2===1?O:B;D(R,M(e,f.circleCount1),e,f.multiplier1),D(U,M(t,f.circleCount2),t,f.multiplier2)}const v=d({frag:`
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
        }`,depth:{enable:!1},blend:{enable:!0,func:{src:"one",dst:"one"}},attributes:{a_jitter:Q,a_position1:R,a_position2:U},uniforms:{u_alpha:()=>h.alpha,u_speed:()=>4*h.speed,u_spread:()=>y*h.spread,u_color:d.prop("u_color"),u_chromaticblur:d.prop("u_chromaticblur"),u_time:e=>e.time},count:m,primitive:"points"});function T(e,t,n,r,o){let a=document.getElementById("control-panel");for(let i of Object.keys(e)){let c=document.createElement("label"),s=document.createElement("input"),u=document.createElement("br");c.innerHTML=`${i}`,c.style.display="inline-block",c.style.width="8em",c.style.textAlign="right",s.setAttribute("id",i),s.setAttribute("type","range"),s.setAttribute("min",t),s.setAttribute("max",n),s.setAttribute("step",r),s.setAttribute("value",e[i]),s.addEventListener("input",p=>{e[i]=s.valueAsNumber,o&&q()}),a.appendChild(c),a.appendChild(s),a.appendChild(u)}}function ee(){d.clear({color:[0,0,0,1],depth:1});const e=.1*h.chromaticblur;v({u_color:[0,.1,.9],u_chromaticblur:0}),v({u_color:[0,.3,.5],u_chromaticblur:e}),v({u_color:[.1,.7,.1],u_chromaticblur:2*e}),v({u_color:[.5,.3,0],u_chromaticblur:3*e}),v({u_color:[.9,.1,0],u_chromaticblur:4*e})}function te(){console.log("hi"),T(h,0,1,.01,!1),T(f,1,20,1,!0),q(),d.frame(ee)}let g=w({canvas:document.querySelector(".one")}),ne=e=>{console.log("after get user media");const t=new AudioContext,n=t.createAnalyser();t.createMediaStreamSource(e).connect(n);const r=n.frequencyBinCount,o=new Uint8Array(r),a=g.buffer({length:r,type:"uint8",usage:"dynamic"}),i=g({vert:`
  precision mediump float;

  #define FFT_SIZE ${r}
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
  }`,attributes:{index:Array(r).fill().map((c,s)=>s),frequency:{buffer:a,normalized:!0}},elements:null,instances:-1,lineWidth:1,depth:{enable:!1},count:r,primitive:"line loop"});g.frame(({tick:c})=>{g.clear({color:[0,0,0,1],depth:1}),n.getByteFrequencyData(o),a.subdata(o),i()})},oe=e=>{console.log(e),console.log("ground")};async function re(){console.log("b4 get user media"),await navigator.mediaDevices.getUserMedia({audio:!0}).then(ne).then(oe),console.log("hello")}var ae=`let size = 3.0;

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
    return main(in.uv);
  }
  `,ie=`[[stage(fragment)]]
  fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
    let fragPosition = in.uv * vec2<f32>(u.height, u.width);
    
    var color = vec4<f32>(1., 1., 0., 1.);
    if (in.uv.x < .3) { color.x = 0.; }
    if (fragPosition.x % 2. == 1.) {color.x = 0.;}
    if (fragPosition.x % 2. == 1.) {color.y = 0.;}

    return color;
}

`;let F={shapeTransition:te,breath:re,stripes:se,rings:ce,checkerboard:ue};function se(){I()}function ce(){_({shader:ae})}function ue(){_({shader:ie})}let le=document.querySelector("template").innerHTML,fe=document.querySelector("#control-panel");fe.innerHTML+=Object.keys(F).map(e=>le.replace(/{replace_me}/g,e)).join(`
`);function _(e){(window.location.host==="localhost:3000"?Z:W)(e)}async function I(){async function e(){const n=document.createElement("video");return n.loop=!0,n.autoplay=!0,n.muted=!0,n.width="480",n.height="270",n.currentTime=15,n.loop=!0,n.crossorigin="anonymous",n.controls="true",n.src="./data/ue5-short.webm",await n.play(),document.body.appendChild(n),n}let t=await e();_({video:t})}I();document.querySelectorAll("input").forEach(e=>{e.addEventListener("click",t=>{console.log("name",t.target.value),de(),F[t.target.value]()})});function de(){console.log("hello");let e=document.querySelector("video");e&&document.body.removeChild(e);let t=document.querySelector("canvas");document.body.removeChild(t)}

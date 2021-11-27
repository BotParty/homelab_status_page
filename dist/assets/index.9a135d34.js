import{c as C,s as w}from"./vendor.35937887.js";const I=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}};I();let D=`//This is rings
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
  
  `;const q=(e,t,o)=>{let r={size:t.byteLength+3&~3,usage:o,mappedAtCreation:!0},n=e.createBuffer(r);return t[5]=Date.now(),(t instanceof Uint16Array?new Uint16Array(n.getMappedRange()):new Float32Array(n.getMappedRange())).set(t),n.unmap(),n};function F(e=960,t=500){let o=devicePixelRatio;var r=document.createElement("canvas");return r.width=o*e,r.height=o*t,r.style.width=e+"px",document.body.appendChild(r),r}let h={createBuffer:q,createCanvas:F};const U=new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),X=async function(e){let{attribsBuffer:t,context:o,gpuDevice:r,pipeline:n,uniformsBuffer:i,renderPassDescriptor:a}=e;const s=r.createCommandEncoder(),d=o.getCurrentTexture().createView();a.colorAttachments[0].view=d;let c=s.beginRenderPass(a);c.setPipeline(n);const v=r.createBindGroup({layout:n.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:i}}]});c.setBindGroup(0,v),c.setVertexBuffer(0,t),c.draw(3*2,1,0,0),c.endPass(),r.queue.submit([s.finish()])};function E(e){let{data:t,gpuDevice:o}=e,r=Object.values(t),n=new Float32Array(r.length);n.set(r,0),e.uniformsBuffer=h.createBuffer(o,n,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST)}function V(e,t){let o={vertex:{module:e,entryPoint:"main_vertex",buffers:[{arrayStride:Float32Array.BYTES_PER_ELEMENT*2,attributes:[{offset:0,shaderLocation:0,format:"float32x2"}]}]},fragment:{module:e,entryPoint:"main_fragment",targets:[{format:"bgra8unorm"}]},primitives:{topology:"triangle-list"}};return t.createRenderPipeline(o)}function Y(e,t,o){o||(o=D);const n=`
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
  ${o}`;return e.createShaderModule({code:n})}async function P(e){const t={renderPassDescriptor:{},attribsBuffer:{},data:e.data,canvas:e.canvas||h.createCanvas(),state:{}},o=t.canvas.value||t.canvas.getContext("webgpu"),r=await navigator.gpu.requestAdapter(),n=await(r==null?void 0:r.requestDevice()),i=o.getPreferredFormat(r),a=[t.canvas.width*devicePixelRatio,t.canvas.height*devicePixelRatio];Object.assign(t,{gpuDevice:n,context:o,adapter:r}),o.configure({device:n,format:i,size:a});let s=Y(n,b,e.shader);const d=V(s,n),c=o.getCurrentTexture().createView(),v={colorAttachments:[{view:c,loadValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]};t.renderPassDescriptor=v,Object.assign(t,{textureView:c,renderPassDescriptor:v,pipeline:d}),t.attribsBuffer=h.createBuffer(n,U,GPUBufferUsage.VERTEX);function A(B){return E(t),X(t),B}return{draw:A,canvas:t.canvas}}async function z(e){const t=document.createElement("canvas");t.addEventListener("mousemove",function(a){e.mouseX=a.clientX/e.width,e.mouseY=a.clientY/e.height});let o=Object.assign({},e);o.time=Date.now()%1e3;let r={data:o,canvas:t,width:e.width,height:e.height},n=await P(r);return n.draw(n)}let b={width:900,height:500,pixelRatio:2,time:0,mouseX:0,mouseY:0,angle:0};async function j(e){e.data=e.data||b;let t=await P(e);requestAnimationFrame(function o(){b.time=performance.now(),t=t.draw(t),requestAnimationFrame(o)})}/*
 * From https://www.redblobgames.com/x/2122-shape-transition/
 * Copyright 2021 Red Blob Games <redblobgames@gmail.com>
 * @license CC-0 <https://creativecommons.org/share-your-work/public-domain/cc0/>
 */const y=2*Math.PI,u=1e5,k=.9,L=.4;let p={circleCount1:1,multiplier1:1,circleCount2:6,multiplier2:4},g={alpha:.3,speed:.2,spread:.1,chromaticblur:.9},f,x,_,G=Array.from({length:u},e=>y*Math.random()),$=Array.from({length:u},e=>Math.random());function M(e,t){if(t===1)return[[0,0]];let o=[];for(let r=0;r<t;r++){let n=r%t*y/t;o.push([e*Math.sin(n),e*Math.cos(n)])}return o}function S(e,t,o,r){let n=[];for(let i=0;i<u;i++){let a=G[i],s=t[i%t.length];n.push(s[0]+o*Math.sin(r*a),s[1]+o*Math.cos(r*a))}e({data:n})}function N(){let e=k,t=L;S(x,M(e,p.circleCount1),e,p.multiplier1),S(_,M(t,p.circleCount2),t,p.multiplier2)}function H(e,t){return{frag:`
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
              float phase = 0.3 * (1.0 + cos(u_speed * (u_time + u_chromaticblur) + a_jitter * u_spread));
              phase = smoothstep(0.1, 0.9, phase);
              // TODO: make this a parameter, as the range seems like it's interesting to play with
              // phase = smoothstep(-0.9, 0.9, phase);
              // phase = smoothstep(0.1, 1.5, phase);
              gl_PointSize = 1.5; // TODO: should this be a parameter too?
              gl_Position = vec4(mix(a_position1, a_position2, phase), 0, 1);
          }`,depth:{enable:!1},blend:{enable:!0,func:{src:"one",dst:"one"}},attributes:{a_jitter:$,a_position1:e,a_position2:t},uniforms:{u_alpha:()=>g.alpha,u_speed:()=>2*g.speed,u_spread:()=>y*g.spread,u_color:()=>[1,1,1],u_chromaticblur:()=>.5,u_time:r=>r.time},count:u,primitive:"points"}}let l;function Z(){f.clear({color:[0,0,0,1],depth:1});const e=.1*g.chromaticblur;l({u_color:[0,.1,.9],u_chromaticblur:0}),l({u_color:[0,.3,.5],u_chromaticblur:e}),l({u_color:[.1,.7,.1],u_chromaticblur:2*e}),l({u_color:[.5,.3,0],u_chromaticblur:3*e}),l({u_color:[.9,.1,0],u_chromaticblur:4*e})}function K(){f=C(),x=f.buffer(u),_=f.buffer(u);let e=H(x,_);l=f(e),N(),f.frame(Z)}let m,W=e=>{console.log("after get user media");const t=new AudioContext,o=t.createAnalyser();t.createMediaStreamSource(e).connect(o);const r=o.frequencyBinCount,n=new Uint8Array(r),i=m.buffer({length:r,type:"uint8",usage:"dynamic"}),a=m({vert:`
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
  }`,attributes:{index:Array(r).fill().map((s,d)=>d),frequency:{buffer:i,normalized:!0}},elements:null,instances:-1,lineWidth:1,depth:{enable:!1},count:r,primitive:"line loop"});m.frame(({tick:s})=>{m.clear({color:[0,0,0,1],depth:1}),o.getByteFrequencyData(n),i.subdata(n),a()})},J=e=>{console.log(e),console.log("ground")};async function Q(){m=C(),console.log("b4 get user media"),await navigator.mediaDevices.getUserMedia({audio:!0}).then(W).then(J),console.log("hello")}var ee=`//This is rings
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
  
  `,te=`let size = 3.0;
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
    
    var color = vec4<f32>(.5, .3, .8, 1.);
    if (in.uv.x < .3) { color.x = 0.; }
    if (fragPosition.x % 2. == 1.) {color.x = 0.;}
    if (fragPosition.x % 2. == 1.) {color.y = 0.;}
        return color;


  }
  `,ne=`[[stage(fragment)]]
  fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
    let fragPosition = in.uv * vec2<f32>(u.height, u.width);
    
    var color = vec4<f32>(1., 1., 0., 1.);
    if (in.uv.x < .3) { color.x = 0.; }
    if (fragPosition.x % 2. == 1.) {color.x = 0.;}
    if (fragPosition.x % 2. == 1.) {color.y = 0.;}

    var p = in.uv * fragPosition;
    var q = p.x % 25. * 2.0 < 25. == p.y % 25. * 2.0 < 25.;
    var o = f32(q);
    return vec4<f32>(o,o, .5, 1.0) * .5;
}
`,oe=`let size = 3.0;

    let b = 0.3;		//size of the smoothed border

    fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {
      let aspect = iResolution.x/iResolution.y;
      let position = (fragCoord.xy) * aspect;
      let dist = distance(position, vec2<f32>(aspect*0.5, 0.5));
      let offset=u.time * .00000001;
      let conv=4.;
      let v=dist*4.-offset;
      let ringr=floor(v);
      
      var stuff = 0.;
      if (v % 3. > .5) {
        stuff = 0.;
      }

	var color=smoothStep(-b, b, abs(dist- (ringr+stuff+offset)/conv));
      //let color=smoothstep(-b, b, abs(dist- (ringr+((v)>0.5)+offset)/conv));
      //var color = b;
      if (ringr % 2. ==1.) {
       color=2.-color;
      }

    let distToMouseX = distance(u.mouseX, fragCoord.x);
    let distToMouseY = distance(u.mouseY, fragCoord.y);

    if ( 
     distance(u.mouseX, fragCoord.x) > .1 || 
     distance(u.mouseY, fragCoord.y) > 2.
      ) {
        return vec4<f32>(.5);
      }

    //if (fragCoord.x > .5) {color = 1.; }
    return vec4<f32>(
      distToMouseX, 
      distToMouseY, 
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
  `;let T=["shapeTransition","breath","stripes","rings","checkerboard","one","four"],R=[K,Q,te,ee,ne,oe,"four"];function O(e){let t=T.indexOf(e),o=R[t];t<2&&o(),typeof o=="function"?o():(se(),ae({shader:o}))}let re=document.querySelector("template").innerHTML,ie=document.querySelector("#control-panel");ie.innerHTML+=Object.keys(R).map(e=>re.replace(/{replace_me}/g,T[e])).join(`
`);w("input").on("click",e=>{O(e.target.value)});function ae(e){(window.location.host==="localhost:3000"?j:z)(e)}function se(){let e=document.querySelector("video");e&&document.body.removeChild(e),document.querySelector("canvas"),w("canvas").remove()}O("checkerboard");

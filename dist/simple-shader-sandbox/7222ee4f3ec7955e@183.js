import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# WebGPU simple shader sandbox`
)}

function _simpleWebGpu(require){return(
require("simple-webgpu")
)}

async function* _draw(simpleWebGpu,rings)
{
  let data = {
    width: 900, //based on canvas
    height: 500, //based on canvas
    pixelRatio: 2, //based on canvas
    time: 0,
    mouseX: 0,
    mouseY: 0,
    angle: 0
  };

  let canvas = document.createElement("canvas");

  let draw = await simpleWebGpu.init({
    canvas,
    data,
    shader: rings
  });
  setInterval(() => {
    console.log(123, 456);
    draw({ time: performance.now() });
  }, 50);
  yield draw.canvas;
}


function _rings(){return(
`



const size = 4.0;

    const b = 0.3;		//size of the smoothed border

fn smoothStep(edge0:f32, edge1:f32, x:f32) -> f32 {
  if (x < edge0) {return 0.;}

  if (x >= edge1) {return 1.;}

  let c = (x - edge0) / (edge1 - edge0);

  return c * c * (3 - 2 * c);
}

    fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {
      let aspect = iResolution.x/iResolution.y;
      let position = (fragCoord.xy) * aspect;
      let dist = distance(position, vec2<f32>(aspect*0.5, 0.5));
      let offset=u.time * 000.001;
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
      u.mouseX,
      );
  };

  fn main(uv: vec2<f32>) -> vec4<f32> {
    let fragCoord = vec2<f32>(uv.x, uv.y);
    var base = vec4<f32>(cos(u.time * .1), .5, sin(u.time * 0.000001), 1.);
    let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));
    return mainImage(fragCoord, vec2<f32>(u.width, u.height));
  }

@fragment
  fn main_fragment( @location(0) fragUV: vec2<f32>,
      @location(1) fragPosition: vec4<f32>) 
  -> @location(0) vec4<f32> {
    return main(fragUV) - vec4<f32>(.0001);
  }
  
  `
)}

function _language(select){return(
select({
  title: "Language",
  description: "Pleasse select your target language.",
  options: ["en-US", "en-GB", "es", "fr", "de", "ar"],
  value: "Moe"
})
)}

function _transcript(){return(
""
)}

function _7(listening,html,d3,startListening,$0)
{
  listening;
  const btn = html`<button id="testButton">${listening ? "Listening ..." : "Listen"}</button>`;
  
  d3.select(btn).on("click", () => {
    //debugger;
    if (!listening) {
      startListening();
    }
    $0.value = !($0.value)
    

  })
  
  return btn
}


function _8(html){return(
html`<hr>`
)}

function _startListening($0,$1,recognition){return(
() => { 
  //debugger;
  $0.value = null;
  $1.value = null;
  
  recognition.start();
  return this;
}
)}

function _listening(){return(
false
)}

function _error(){return(
null
)}

function _recognition(webkitSpeechRecognition,language,$0,_,$1,$2)
{
  //debugger;
  //b1;

      const recognition = new webkitSpeechRecognition();
      recognition.continuous =  false;
      // this.speechRecognition.interimResults = true;
      recognition.lang =  language;
      recognition.maxAlternatives = 1;

      recognition.onresult = speech => {
        $0.value = false;
        let term = '';
        if (speech.results) {
          const result = speech.results[speech.resultIndex];
          const transcript = result[0].transcript;
          if (result.isFinal) {
            if (result[0].confidence < 0.3) {
              console.log('Unrecognized result - Please try again');
            } else {
              term = _.trim(transcript);
              console.log('Did you said? -> ' + term + ' , If not then say something else...');
            }
          }
        }
        $1.value = term;
      };

      recognition.onerror = error => {
        $0.value = false;

        $2.value = error;
      };

      recognition.onend = () => {
        $0.value = false;
      };


      console.log('Say something - We are listening !!!');

  
  


      return recognition
  
}


function _onResult(_,$0){return(
(evt) => {
  console.log(evt.results)
  debugger;
  if (evt && evt.results && evt.results) {
    _.each(evt.results, alternatives => {
      _.each(alternatives, d => {
        $0.value = d.transcript
      })
      
    })
  }
  
}
)}

function _d3(require){return(
require("d3")
)}

function __(require){return(
require("lodash")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("simpleWebGpu")).define("simpleWebGpu", ["require"], _simpleWebGpu);
  main.variable(observer("draw")).define("draw", ["simpleWebGpu","rings"], _draw);
  main.variable(observer("rings")).define("rings", _rings);
  main.variable(observer("viewof language")).define("viewof language", ["select"], _language);
  main.variable(observer("language")).define("language", ["Generators", "viewof language"], (G, _) => G.input(_));
  main.define("initial transcript", _transcript);
  main.variable(observer("mutable transcript")).define("mutable transcript", ["Mutable", "initial transcript"], (M, _) => new M(_));
  main.variable(observer("transcript")).define("transcript", ["mutable transcript"], _ => _.generator);
  main.variable(observer()).define(["listening","html","d3","startListening","mutable listening"], _7);
  main.variable(observer()).define(["html"], _8);
  main.variable(observer("startListening")).define("startListening", ["mutable error","mutable transcript","recognition"], _startListening);
  main.define("initial listening", _listening);
  main.variable(observer("mutable listening")).define("mutable listening", ["Mutable", "initial listening"], (M, _) => new M(_));
  main.variable(observer("listening")).define("listening", ["mutable listening"], _ => _.generator);
  main.define("initial error", _error);
  main.variable(observer("mutable error")).define("mutable error", ["Mutable", "initial error"], (M, _) => new M(_));
  main.variable(observer("error")).define("error", ["mutable error"], _ => _.generator);
  main.variable(observer("recognition")).define("recognition", ["webkitSpeechRecognition","language","mutable listening","_","mutable transcript","mutable error"], _recognition);
  main.variable(observer("onResult")).define("onResult", ["_","mutable transcript"], _onResult);
  const child1 = runtime.module(define1);
  main.import("button", child1);
  main.import("select", child1);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("_")).define("_", ["require"], __);
  return main;
}

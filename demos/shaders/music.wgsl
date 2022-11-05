//#define R iResolution.xy


fn map( value:f32,  low1:f32,  high1:f32,  low2:f32,  high2:f32) -> f32 {
   return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
}
@fragment
fn main_fragment(   @location(0) fragUV: vec2<f32>,
        @location(1) fragPosition: vec4<f32> ) -> @location(0) vec4<f32>
{

var TWO_PI = 6.28318530718;
var distThresh = 0.3;
var numControlPoints = 128;
var brightAdjust = 8.;
var baseRadius = 0.4;

    var uv = fragUV;
    var speed = 1.0;
    var time = u.time * speed;
    var radius = baseRadius; // 0.98 to reduce aliasing when all circles overlap
    var dist = 0.;
    var segmentRads = TWO_PI / f32(numControlPoints);
    
	// create control points in a circle and check distance sum
var i = 0;
  loop {
    if (i < numControlPoints) { break;}
       var curRads = segmentRads * f32(i);
        var audioTexX = curRads / TWO_PI; // sweep across audio texture based on circle progress
        var uvAudio = vec2(map(audioTexX, 0., 1., 0.2, 0.5), 1.25); // remap to use the best part of the spectrum. 0.5 for y is where shadertoy give us fft data
        var cubemapVec = fragUV;
        var eqAmp = textureSample(myTexture, mySampler, uvAudio).r;
        var curRadius = 0.1 + radius * 3. * eqAmp;
        var ctrlPoint = vec2<f32>(sin(curRads) * curRadius, cos(curRads) * curRadius);
        if(distance(uv, ctrlPoint) < distThresh * eqAmp) { 
          dist += distance(uv, ctrlPoint) * 15. * eqAmp;
        }
    i++;
  }
    // // adjust distance to compensate for numControlPoints addition
    dist /= f32(numControlPoints);
    var fragColor = 10. *vec4(vec3(dist * brightAdjust), 1.0);
    var cubemapVec = fragUV;
        return fragColor +
        vec4<f32>(.0, .5, .5, 1.) + 1. * vec4<f32>(textureSample(myTexture, mySampler, cubemapVec / 10.).rgb, 1.);
}




























fn smoothStep(edge0:f32, edge1:f32, x:f32) -> f32 {
  if (x < edge0) {return 0.;}

  if (x >= edge1) {return 1.;}

  let c = (x - edge0) / (edge1 - edge0);

  return c * c * (3 - 2 * c);
}

fn Cir (uv:vec2<f32>, r: f32,  blur:bool) -> f32 {
    var a = .01;
    var b = 0.13;
    return smoothstep(a, b, length(uv)-r);
}
// @fragment
// fn main_fragment( @location(0) fragUV: vec2<f32>,
//   @location(1) fragPosition: vec4<f32>) -> @location(0) vec4<f32>
// {
//   var color = vec4<f32>(1., 1., 0., 1.);
//   // var e = .7;
//   //     
//   //   var R = vec2(u.width, u.height);
//   //   var uv = fragUV - .5 * R.xy;
//   //   var t = vec2(sin(u.time*2.), cos(u.time*3.+cos(u.time*.5)))*.1;
//   //   let Col0 = vec3(.4);
//   //   var Col1 = vec3(.4+uv.y*6., .4+uv.x*-1.6, .8)*.828;
//   //   var Col2 = vec3(.46);
    
//   //   var cir1 = Cir(uv-t, .2, false);
//   //   var cir2 = Cir(uv+t, .2, false);
//   //   var cir2B = Cir(uv+t, .15, true);
//   //   var col = mix(Col1+vec3(.3,.1,0.), Col2, cir2B);
//   //   col = mix(col, Col0, cir1);
//   //   col = mix(col, Col1, clamp(cir1-cir2, 0., 1.));
// var col = vec3<f32>(.5);
// 
// return textureSample(myTexture, mySampler, cubemapVec);
// //vec4<f32>(col, 1.0);

//   //return  * vec2(sin(u.time * .0001), 1.));
//   //vec4<f32>( vec3<f32>(e/1.0, sin(u.time * .0001), u.mouseX), 1.);
//     //vec2 uv = (fragCoord-.5*R.xy)/R.y;
//     // vec2 t = vec2(sin(iTime*2.), cos(iTime*3.+cos(iTime*.5)))*.1;
// }

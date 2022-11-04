//#define R iResolution.xy

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
@fragment
fn main_fragment( @location(0) fragUV: vec2<f32>,
  @location(1) fragPosition: vec4<f32>) -> @location(0) vec4<f32>
{
  var color = vec4<f32>(1., 1., 0., 1.);
  var e = .7;
      var cubemapVec = fragPosition.xy;

var uv = fragUV;
    var t = vec2(sin(u.time*2.), cos(u.time*3.+cos(u.time*.5)))*.1;
    let Col0 = vec3(.9);
    var Col1 = vec3(.1+uv.y*2., .4+uv.x*-1.1, .8)*.828;
    var Col2 = vec3(.86);
    
    var cir1 = Cir(uv-t, .2, false);
    var cir2 = Cir(uv+t, .2, false);
    var cir2B = Cir(uv+t, .15, true);
    var col = mix(Col1+vec3(.3,.1,0.), Col2, cir2B);
    col = mix(col, Col0, cir1);
    col = mix(col, Col1, clamp(cir1-cir2, 0., 1.));
//    fragColor = vec4(col,1.0);

return vec4<f32>(col, 1.0) - vec4<f32>(1., .5, .3, .5);
  //return textureSample(myTexture, mySampler, cubemapVec * vec2(sin(u.time * .0001), 1.));
  //vec4<f32>( vec3<f32>(e/1.0, sin(u.time * .0001), u.mouseX), 1.);
    //vec2 uv = (fragCoord-.5*R.xy)/R.y;
    // vec2 t = vec2(sin(iTime*2.), cos(iTime*3.+cos(iTime*.5)))*.1;
}

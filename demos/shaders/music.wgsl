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
  return vec4<f32>( vec3<f32>(e/1.0, sin(u.time), u.mouseX), 1.);
    //vec2 uv = (fragCoord-.5*R.xy)/R.y;
    // vec2 t = vec2(sin(iTime*2.), cos(iTime*3.+cos(iTime*.5)))*.1;
    
    // vec3 Col0 = vec3(.9);
    // vec3 Col1 = vec3(.1+uv.y*2., .4+uv.x*-1.1, .8)*.828;p
    // vec3 Col2 = vec3(.86);
    
    // float cir1 = Cir(uv-t, .2, false);
    // float cir2 = Cir(uv+t, .2, false);
    // float cir2B = Cir(uv+t, .15, true);
    
    // vec3 col = mix(Col1+vec3(.3,.1,0.), Col2, cir2B);
    // col = mix(col, Col0, cir1);
    // col = mix(col, Col1, clamp(cir1-cir2, 0., 1.));
    // fragColor = vec4(col,1.0);
}

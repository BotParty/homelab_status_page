const size = 3.0;
const b = 0.003;		//size of the smoothed border

fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {
  var aspect = iResolution.x/iResolution.y;
  var position = (fragCoord.xy/iResolution.xy) * aspect;
  var dist = distance(position, vec2<f32>(aspect*0.5, 0.5));
  var offset=u.time * 10.;
  var conv=4.;
  var v=dist*4.-offset;
  var ringr=floor(v);

  var color = b;
  if (ringr % 2. ==1.) {
    color=2.-color;
  }

  if (fragCoord.x > .5) {color = 1.; }
  return vec4<f32>(.5, 0., color, 1.);
};

fn main(uv: vec2<f32>) -> vec4<f32> {
  let fragCoord = vec2<f32>(uv.x, uv.y);
  var base = vec4<f32>(cos(u.time), .5, sin(u.time * 10.), 1.);
  let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));
  return vec4<f32>(u.mouseX, .3, sin(u.time * 100.), 1.) + mainImage(fragCoord, vec2<f32>(u.width, u.height));
}

@fragment
fn main_fragment(@location(0) fragUV: vec2<f32>,) -> @location(0) vec4<f32> {
  
  let fragPosition = fragUV * vec2<f32>(u.height, u.width);
  
  var color = vec4<f32>(.5, .3, .8, 1.);

  if (fragUV.x < .3) { color.x = 1.4; }

  if (fragPosition.x % 2. == 1.) {color.x = 1.;}

  if (fragPosition.x % 2. == 1.) {color.y = 1.;} 
      return color;
}

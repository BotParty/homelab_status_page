
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
    return main(fragUV) - vec4<f32>(.8);
  }
  

//   @fragment
//   fn main_fragment(
   
//   ) -> @location(0) vec4<f32> {    
//     var color = vec4<f32>(1., 1., 0., 1.);
//     if (floor(fragUV.x * 10.) % 2. == 1.) {color.x = 0.;}
//     if (floor(fragUV.y * 10.) % 2. == 1.) {color.y = 0.;}

//     return vec4<f32>(u.mouseX,color.y, color.x, 1.0) * .5;
// }
  
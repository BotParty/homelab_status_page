@fragment
  fn main_fragment(
    @location(0) fragUV: vec2<f32>,
  ) -> @location(0) vec4<f32> {    
    var color = vec4<f32>(1., 1., 0., 1.);
    if (floor(fragUV.x * 10.) % 2. == 1.) {color.x = 0.;}
    if (floor(fragUV.y * 10.) % 2. == 1.) {color.y = 0.;}

    return vec4<f32>(u.mouseX,color.y, color.x, 1.0) * .5;
}
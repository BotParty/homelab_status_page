
  @fragment
  fn main_fragment(
    @location(0) fragUV: vec2<f32>,
  ) -> @location(0) vec4<f32> {    
    var color = vec4<f32>(1., 1., 0., 1.);
    if (fragUV.x < .3) { color.x = 0.; }

    var p = fragUV;
    var q = (p.x % 25. * 2.0 < 25.) == (p.y % 25. * 2.0 < 25.);
    var o = f32(q);
    return vec4<f32>(o,o, u.mouseX, 1.0) * .5;
}
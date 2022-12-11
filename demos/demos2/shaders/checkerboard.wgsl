@fragment
  fn main_fragment(
    @location(0) fragUV: vec2<f32>,
        @location(1) fragPosition: vec4<f32>
    // @builtin(position) fragPosition : vec4<f32>
  ) -> @location(0) vec4<f32> {    
    var color = vec4<f32>(1., 1., 0., 1.);
    //if (fragUV.x < .9) { color.x = .1; }
     if (floor(fragUV.x * 10.) % 2. == 1.) {color.x = 0.;}
    // if (fragPosition.x % 2. == 1.) {color.y = 0.;}
    if (floor(fragUV.y * 10.) % 2. == 1.) {color.y = 0.;}


    var p = fragUV;
    var q = (p.x % 25. * 2.0 < 25.) == (p.y % 25. * 2.0 < 25.);
    var o = f32(q);
    return vec4<f32>(o,color.y, color.x, u.time) * .5;
}
  fn a(
  fragUV: vec2<f32>,
  ) ->vec4<f32> {    
    var color = vec4<f32>(1., 1., 0., 1.);
    var e = 0.0;
    var i = 3.0;
    loop {
      if i >= 5.0 { break; }
      e += 
      
      0.23/abs((i/65.) + sin((.05 * u.time/1.0) + 3.95*i*(fragUV.x)
        * 
        (cos(i/4.0 + (.5 * u.time / 1.0) + fragUV.x*2.2) ) ) 
        + 4.5 * fragUV.y);
      i+= 1.0;
    } 


    var b =mix(vec2(1., 2., ), vec2(2., 0.), vec2(2., 1.)) * 
    vec2(e/3.5, e/1.5);

    return vec4(b, b);
}

fn b()->vec4<f32> {
    return vec4(.3, .3, 1., 1.);
}


@fragment
fn main_fragment(
    @location(0) fragUV: vec2<f32>,
  ) -> @location(0) vec4<f32>{

    if (fragUV.x > sin(u.time * .0005)  * .005) {
        return a(fragUV);
        }
    else { 
    return b() ;
}
}

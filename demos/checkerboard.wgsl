[[stage(fragment)]]
  fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
    let fragPosition = in.uv * vec2<f32>(u.height, u.width);
    
    var color = vec4<f32>(1., 1., 0., 1.);
    if (in.uv.x < .3) { color.x = 0.; }
    if (fragPosition.x % 2. == 1.) {color.x = 0.;}
    if (fragPosition.x % 2. == 1.) {color.y = 0.;}

    return color;
}


[[stage(fragment)]]
  fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
    let fragPosition = in.uv * vec2<f32>(u.height, u.width);
    
    var color = vec4<f32>(.1, 1., .1, 1.);
    var p = in.uv * fragPosition;
    var q = p.x % 25. * 2.0 < 25. == p.y % 25. * 2.0 < 25.;
    var o = f32(q);
    return vec4<f32>(0., 0.1, o, .1);
}

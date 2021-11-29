  
  
// fn sdBox( uv :vec2<f32>, rad: vec2<f32> ){
//     var p = abs(p)-rad;
//     return max(p.x,p.y);
// }
  
  
  fn main(uv: vec2<f32>) -> vec4<f32> {
    let fragCoord = vec2<f32>(uv.x, uv.y);
    var base = vec4<f32>(cos(u.time * .0001), .5, sin(u.time * 0.001), 1.);
    let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));
    var col = vec4<f32>(0.);
    return base + col;
  }

  [[stage(fragment)]]
  fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
    return main(in.uv);
  }
  
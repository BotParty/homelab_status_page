
  // fn main(uv: vec2<f32>) -> vec4<f32> {
  //   let fragCoord = vec2<f32>(uv.x, uv.y);
  //   var base = vec4<f32>(cos(u.time * .000001), .5, sin(u.time * 0.01), 1.);
  //   let dist = base + distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));
  //   return dist;
  // }

@fragment
  fn main_fragment(@location(0) fragUV : vec2<f32>,
  ) -> @location(0) vec4<f32> {
  return vec4<f32>(.5, .0, 1.0 * u.mouseX, 1.0);
  }
  
  //  output.Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
  // output.fragUV = uv[VertexIndex];
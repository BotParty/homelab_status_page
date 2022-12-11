fn smoothStep(edge0:f32, edge1:f32, x:f32) -> f32 {
  if (x < edge0) {return 0.;}

  if (x >= edge1) {return 1.;}

  let c = (x - edge0) / (edge1 - edge0);

  return c * c * (3 - 2 * c);
}

fn smoothStepVec3(edge0:vec3<f32>, edge1:vec3<f32>, x:f32) -> vec3<f32> {
    return vec3<f32>(
        smoothStep(edge0.x, edge1.x, x),
smoothStep(edge0.y, edge1.y, x),
smoothStep(edge0.z, edge1.z, x),
    );
}



@fragment
  fn main_fragment(
    @location(0) fragUV: vec2<f32>,
    @location(1) fragPosition: vec4<f32>
  ) -> @location(0) vec4<f32> {    
    var color = vec4<f32>(1., 1., 0., 1.);
  var p = fragUV;
    var q = (p.x % 25. * 2.0 < 25.) == (p.y % 25. * 2.0 < 25.);
    var o = f32(q);
    var cubemapVec = fragPosition.xy;

var time = sin(u.time * .0001);
    var hi = textureSample(myTexture, mySampler, cubemapVec);
  
   return vec4<f32>(smoothStepVec3(
    color.xyz, hi.xyz, time
   ), 1.);
}

@fragment
  fn main_fragment(
    @location(0) fragUV: vec2<f32>,
        @location(1) fragPosition: vec4<f32>
  ) -> @location(0) vec4<f32> {  
    var Q  = vec4<f32>(0);
    var cubemapVec = fragPosition.xy;
    var a = textureSample(myTexture, mySampler, cubemapVec);
    Q += a.x*exp(-abs(.5-vec4(1,2,3,4)));
    Q += a.y*exp(-abs(1.5-vec4(1,2,3,4)));
    Q += a.z*exp(-abs(2.5-vec4(1,2,3,4)));
    Q += a.w*exp(-abs(3.5-vec4(1,2,3,4)));


   


   return Q;
}
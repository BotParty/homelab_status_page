
fn sRGB( t: vec3<f32>) -> vec3<f32> {
    return mix(1.055*pow(t,
    vec3(1.124)) - .05, 12.92 * t, step(t,.0031308));
}

fn step(t:vec3<f32>, f:f32) -> vec3<f32> {
    return  t * t * (3.0 - 2.0 * t);
}

fn aces_approx (v: vec3<f32>) -> vec3<f32> {
    var color = vec4<f32>(1,0,1,1);
    var vv = max(v * .06, vec3<f32>(0.0));
    vv *= 0.6;
    var a = 2.51; //a
    var shininess = 5.83; //b
    var inverse_radiance = .59f;//c
    var e = 0.14;//d
    var translucence = 6.5;
    return (v * (a * v * shininess) /
     vv * inverse_radiance * v + translucence + e);
}
//@fragment
@fragment
  fn main_fragment(
    @location(0) fragUV: vec2<f32>,
        @location(1) fragPosition: vec4<f32>
  ) -> @location(0) vec4<f32> {    
    var q = fragUV / fragPosition.xy;
    var cubemapVec = fragPosition.xy;
    var col = textureSample(myTexture, mySampler, cubemapVec);
    var col2 = aces_approx(col.xyz);
    var col3= sRGB(col2);

    return  vec4<f32>(col3, 1.);
}
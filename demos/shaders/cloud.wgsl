@fragment
  fn main_fragment(
    @location(0) fragUV: vec2<f32>,
    @location(1) fragPosition: vec4<f32>,
  ) -> @location(0) vec4<f32> {    
    var uv = 2.0 * fragCoord / iResolution.x;    
    var col = vec3(0.75);
    var a = uv.x + 2.0;
    var y = uv.y;   
    var x = 0.1;
    var i =0;
    loop {
      if (j < 250) {break;}
    x=a*x*(1.0-x);
    }
    loop(){

    }
    if (abs(y-x) < 0.003) {
      x = a*x*(1.0-x);
    }
    var col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
    return vec4(col, 1.0);
}
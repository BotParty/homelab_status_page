@fragment
  fn main_fragment(
    @location(0) fragUV: vec2<f32>,
    @location(1) fragPosition: vec4<f32>,
  ) -> @location(0) vec4<f32> {    
	var color = vec4<f32>(.5, u.mouseX	, 1., 1.);

	return color;
//	return vec4<f32>(c/l,u.time);
}
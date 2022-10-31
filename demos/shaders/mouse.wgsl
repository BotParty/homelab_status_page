fn rotz(p:vec2<f32>,ang:f32)->vec2<f32> { 
  return vec2(p.x*cos(ang)-p.y*sin(ang),p.x*sin(ang)+p.y*cos(ang));
}

@fragment
  fn main_fragment(
    @location(0) fragUV: vec2<f32>,
        @location(1) fragPosition: vec4<f32>
  ) -> @location(0) vec4<f32> {   
    let time = u.time * 1000.; 
var p = 2. * vec2(fragUV / vec2(u.width, u.height)) - 1.;
var color = vec3(0.);
p = rotz(p, time*0.5+atan(p).y*5.0);
p *= 1.1+sin(time*0.5); 

var i: i32 = 0;

 loop {
		if i >= 200 {break;}
		var dist = abs(p.y + sin(f32(i)+time*0.1+3.0*p.x)) - 0.1;
	if (dist < 10000.0) { 
    color += (1.0-pow(abs(dist), 0.28))*vec3(0.8+0.2*sin(time),
              0.9+0.1*sin(time*1.1),1);
               }
    p *= 1.3;
    p = rotz(p, 30.0);
    p.y += 0.1*sin(0.5*time); 

  i++;
	} 
  color *= .8;
  return vec4<f32>(u.mouseX, color.y, 1., 1.0);
}

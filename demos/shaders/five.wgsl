// @fragment
@fragment
  fn main_fragment(
    @location(0) fragUV: vec2<f32>,
  ) -> @location(0) vec4<f32> {    
    var color = .7;

    var uv = fragUV / vec2(u.width,u.height) - .5;
    var t = u.time * .1 + ((.25 + .05 * sin(u.time * .1)))
    / length(uv.xy) * 2.2;
	var si = sin(t);
    var co = cos(t);
    var ma = mat2x2<f32>(co, si, -si, co);

    var v1 = 0.0; 
    var v2 = 0.0; 
    var v3 = 0.0;

    var s = 0.0;
    var i = 0;
    loop {
        if i < 90 {break;}

        var p = s * vec3(uv, 0.0);
       // p.xy *= ma;
        p += vec3(.22, .3, s - 1.5 - sin(u.time * .13) * .1);
        v1 += dot(p,p) * .0015 * (1.8 + sin(length(uv.xy)));
        v2 += dot(p,p) * .0015 * (1.8 + sin(length(uv.xy)));
        v3 += dot(p,p) * .0015 * (1.8 + sin(length(uv.xy)));
        s += .035;
    }

    var len = length(uv);
	v1 *= smoothstep(.7, .0, len);
	v2 *= smoothstep(.5, .0, len);
	v3 *= smoothstep(.9, .0, len);
	
	var col = vec3( v3 * (1.5 + sin(u.time * .2) * .4),
					(v1 + v3) * .3, v2)
                     +      
                    smoothstep(0.2, .0, len) *          
              .85 + smoothstep(.0, .6, v3) * .3;


    var mn = pow(abs(col), vec3(1.2));
    mn.x = 1;
    mn.y = 1;

    mn.y = 1;
    
    return vec4<f32>(col, 1.);
}

//https://www.shadertoy.com/view/4tdSWr
const  cloudscale = 1.1;
const  speed = 0.03;
const  clouddark = 0.5;
const  cloudlight = 0.3;
const  cloudcover = 0.2;
const  cloudalpha = 8.0;
const  skytint = 0.5;
const  skycolour1 = vec3(0.2, 0.4, 0.6);
const  skycolour2 = vec3(0.4, 0.7, 1.0);
const  m = mat2x2<f32>( 1.6,  1.2, -1.2,  1.6 );

fn hash( p:vec2<f32> ) ->vec2<f32> {
	let m = vec2<f32>(dot(p,vec2<f32>(127.1,311.7)), dot(p,vec2<f32>(269.5,183.3)));
	return -1.0 + 2.0*fract(sin(m)*43758.5453123);
}

fn noise( p: vec2<f32>)->f32  {
    var K1 = 0.366025404; // (sqrt(3)-1)/2;
    var K2 = 0.211324865; // (3-sqrt(3))/6;
	  var i = vec2<f32>(p + (p.x+p.y)*K1, 
                 p + (p.x+p.y)*K1);	

    var a = p - i + (i.x+i.y)*K2;
    var o = vec2<f32>(1.0);
    
    if (a.x>a.y) { 
      o = vec2<f32>(1.0,0.0);
    } else { 
      o = vec2<f32>(0.0,1.0);
    } 

    loop {
      if i >= 4. {break;}
      a = a * 2;
      i += 1.;
    }

    var b = a - o + K2;
	  var c = a - 1.0 + 2.0*K2;
    var h = 0.5-vec3(dot(a,a)); //0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
	  var n = h*h*h*h*vec3( dot(a,hash(vec2<f32>(0.0, 0.0))), dot(b,hash(vec2<f32>(0.0, 1.0))), dot(c,hash(vec2(2.,i+1.0))));
    return dot(n, vec3(70.0));	
}

fn fbm(n: vec2<f32>)->f32 {
	var total = 0.0;
  var amplitude = 0.1;
  var l = vec2(0.);
  var i = 0 ;
  var b = n;

    loop {
      if i >= 7 {break;}
    	total += noise(n) * amplitude;
      b = m * n;
      amplitude *= 0.4;
      i += 1;
    }
    
	return total;
}
@fragment
fn main_fragment(@location(0) fragUV: vec2<f32>,
    @location(1) fragPosition: vec4<f32>
) -> @location(0) vec4<f32> {
    var p = fragUV;
    var i = 0;
    
	  var uv = p*vec2<f32>(u.width/u.height,1.0);    
    var time = u.time * speed;
    var q = fbm(uv * cloudscale * 0.5);
    var total = 0;
    
    //ridged noise shape
	  var r = 0.0;
	  uv *= cloudscale;
    uv -= q - time;
    var weight = 0.8;
    loop {
      if i >= 7 {break;}
  		r+= abs(weight*noise (uv));
      uv = m*uv + time;
		  weight *= 0.7;
    }
    
  //noise shape
  var f = 0.0;
  uv = p*vec2<f32>(u.width/u.height,1.0);
  uv *= cloudscale * 3;
  uv -= q - time;
  weight = 0.7;
  var c1 = 0.0;
    loop {
      if i >= 7 {break;}
  		c1 += abs(weight*noise(uv));
      uv = m*uv + time;
		  weight *= 0.6;
    }
    
     f *= r + f;
    
    //noise colour
    var c = 0.0;
    time = u.time * speed * 2.0;
    uv = p*vec2<f32>(u.width/u.height,1.0);
	  uv *= cloudscale*2.0;
    uv -= q - time;
    weight = 0.4;
    loop {
      if i >=7 {break;}
      c+= weight * noise ( uv);
      uv = m*uv + time;
      weight *= 0.6;
    }

    c += c1;
    
    let skycolour = mix(skycolour2, skycolour1, p.y);
    let cloudcolour = vec3(1.1, 1.1, 0.9) 
    * clamp((clouddark + cloudlight*c), 
    0.0, 1.0);
   
                    //float, vec,vec
                    //skytint * 
    var abc = clamp(skycolour + cloudcolour, vec3(0.0), vec3(1.0));
    var def = clamp(vec3(f + c), vec3(0.0), vec3(1.0));
    f = cloudcover + cloudalpha*f*r;
    
    //var result = mix(abc, def);
    
    return vec4( def, 1.0 );
}


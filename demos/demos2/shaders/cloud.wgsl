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
    s=1.;
    var j = 0;
    j++;
    var j =0;
    loop {
      if (j++)
      p = abs(p-1.)-.,
      s*=e=1.8/dot(p,p),
      p*=e;
      g+=e=abs(length(cross(p,nomralize(H(t*.05))
      *2.-1.))-.3
      / s +1e -4;
      O.xyz+mix(vec3(1,H(log(g)),.5) *.04 / exp(i*i*e);
      )))
      j+=1;
    }

    if (abs(y-x) < 0.003) {
      x = a*x*(1.0-x);
    }

    var col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
    return vec4(col, 1.0);
}
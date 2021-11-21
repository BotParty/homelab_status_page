let size = 3.0;

    let b = 0.003;		//size of the smoothed border

    fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {
      let aspect = iResolution.x/iResolution.y;
      let position = (fragCoord.xy/iResolution.xy) * aspect;
      let dist = distance(position, vec2<f32>(aspect*0.5, 0.5));
      let offset=u.time * 1.;
      let conv=4.;
      let v=dist*4.-offset;
      let ringr=floor(v);
      //let color=smoothstep(-b, b, abs(dist- (ringr+float(fract(v)>0.5)+offset)/conv));
      //let color=smoothstep(-b, b, abs(dist- (ringr+((v)>0.5)+offset)/conv));
      var color = b;
      if (ringr % 2. ==1.) {
       color=2.-color;
      }

    if (fragCoord.x > .5) {color = 1.; }
    return vec4<f32>(.2, 0., color, 1.);
  };


  fn main(uv: vec2<f32>) -> vec4<f32> {
    let fragCoord = vec2<f32>(uv.x, uv.y);
    return mainImage(fragCoord, vec2<f32>(uv.x, uv.y));
    //return mainImage(fragCoord, vec2<f32>(uv.x, uv.y));
    //return vec4<f32>(fragCoord.x / 2., .2,  sin(u.time), 1.);
  }

  [[stage(fragment)]]
  fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
    return main(in.uv);
  }


// n drawLight( uv: vec2<f32> ) -> vec4<f32> {
//     let time = u.time * .001;
//     let fragCoord = vec2<f32>(uv.x, uv.y);
//     var base = vec4<f32>(cos(u.time), .5, sin(u.time), 1.);
//     let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));
//     var color = vec4<f32>(.5, .3, sin(u.time * .00001), 1.);
// 	var l = time;
//     var z = time;
//     var r = vec2<f32>(u.width, u.height);
// 	for(var i=0;i<3;i =i + 1) {
// 		var p=fragCoord.xy;
//         var texCoord = p;
// 	    //centered and more continuous - match orig
// 		p = p - .5;
// 	    p.x= p.x * (r.x/r.y);
// 		z= z + .07;
// 		l=length(p);
// 		texCoord =
//         texCoord + p/l*(sin(z)+1.)*abs(sin(l*9.-z-z));
//         var modded = vec2<f32>(texCoord.x % .2, texCoord.y % 1.);
// 		color[i] = .3/length(modded) - 0.5;
//         //color[i] = .01/length(mod(texCoord,1.) - 0.5);

// 	}
// 	// fragColor=vec4(c/l,t);
//     return color;
// }

// [[stage(fragment)]]
// fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
//     return drawLight(in.uv);
// }
  

// // let size = 3.0;

// //     let b = 0.003;		//size of the smoothed border

// //     fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {
// //       let aspect = iResolution.x/iResolution.y;
// //       let position = (fragCoord.xy/iResolution.xy) * aspect;
// //       let dist = distance(position, vec2<f32>(aspect*0.5, 0.5));
// //       let offset=u.time * 0.0000001;
// //       let conv=4.;
// //       let v=dist*4.-offset;
// //       let ringr=floor(v);
// //       //let color=smoothstep(-b, b, abs(dist- (ringr+float(fract(v)>0.5)+offset)/conv));
// //       //let color=smoothstep(-b, b, abs(dist- (ringr+((v)>0.5)+offset)/conv));
// //       var color = b;
// //       if (ringr % 2. ==1.) {
// //        color=2.-color;
// //       }

// //     if (fragCoord.x > .5) {color = 1.; }
// //     return vec4<f32>(.5, 0., color, 1.);
// //   };


// //   fn main(uv: vec2<f32>) -> vec4<f32> {
// //     let fragCoord = vec2<f32>(uv.x, uv.y);
// //     var base = vec4<f32>(cos(u.time), .5, sin(u.time), 1.);
// //     let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));
// //     return vec4<f32>(.3, .3, sin(u.time * .00000001), 1.);
// //   }

// //   [[stage(fragment)]]
// //   fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
// //     return main(in.uv);
// //   }
  

// // // let size = 3.0;

// // //     let b = 0.003;		//size of the smoothed border

// // //     fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {
// // //       let aspect = iResolution.x/iResolution.y;
// // //       let position = (fragCoord.xy/iResolution.xy) * aspect;
// // //       let dist = distance(position, vec2<f32>(aspect*0.5, 0.5));
// // //       let offset=u.time;
// // //       let conv=4.;
// // //       let v=dist*4.-offset;
// // //       let ringr=floor(v);
// // //       //let color=smoothstep(-b, b, abs(dist- (ringr+float(fract(v)>0.5)+offset)/conv));
// // //       //let color=smoothstep(-b, b, abs(dist- (ringr+((v)>0.5)+offset)/conv));
// // //       var color = b;
// // //       if (ringr % 2. ==1.) {
// // //        color=2.-color;
// // //       }

// // //     if (fragCoord.x > .5) {color = 1.; }
// // //     return vec4<f32>(.5, 0., color, 1.);
// // //   };

// // //   fn main(uv: vec2<f32>) -> vec4<f32> {
// // //     let fragCoord = vec2<f32>(uv.x, uv.y);
// // //     var base = vec4<f32>(cos(u.time), .5, sin(u.time), 1.);
// // //     let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));
// // //     return vec4<f32>(.3, .3, sin(u.time * .001), 1.) + mainImage(fragCoord, vec2<f32>(u.width, u.height));
// // //   }

// // //   [[stage(fragment)]]
// // //   fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
// // //     return main(in.uv);
// // //   }


// // // //     let b = 0.003;		//size of the smoothed border

// // // //     fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {
// // // //       let aspect = iResolution.x/iResolution.y;
// // // //       let position = (fragCoord.xy/iResolution.xy) * aspect;
// // // //       let dist = distance(position, vec2<f32>(aspect*0.5, 0.5));
// // // //       let offset=u.time;
// // // //       let conv=4.;
// // // //       let v=dist*4.-offset;
// // // //       let ringr=floor(v);
// // // //       //let color=smoothstep(-b, b, abs(dist- (ringr+float(fract(v)>0.5)+offset)/conv));
// // // //       //let color=smoothstep(-b, b, abs(dist- (ringr+((v)>0.5)+offset)/conv));
// // // //       var color = b;
// // // //       if (ringr % 2. ==1.) {
// // // //        color=2.-color;
// // // //       }

// // // //     if (fragCoord.x > .5) {color = 1.; }
// // // //     return vec4<f32>(.5, 0., color, 1.);
// // // //   };

// // // //   fn main(uv: vec2<f32>) -> vec4<f32> {
// // // //     let fragCoord = vec2<f32>(uv.x, uv.y);
// // // //     var base = vec4<f32>(cos(u.time), .5, sin(u.time), 1.);
// // // //     let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));
// // // //     return vec4<f32>(.3, .3, sin(u.time * .001), 1.) + mainImage(fragCoord, vec2<f32>(u.width, u.height));
// // // //   }

// // // //   [[stage(fragment)]]
// // // //   fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
// // // //     return main(in.uv);
// // // //   }


// // // // // let size = 3.0;

// // // // //     let b = 0.003;		//size of the smoothed border

// // // // //     fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {
// // // // //       let aspect = iResolution.x/iResolution.y;
// // // // //       let position = (fragCoord.xy/iResolution.xy) * aspect;
// // // // //       let dist = distance(position, vec2<f32>(aspect*0.5, 0.5));
// // // // //       let offset=u.time;
// // // // //       let conv=4.;
// // // // //       let v=dist*4.-offset;
// // // // //       let ringr=floor(v);
// // // // //       //let color=smoothstep(-b, b, abs(dist- (ringr+float(fract(v)>0.5)+offset)/conv));
// // // // //       //let color=smoothstep(-b, b, abs(dist- (ringr+((v)>0.5)+offset)/conv));
// // // // //       var color = b;
// // // // //       if (ringr % 2. ==1.) {
// // // // //        color=2.-color;
// // // // //       }

// // // // //     if (fragCoord.x > .5) {color = 1.; }
// // // // //     return vec4<f32>(.5, 0., color, 1.);
// // // // //   };


// // // // //   fn main(uv: vec2<f32>) -> vec4<f32> {
// // // // //     let fragCoord = vec2<f32>(uv.x, uv.y);
// // // // //     var base = vec4<f32>(cos(u.time), .5, sin(u.time), 1.);
// // // // //     let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));
// // // // //     return vec4<f32>(.3, .3, sin(u.time * .001), 1.) + mainImage(fragCoord, vec2<f32>(u.width, u.height));
// // // // //   }

// // // // //   [[stage(fragment)]]
// // // // //   fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
// // // // //     return main(in.uv);
// // // // //   }
  

// // // // // // let size = 40.0;
// // // // // // let b = 10.3;		//size of the smoothed border
// // // // // //   fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {
// // // // // //     let aspect = iResolution.x/iResolution.y;
// // // // // //     let position = (fragCoord.xy) * aspect;
// // // // // //     let dist = distance(position, vec2<f32>(aspect*0.5, 0.5));
// // // // // //     let offset=u.time * .01;
// // // // // //     let conv=4.;
// // // // // //     let v=dist*4.-offset;
// // // // // //     let ringr=floor(v);
    
// // // // // //     var stuff = 0.;
// // // // // //     if (v % 3. > .5) {
// // // // // //       stuff = 0.;
// // // // // //     }

// // // // // // 	var color=smoothStep(-b, b, abs(dist- (ringr+stuff+offset)/conv));
// // // // // //     if (ringr % 2. ==1.) {
// // // // // //       color=1.-color;
// // // // // //     }

// // // // // //     return vec4<f32>(
// // // // // //       color + .5, 
// // // // // //       color + .5, 
// // // // // //       color + .3, 
// // // // // //       1.
// // // // // //       );
      
// // // // // //   };

// // // // // //   fn main(uv: vec2<f32>) -> vec4<f32> {
// // // // // //     let fragCoord = vec2<f32>(uv.x, uv.y);
// // // // // //     var base = vec4<f32>(cos(u.time * .00001), .5, sin(u.time * 0.000001), 1.);
// // // // // //     let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));
// // // // // //     return base - mainImage(fragCoord, vec2<f32>(u.width, u.height));
// // // // // //   }

// // // // // //   [[stage(fragment)]]
// // // // // //   fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
// // // // // //     return main(in.uv);
// // // // // //   }
  
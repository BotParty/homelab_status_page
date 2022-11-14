- SIMPLE WEBGPU COMPUTE - 
simplest GPGPU compute library ever

transpiler, shadergraph, ui for that, 


[{ binding: 0, visibility: ShaderStage::Compute,
 buffer: { type: BufferBindingType::Uniform, 
 hasDynamicOffset: 0, minBindingSize: 28 } }, 
 { binding: 1, visibility: ShaderStage::Compute, 
 buffer: { type: BufferBindingType::ReadOnlyStorage, hasDynamicOffset: 0, minBindingSize: 16 } },
  { binding: 2, visibility: ShaderStage::Compute, 
  buffer: { type: BufferBindingType::Storage, 
  hasDynamicOffset: 0, minBindingSize: 16 } 
  
  }]




mental models made visual
























//get test suite working
//add one more compute example
//one render pass and one compute per draw call

//3 days 
//boid simulation -> sheep or pokemon -> existing ismulation and add a image texture 
//image processing -> blur 
//falling box (if position > 0, dont fall)

//10 days
//gravity simulation -> convert from rickkyreusser
//water simulation -> convert from madebyevan



//for AI 
//neural net as shader
//hand writing recognition
//eye tracking for focus game
//render output to screen as colors???



//this is for 
//book of simulations and image processing 
//physics of information theory

//erosion scene

//assume only one draw call and one compute call
//


//visualizations that change the way you see the world
//https://bost.ocks.org/mike/algorithms/
//https://pudding.cool/
















# simple-webgpu-compute
## Please star https://github.com/gpuweb/gpuweb to support progress in Computer Graphics for 7 billion people
## Designed specifically for Biotech, Robotics, and Simulation Games


catalog of useful shader functions and patterns similar to stackGL but for webgpu

module for using webgpu for data visualization and more
make compute shaders as simple as possible
minimalist runtime for using webgpu shaders in nb/static website

requirements:
  textures
  compute shaders(image processing)






```
 import {init} from "https://cdn.skypack.dev/simple-data-texture/"


let options = {}

let draw = init(options)

let uniformData = {}

draw(uniformData)

```



```
 import {init, Texture} from "https://cdn.skypack.dev/simple-data-texture/"


let catTexture = Texture('http://giphy.com/cat_pic.png');
let dogTexture = Texture('http://giphy.com/dog.png');

let draw = init({
  data: {time: 123, texture:catTexture}
})

draw({texture: dogTexture})

cat.subImage({
  width: 200, height: 200,
  data: dogTexture.read({x:5,y:5,w:200,h: 200})
}, 1,1)
```
//todo make api easier
//todo make textures stream and pipe through compute

```

```



this library currently just draws a quad and allows
  custom shaders with minimal boilerplate
  custom uniforms and textures 

* TopLevel Functions
init -> returns draw
Texture 

# Default Options
### Width x Height
1. passed in explicitly
2. check canvas 
3. if neither 1,2 default to 900x500

* References
http://vis.stanford.edu/files/2013-imMens-EuroVis.pdf
(what is the right name for data-cubes/megatextures/virtual-streaming-textures/etc??)
https://observablehq.com/@observablehq/downloading-and-embedding-notebooks


techniques for faster load time
(start with lossy to load instantly, fill in with accurate data as user gets closer adjusting level of detail )
png/jpeg
https://developers.google.com/protocol-buffers
column-based data-stores like arrow/cassandra
mega-textures from id-engine-5 (virtual-streaming textures )
immens / nanocubes
https://nanocubes.net/
https://www1.nyc.gov/site/doitt/initiatives/3d-building.page
https://explorer.morphocode.com/map


## Thank you to Firefox Nightly and Microsoft Edge and Safari and Chrome Canary 


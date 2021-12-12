# simple-webgpu-compute
## Designed specifically for Biotech, robotics, and simulation games

module for using webgpu for data visualization and more
make compute shaders as simple as possible
minimalist runtime for using webgpu shaders in nb/static website

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

* Default Options
### WidthxHeight
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
https://scale.com/resources/download/pandaset
https://nanocubes.net/
https://www1.nyc.gov/site/doitt/initiatives/3d-building.page
https://explorer.morphocode.com/map

## sponsored by
<a href="https://a16z.com/bio/"><img src="/1.png" align="left" hspace="10" vspace="6"></a>


## Thank you to Firefox Nightly and Microsoft Edge and Safari and Chrome Canary 


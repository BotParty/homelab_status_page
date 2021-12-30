# simple-webgpu-compute
## Please star https://github.com/gpuweb/gpuweb to support progress in Computer Graphics for 7 billion people
## Designed specifically for Biotech, Robotics, and Simulation Games
### webgpu public launch eta jan 1 (according to rumors)

module for using webgpu for data visualization and more
make compute shaders as simple as possible
minimalist runtime for using webgpu shaders in nb/static website

<div align="center">

  [![NPM Version](https://img.shields.io/npm/v/regl.svg?style=flat-square)](https://npmjs.org/package/regl)
  [![Build Status](https://img.shields.io/travis/regl-project/regl.svg?style=flat-square)](https://travis-ci.org/regl-project/regl/)
  [![File Size](https://badge-size.herokuapp.com/regl-project/regl/gh-pages/dist/regl.min.js.svg?compression=gzip&style=flat-square)](https://npmcdn.com/regl/dist/regl.min.js)
  [![Downloads](https://img.shields.io/npm/dm/regl.svg?style=flat-square)](https://npmjs.org/package/regl)
  [![Standard](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)

</div>

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
https://scale.com/resources/download/pandaset
https://nanocubes.net/
https://www1.nyc.gov/site/doitt/initiatives/3d-building.page
https://explorer.morphocode.com/map

## Sponsored by
<a href="https://a16z.com/bio/"><img src="https://raw.githubusercontent.com/nyc-map/Simple-webgpu-compute/main/public/1.png" align="left" hspace="10" vspace="6"></a>


## Thank you to Firefox Nightly and Microsoft Edge and Safari and Chrome Canary 


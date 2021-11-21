* simple-data-texture
module for using webgpu for data visualization
just a minimalist runtime for using shaders in nb/static website


this library currently just draws a quad and allows
  custom shaders with minimal boilerplate
  custom uniforms and textures 
  [dec] compute shaders ez 


* Features
helpful error messages and lots of demos :)
interop w/ regl, 3js, vue, d3 and more
[extension](https://github.com/nyc-map/observable-to-light-table)


todo 
import readme into nb 
import library into nb 
import data into nb 
import demos into nb
docs = in repo 
nb = demos / usage


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

# data attribution
https://scale.com/resources/download/pandaset
https://nanocubes.net/
https://www1.nyc.gov/site/doitt/initiatives/3d-building.page


























* /Demos
|file.name        |    GL  | webGPU| both  | dataTexture |
|    ---          |   ---  | ---  |  ---   |    ---      |
|map-311          |        |      |        |             |
|map-trees        |        |      |        |             |
|map-traffic      |        |      |        |             |
|video-spectrogram|        |      |        |             |
|breathe          | regl   |      |        |             |
|Shape-transition | regl   |      |        |             |
|Lidar            | 3.js   |      |        |             |











https://explorer.morphocode.com/map
* nyc-map.com
0 simplistic-afterthought.surge.sh
*** red blob illusions
*** breath
*** finish 3 layers
*** desired uniforms
 - mouse - water
 + breathe - webg
 - red blob shape transition - webgl
 - sky
 - frag coord
  - frag index what (row + col) it is
** pioneer
** marauders map
** data cube for 311 service requests
** morphocode
** h3
** d3
** compost
shader.uniform (
  angle: (d ) => d + Math.random()
)
would be cool if uniforms could be functions
*** webgpu for 7 year olds
todo listen ryan holiday
make simple easy
."A puppet that can no longer be used is mere garbage. This puppet's role has just ended..."


** data cubes
//gant chart for data cubes
//0. simple shader w/ dynamic uniforms
//1. 2d textures - sprites
//
//2. packing of data into 2d images for scatter plot
//   convert 15gb of 311 service requests into texture
//   first take a subset of 10% and then render onto map
//   then transform 15gb into column-based structure
//      then read columns as one texture, and rows as another
//      each pixel gets 2 texture samples
//      which should say "this service request" happened here
//         (geolocation) , (time), (classification), (id)
//      id = reference to all features/columns in dataset for hover ux
//    3d morph targets texture -> tween 3d-model of ball into cup
//    convert 3d model => 2d texture with pixels = xyz point in space

//then lidar scan = points which go into texture
//then columns to dedupe data
//then ....

//before implementing
//estimate how much loading time would be saved
//by converting 15gb - 27M rows w/ 41 columns
//into a map that loads asap.

//https://explorer.morphocode.com/map

Every day, 4.4 million vehicles  drive through nyc

//simulate 4 million points driving around nyc using traffic flow models

//https://wagner.nyu.edu/files/rudincenter/dynamic_pop_manhattan.pdf


//layers for webgpu map of nyc

//cars - 4.4 million dots
// 27million service requests - h3 hex? heatmap, scatterplot(first)

//start with dots
//then heatmap
//then try hexes later


//use hexes to do route planning
//pick two points and show a heatmap of how far the car can travel ?

//im in south brooklyn, show color heatmap of
//based on time of day, and whatever

next year, weather, sanitation, any public data sets that would be useful for cars

//500 layers needed according to carmera
//


//import "./style.css";
//want fragCoord to do stuff with mouse
//otherwise fragment has no idea what it's distance to the cursor is at all.
//fragCoord is a vertex attribute not uniform
//could just add an array from 0-size of list
//and the vertex shader will naturally interpolate the data

//with 1 more thing, anyone can add anything in shadertoy
//mousePosition, fragPosition and

//(insert whatever uniforms desired here) (numbers only for now )
//texture data next (still numbers but more flexible than vertices because compute shaders can do stuff )

//scatter plot on map =

// complaint = (long / lat) :

//convert to NDC(-1,1) by using d3.geo to transform a
//quadrant of nyc to
//01          11
//  ...311...
//00          10

//make js script to
//convert 1e6 311 complaints to
//observable in a manner that it can be downloaded and repackaged on npm/hub for all

//
//quad of nyc = 4 (long lat)
//take sample of 1million complaints and
//tail -n=1e6 file_name

//accept the slight hindrance(mostly embaressment and slight shame cus choices),
//but mostly the awe-inspiring - power of the cosmos

//g rated thoughts
//either
//1. more closed ,less open
//2. slow down thought w/ i


//stuff.video = createVideo();
//let video = stuff.video; oops
//await video.play();
//init returns a draw call with a canvas on it.... for chrome extension
//init could just return an object with draw, canvas, and state
//i would mutate state inbetween draw calls
//and append / hide canvas to whatever framekwork (vue, obs, react, etc)


//stuff.video = createVideo();
//let video = stuff.video; oops
//await video.play();
//init returns a draw call with a canvas on it.... for chrome extension
//init could just return an object with draw, canvas, and state
//i would mutate state inbetween draw calls
//and append / hide canvas to whatever framekwork (vue, obs, react, etc)

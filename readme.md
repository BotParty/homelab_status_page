- SIMPLE WEBGPU COMPUTE - 
simplest GPGPU compute library ever



Features 
1. Simple Particle Renderer 
2. Simple Compute engine
3. Functional Data-Fall Through Declarative Api
4. Auto Adding Uniforms 


This library is for making cool diagrams in notebooks like jupyter, observable, and static websites like vue.js, react and so on. 

With Simple WebGPU COmpute you can describe data visualizations in a JSON format.






//audience: join d3 people and webgpu/gl people
//Uniforms are constants that are data-bound from the user to the shader 




import simpleWebGPU from ''


init -> init returns a draw call

draw -> renders to a rendertarget or a texture

loop







init ({
  frag: 'url/string',
  vert: 'url/string',
  attributes: {
    position: new TypedArray()
  },
  uniforms: {}
  count: 3
})












































//for AI 
//neural net as shader
//hand writing recognition
//eye tracking for focus game
//render output to screen as colors???

//this is for 
//book of simulations and image processing 
//physics of information theory

//visualizations that change the way you see the world
//https://bost.ocks.org/mike/algorithms/
//https://pudding.cool/


# simple-webgpu-compute
## Please star https://github.com/gpuweb/gpuweb to support progress in Computer Graphics for 7 billion people
## Designed specifically for Biotech, Robotics, and Simulation Games


# why simple WebGPUCompute
* simplicity
* correctness
* performance
* minimalism
* stability

# 
http://stack.gl/

catalog of useful shader functions and patterns similar to stackGL but for webgpu

module for using webgpu for data visualization and more
make compute shaders as simple as possible
minimalist runtime for using webgpu shaders in nb/static website




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

(what is the right name for data-cubes/megatextures/virtual-streaming-textures/etc??)




License
All code (c) 2016 MIT License

Development supported by the Freeman Lab and the Howard Hughes Medical Institute (@freeman-lab on GitHub)

Asset licenses
Many examples use creative commons or public domain artwork for illustrative purposes. These assets are not included in any of the redistributable packages of regl.

Peppers test image for cube comparison is public domain
Test video (doggie-chromakey.ogv) by L0ckergn0me, used under creative commons license
Cube maps (posx.jpeg, negx.jpeg, posy.jpeg, negy.jpeg, posz.jpeg, negz.jpeg) by Humus, used under creative commons 3 license
Environment map of Oregon (ogd-oregon-360.jpg) due to Max Ogden (@maxogd on GitHub)
DDS test images (alpine_cliff_a, alpine_cliff_a_norm, alpine_cliff_a_spec) taken from the CC0 license 0-AD texture pack by Wildfire games
Tile set for tile mapping demo (tiles.png) from CC0 licensed cobblestone paths pack
Audio track for audio.js example is "Bamboo Cactus" by 8bitpeoples. CC BY-ND-NC 1.0 license
Matcap (spheretexture.jpg) by Ben Simonds. CC 3 license.
Normal map (normaltexture.jpg) by rubberduck. CC0 license.

## [License](LICENSE)

All code (c) 2016 MIT License

Development supported by the [Freeman Lab](https://www.janelia.org/lab/freeman-lab) and the Howard Hughes Medical Institute ([@freeman-lab](https://github.com/freeman-lab) on GitHub)

#### Asset licenses

Many examples use creative commons or public domain artwork for illustrative purposes.  These assets are not included in any of the redistributable packages of regl.

* Peppers test image for cube comparison is public domain
* Test video (doggie-chromakey.ogv) by [L0ckergn0me](https://archive.org/details/L0ckergn0me-PixieGreenScreen446), used under creative commons license
* Cube maps (posx.jpeg, negx.jpeg, posy.jpeg, negy.jpeg, posz.jpeg, negz.jpeg) by [Humus](http://www.humus.name/index.php?page=Textures), used under creative commons 3 license
* Environment map of Oregon (ogd-oregon-360.jpg) due to Max Ogden ([@maxogd](https://github.com/maxogden) on GitHub)
* DDS test images (alpine_cliff_a, alpine_cliff_a_norm, alpine_cliff_a_spec) taken from the CC0 license [0-AD texture pack by Wildfire games](http://opengameart.org/content/0-ad-textures)
* Tile set for tile mapping demo (tiles.png) from CC0 licensed [cobblestone paths pack](http://opengameart.org/content/rpg-tiles-cobble-stone-paths-town-objects)
* Audio track for `audio.js` example is "[Bamboo Cactus](https://archive.org/details/8bp033)" by [8bitpeoples](https://archive.org/details/8bitpeoples).  CC BY-ND-NC 1.0 license
* Matcap (spheretexture.jpg) by [Ben Simonds](https://bensimonds.com/2010/07/30/matcap-generator/). CC 3 license.
* Normal map (normaltexture.jpg) by [rubberduck](http://opengameart.org/node/21219). CC0 license.


#credit to zoox and stream 
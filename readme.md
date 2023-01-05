
<div align="center">
  🦒
</div>
<h1 align="center">
  simple-gpu
</h1>

<div align="center">
  Fast, functional webGPU
</div>

<br />

<div align="center">

  [![NPM Version](https://img.shields.io/npm/v/simple-webgpu.svg?style=flat-square)](https://npmjs.org/package/regl)
  [![Build Status](https://img.shields.io/travis/regl-project/simple-webgpu.svg?style=flat-square)](https://travis-ci.org/regl-project/regl/)
  [![Downloads](https://img.shields.io/npm/dm/simple-webgpu.svg?style=flat-square)](https://npmjs.org/package/regl)
  [![Standard](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)

</div>

<div align="center">
  <h3>
    <a href="https://github.com/adnanwahab/simple-webgpu/blob/gh-pages/API.md">
      Docs
    </a>
    <span> | </span>
    <a href="https://gitter.im/mikolalysenko/regl">
      Regl Chat
    </a>
    <span> | </span>
    <a href="https://npmcdn.com/simple-webgpu/dist/simple-webgpu.js">
      Download
    </a>
    <span> | </span>
    <a href="https://npmcdn.com/simple-webgpu/dist/simple-webgpu.min.js">
      Minified
    </a>
  </h3>
</div>

## Example

`simple-webgpu` simplifies WebGPU programming by removing as much shared state as it can get away with.  To do this, it replaces the WebGPU API with two fundamental abstractions, **resources** and **commands**:

* A **resource** is a handle to a GPU resident object, like a texture, FBO or buffer.
* A **command** is a complete representation of the WebGPU state required to perform some draw call.

To define a command you specify a mixture of static and dynamic data for the object. Once this is done, `simple-webgpu` takes this description and then compiles it into optimized JavaScript code.  For example, here is a simple `simple-webgpu` program to draw a triangle:

```js
// importing the webgpu module creates a full screen canvas and
// WebGPU context, and then uses this context to initialize a new webgpu instance
const webgpu = require('simple-webgpu')

// Calling simplewebgpu.init() creates a new partially evaluated draw command
const drawTriangle = webgpu.init({

  // Shaders in simplewebgpu. are just strings.  You can use glslify or whatever you want
  // to define them.  No need to manually create shader objects.
  frag: `
    precision mediump float;
    uniform vec4 color;
    void main() {
      gl_FragColor = color;
    }`,

  vert: `
    precision mediump float;
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0, 1);
    }`,

  // Here we define the vertex attributes for the above shader
  attributes: {
    // simplewebgpu.buffer creates a new array buffer object
    position: webgpu.buffer([
      [-2, -2],   // no need to flatten nested arrays, simpleWebgpu automatically
      [4, -2],    // unrolls them into a typedarray (default Float32)
      [4,  4]
    ])
    // simpleWebgpu automatically infers sane defaults for the vertex attribute pointers
  },

  uniforms: {
    // This defines the color of the triangle to be a dynamic variable
    color: webgpu.prop('color')
  },

  // This tells simpleWebgpu the number of vertices to draw in this command
  count: 3
})

// webgpu.frame() wraps requestAnimationFrame and also handles viewport changes
webgpu.frame(({time}) => {
  // clear contents of the drawing buffer
  webgpu.clear({
    color: [0, 0, 0, 0],
    depth: 1
  })

  // draw a triangle using the command defined above
  drawTriangle({
    color: [
      Math.cos(time * 0.001),
      Math.sin(time * 0.0008),
      Math.cos(time * 0.003),
      1
    ]
  })
})
```

See this example [live](http://simple-webgpu.com/)

### [More examples](http://simple-webgpu.com/)

Check out the [gallery](http://simple-webgpu.com/examples/). The source code of all the gallery examples can be found [here](https://github.com/adnanwahab/Simple-webgpu).

## Setup

`simple-webgpu` has no dependencies, so setting it up is pretty easy.  There are 3 basic ways to do this:

### Live editing

just use observablehq.com and 

``` js
require('simple-webgpu')
```

### npm

The easiest way to use `simple-webgpu` in a project is via [npm](http://npmjs.com).  Once you have node set up, you can install and use `simple-webgpu` in your project using the following command:

```sh
npm i -S simple-webgpu
```

For more info on how to use npm, [check out the official docs](https://docs.npmjs.com/).

If you are using npm, you may also want to try [`vite`](https://github.com/vitejs/budo) which is a live development server.

#### Run time error checking and browserify

By default if you compile `simple-webgpu` with `vite` then all error messages and run time checks are removed.  This is done to reduce the size of the final bundle.  If you are developing an application, you should run browserify using the `--debug` flag in order to enable error messages.  This will also generate source maps which make reading the source code of your application easier.

### Standalone script tag

You can also use `simple-webgpu` as a standalone script if you are really stubborn.  The most recent versions can be found in the `dist/` folder and is also available from [npm cdn](https://npmcdn.com) in both minified and unminified versions.

* *Unminified*: [https://npmcdn.com/regl/dist/regl.js](https://npmcdn.com/regl/dist/regl.js)
* *Minified*: [https://npmcdn.com/regl/dist/regl.min.js](https://npmcdn.com/regl/dist/regl.min.js)

There are some difference when using `simple-webgpu` in standalone.  Because script tags don't assume any sort of module system, the standalone scripts inject a global constructor function which is equivalent to the `module.exports` of `simple-webgpu`:


For vanilla HTML in modern browsers, import D3 from jsDelivr:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
    <meta charset=utf-8>
  </head>
  <body>
  </body>
  <script language="javascript" type="module">
  import webgpu from "https://cdn.jsdelivr.net/npm/simple-gpu/+esm";
    let webgpu = webgpu.init()

    webgpu.frame(function () {
      webgpu.clear({
        color: [0, 0, 0, 1]
      })
    })
  </script>
</html>
```
## Why `simple-webgpu`

`simple-webgpu` just removes shared state from WebGPU.  You can do anything you could in regular WebGPU with little overhead and way less debugging. `regl` emphasizes the following values:

* **Simplicity** The interface is concise and emphasizes separation of concerns.  Removing shared state helps localize the effects and interactions of code, making it easier to reason about.
* **Correctness** `simple-webgpu` has more than 30,000 unit tests and above 95% code coverage. In development mode, `regl` performs strong validation and sanity checks on all input data to help you catch errors faster.
* **Performance**  `simple-webgpu` uses  partial evaluation to remove almost all overhead.
* **Minimalism** `simple-webgpu` just wraps WebGPU.  It is not a game engine and doesn't have opinions about scene graphs or vector math libraries.   Any feature in WebGPU is accessible, including advanced extensions like TODO
* **Stability** `simple-webgpu` takes interface compatibility and semantic versioning seriously, making it well suited for long lived applications that must be supported for months or years down the road.  It also has no dependencies limiting exposure to risky or unplanned updates.

### [Benchmarks](https://regl-project.github.io/regl/www/bench-results/bench-result-8ea4a7e806beed0b9732)

In order to prevent performance regressions, `simple-webgpu` is continuously
benchmarked.  You can run benchmarks locally using `npm run bench` or
[check them out
online](https://regl-project.github.io/regl/www/bench.html). The
[results for the last few days can be found
here.](https://regl-project.github.io/regl/www/bench-results/bench-result-db4b76e25bd8ed6d7ed9)

TODO

These measurements were taken using our custom scripts `bench-history` and
`bench-graph`. You can read more about them in [the development guide](https://github.com/adnanwahab/simple-webgpu/blob/gh-pages/DEVELOPING.md).

### Projects using simple-webgpu

The following is an incomplete list of projects using regl:

* [nyc-map](http://nyc-map.org)
* [visualize mind magic](https://visualize-mind-magic.org)


If you have a project using regl that isn't on this list that you would like to see added, [please send us a pull request!](https://github.com/adnanwahab/simple-webgpu/edit/main/README.md)

## [Help Wanted](https://github.com/adnanwahab/simple-webgpu//issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)

simple-webgpu is still under active developement, and anyone willing to contribute is very much welcome to do so. Right now, what we need the most is for people to write examples and demos with the framework. This will allow us to find bugs and deficiencies in the API. We have a list of examples we would like to be implemented [here](https://github.com/adnanwahab/simple-webgpu/issues?q=is%3Aopen+is%3Aissue+label%3Aexample), but you are of course welcome to come up with your own examples. To add an example to our gallery of examples, [please send us a pull request!](https://github.com/adnanwahab/simple-webgpu/pulls)

## [API docs](https://github.com/adnanwahab/simple-webgpu/blob/gh-pages/API.md)

`simple-webgpu` has extensive API documentation.  You can browse the [docs online here](https://github.com/adnanwahab/simple-webgpu/blob/gh-pages/API.md).

## [Development](https://github.com/adnanwahab/simple-webgpu/blob/gh-pages/DEVELOPING.md)

The latest changes in `simple-webgpu` can be found in the [CHANGELOG](https://github.com/adnanwahab/simple-webgpu/blob/gh-pages/CHANGES.md).

[For info on how to build and test headless, see the contributing guide here](https://github.com/adnanwahab/simple-webgpu/blob/gh-pages/DEVELOPING.md)

## [License](LICENSE)

All code (c) 2022 BSD License

#### Asset licenses
TODO

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

#### Regl Homage
Simple-webgpu is an intentional homage of my favorite WebGL module,  [click here to view the original](https://github.com/regl-project/regl), and also d3. My goal with this module was to keep the essence of regl and make it possible to translate the demos with minimal transpilation of just shader code, while keeping the data-fallthrough elements of d3.


# Platinum Sp onsors
<img src="./data/ZOOX_LOGO.png" align="left" hspace="10" vspace="6">

# TODO


- [ ] use vite locally and rollup to build bundle 
- [ ] import module in jupyter notebook (double users, plotly)
- [ ] autocreate bindgroups
- [ ] implement regl api
- [ ] implement reactive constructors in javascript (maybe, vue)
- [ ] use d3 in demos to set pattern for uniforms for now
- [ ] https://bost.ocks.org/mike/join - uniforms/attributes


# Development 
when developing locally, use npm run dev - change the module import from

```js
  import webgpu from "https://cdn.jsdelivr.net/npm/simple-gpu/+esm";
```

to import simpleWebGpu from 

```js
  import webgpu from "../lib/main";
```

process is
make demo
add scaffolding
make demo
take away scaffolding and grow engine upward
build till handwriting, map and glass of water with duck 

import Simple-sentiment-analysis from JScdn

content = document.querySelector('gmail.body.messageContent').textContent

//analyzed corpus
output = simpleWebGpu.simpleSentimentAnalysis(content) 
//returns array with markings and emotional valence 
//[{text: 'hello how are you', style: 'orange', emotion:'question']
output.map(d => {
  return <span style="background-color:${orange}" />${d.text}</span>
}) 


//remove spans using regexp or textContent from all the gmail cells
window.addEventListener('keydown', () => {
})

type in an observable-input then wrap it in a span depending on sentiment analysis

//might want to use an actual js editor component instead of script injection into gmail do both to prototype in editor then do gmail. test technology in two github applications

# TODO 
- [] design shader abstraction for observableHQ
- [] design more visualizations and put them in observablehq
- [] fold-in Austin eng's demos and regl.party
- [] original demos = glass of water, handwriting, sentiment analysis
- [] PBR demo
- [] matrix multiply demo https://milhidaka.github.io/webgpu-blas/ https://gpu.rocks/#/
- [] write docs on auto-create bindgroups - dont hide complexity but consistent mental model resources
- [] always render to a renderTarget not canvas because more composable ???
- [ ] figure out typescript with rollup for module
+commands + passthrough bindgroups when necessary
use observablehq for progressively adding interactivity using sliders

# developing locally
```bash
npm run dev
```

# Why WebGPU and not WebGL?
Most applications are CPU-bound so async draw calls are useful for unblocking IO
3.5x better performance for matrix multiplications 
RayTracing 
Compute Shaders for GPGPU
security  

utopia: documenting the inevitability of success for 7 billion people in 4-7 years

hand sketching itself as a collection of puzzle pieces that are drawn and redrawn live to larp-future-gapfinding-economy - warp in nexus/forge to create fusion

visualize network turning rainbow from one creation + rainbow path
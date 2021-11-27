* simple-webgpu-compute
module for using webgpu for data visualization and more
intention: make compute shaders as simple as possible
minimalist runtime for using webgpu shaders in nb/static website

this library currently just draws a quad and allows
  custom shaders with minimal boilerplate
  custom uniforms and textures 


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
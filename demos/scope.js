/*
  tags: basic
  <p>This examples demonstrates scopes</p>
 */

import simpleWebgpu from '../lib/main';

webgpu = await simpleWebgpu.init();

webgpu.clear({
  color: [0, 0, 0, 1],
  depth: 1
})

webgpu({
  frag: `
    //precision mediump float;
    //uniform vec4 color;
    fn main() -> location(0) vec4<f32> {
      //gl_FragColor = color;
    }`,

  vert: `
    //precision mediump float;
    //attribute vec2 position;
    //uniform vec2 offset;
    fn main(
        @builtin(vertex_index) VertexIndex : u32
      ) -> @builtin(position) vec4<f32> {
            //gl_Position = vec4(position + offset, 0, 1);
    }`,

  attributes: {
    position: [
      0.5, 0,
      0, 0.5,
      1, 1]
  },

  count: 3
})(() => {
    webgpu({
    uniforms: {
      color: [1, 0, 0, 1],
      offset: [0, 0]
    }
  })()

  webgpu({
    uniforms: {
      color: [0, 0, 1, 1],
      offset: [-1, 0]
    }
  })()

  webgpu({
    uniforms: {
      color: [0, 1, 0, 1],
      offset: [0, -1]
    }
  })()

  webgpu({
    uniforms: {
      color: [1, 1, 1, 1],
      offset: [-1, -1]
    }
  })()
})
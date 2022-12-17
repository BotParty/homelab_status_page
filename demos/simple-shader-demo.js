import { init } from "../../lib/main";


let options = {

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
  }

async function simpleShaderDemo() {
    options.data = options.data; //extend
  
    const draw = await init(options);
    draw(data);
  
    requestAnimationFrame(function test() {
      draw(data);
      requestAnimationFrame(test);
      //setTimeout(test, 500)
    });
  }
  
  export default simpleShaderDemo;
import { init } from "../lib/main";
import stripes from '../demos/shaders/stripes.wgsl?raw'
import blur from './webgl/blur.wgsl?raw'

const tileDim = 128;
const batch = [4, 4];
const blockDim = 15



const options = {
  data: {},
  texture: '../data.png',
  
  compute: {
    shader: blur,
    bindGroups: (device) => {
      const buffer0 = (() => {
        const buffer = device.createBuffer({
          size: 4,
          mappedAtCreation: true,
          usage: GPUBufferUsage.UNIFORM,
        });
        new Uint32Array(buffer.getMappedRange())[0] = 0;
        buffer.unmap();
        return buffer;
      })();
    
      const buffer1 = (() => {
        const buffer = device.createBuffer({
          size: 4,
          mappedAtCreation: true,
          usage: GPUBufferUsage.UNIFORM,
        });
        new Uint32Array(buffer.getMappedRange())[0] = 1;
        buffer.unmap();
        return buffer;
      })();
      const textures = [0, 1].map(() => {
        return device.createTexture({
          size: {
            width: srcWidth,
            height: srcHeight,
          },
          format: 'rgba8unorm',
          usage:
            GPUTextureUsage.COPY_DST |
            GPUTextureUsage.STORAGE_BINDING |
            GPUTextureUsage.TEXTURE_BINDING,
        });
      });

     
      const computeBindGroup0 = device.createBindGroup({
        layout: blurPipeline.getBindGroupLayout(1),
        entries: [
          {
            binding: 1,
            resource: cubeTexture.createView(),
          },
          {
            binding: 2,
            resource: textures[0].createView(),
          },
          {
            binding: 3,
            resource: {
              buffer: buffer0,
            },
          },
        ],
      });
    
      const computeBindGroup1 = device.createBindGroup({
        layout: blurPipeline.getBindGroupLayout(1),
        entries: [
          {
            binding: 1,
            resource: textures[0].createView(),
          },
          {
            binding: 2,
            resource: textures[1].createView(),
          },
          {
            binding: 3,
            resource: {
              buffer: buffer1,
            },
          },
        ],
      });

      const computeBindGroup2 = device.createBindGroup({
        layout: blurPipeline.getBindGroupLayout(1),
        entries: [
          {
            binding: 1,
            resource: textures[1].createView(),
          },
          {
            binding: 2,
            resource: textures[0].createView(),
          },
          {
            binding: 3,
            resource: {
              buffer: buffer0,
            },
          },
        ],
      });

      return [
        computeBindGroup0,computeBindGroup1, computeBindGroup2
      ]
    },
    dispatchWorkGroups: () => {
      return [
        Math.ceil(800 / blockDim),
        Math.ceil(600 / batch[1])
      ]
    },
  }  
}
async function physics() {
  options.data = options.data  //extend 
  let draw = await init(options);
  draw({});
  requestAnimationFrame(function test() {
    draw({});
    requestAnimationFrame(test)
  });
  }
  export default physics;
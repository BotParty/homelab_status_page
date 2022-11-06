// import { scaleLinear } from "d3-scale";
import utils from "./utils";
// @ts-ignore
import defaultShader from "./default.wgsl?raw";

import updateSpritesWGSL from "./updateSprites.wgsl?raw";
import spriteWGSL from './sprite.wgsl?raw';

let t = 0;


let makeImgTexture = async () => {
  const img = document.createElement("img");
  const source = img;
  source.width = innerWidth;
  source.height = innerHeight;

  img.src = "../test.png";
  await img.decode();

  return await createImageBitmap(img);
}

async function makeTexture(state) {
  let cubeTexture = state.device.createTexture({
    size: [256, 1, 1],
    format: "rgba8unorm",
    usage:
      GPUTextureUsage.TEXTURE_BINDING |
      GPUTextureUsage.COPY_DST |
      GPUTextureUsage.RENDER_ATTACHMENT,
  });
//  console.log(cubeTexture)
  let imageBitmap = await makeImgTexture();
    let music = new Float32Array(new Array(800)
    .fill(5)
    .map((d, i) => 
    state.data.texture ? 
    state.data.texture[i % state.data.texture.length] 
    : Math.random() 
    ));
      
      state.cubeTexture = cubeTexture
      state.data.music = music

    // state.device.queue.copyExternalImageToTexture(
    //   { source: imageBitmap },
    //   { texture: cubeTexture },
    //   [imageBitmap.width, imageBitmap.height]
    // );
    state.cubeTexture = cubeTexture;
    let data = new Uint8Array(new Array(256).fill(5).map((d, i) =>i / 25))


  updateTexture(state)
 //let data = new Float32Array(music);
  return cubeTexture
}

function updateTexture(state) { 

  let data = new Uint8Array(new Array(1024).fill(5).map((d, i) => 
  state.data.texture ? 
  state.data.texture[i % state.data.texture.length]
  : Math.random() 
  ))
//console.log(state.data)
  state.device.queue.writeTexture(
     {texture: state.cubeTexture},
    data.buffer,
    {
      bytesPerRow: 3200,
      rowsPerImage: 600,
    },
    [256, 1]
  );
}

const recordRenderPass = async function (state: any) {
  let { vertexBuffer, device, pipeline, renderPassDescriptor } = state;

  renderPassDescriptor.colorAttachments[0].view = state.context
    .getCurrentTexture()
    .createView();

  const commandEncoder = device.createCommandEncoder();

    // prettier-ignore
    const vertexBufferData = new Float32Array([
      -0.01, -0.02, 0.01,
      -0.02, 0.0, 0.02,
    ]);

  const spriteVertexBuffer = device.createBuffer({
    size: vertexBufferData.byteLength,
    usage: GPUBufferUsage.VERTEX,
    mappedAtCreation: true,
  });

  new Float32Array(spriteVertexBuffer.getMappedRange()).set(vertexBufferData);
  spriteVertexBuffer.unmap();

  const simParams = {
    deltaT: 0.04,
    rule1Distance: 0.1,
    rule2Distance: 0.025,
    rule3Distance: 0.025,
    rule1Scale: 0.02,
    rule2Scale: 0.05,
    rule3Scale: 0.005,
  };
  const numParticles = 1500;
  const initialParticleData = new Float32Array(numParticles * 4);
  for (let i = 0; i < numParticles; ++i) {
    initialParticleData[4 * i + 0] = 2 * (Math.random() - 0.5);
    initialParticleData[4 * i + 1] = 2 * (Math.random() - 0.5);
    initialParticleData[4 * i + 2] = 2 * (Math.random() - 0.5) * 0.1;
    initialParticleData[4 * i + 3] = 2 * (Math.random() - 0.5) * 0.1;
  }

  const particleBuffers: GPUBuffer[] = new Array(2);
  const particleBindGroups: GPUBindGroup[] = new Array(2);
  for (let i = 0; i < 2; ++i) {
    particleBuffers[i] = device.createBuffer({
      size: initialParticleData.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE,
      mappedAtCreation: true,
    });
    new Float32Array(particleBuffers[i].getMappedRange()).set(
      initialParticleData
    );
    particleBuffers[i].unmap();
  }

  const simParamBufferSize = 7 * Float32Array.BYTES_PER_ELEMENT;
  const simParamBuffer = device.createBuffer({
    size: simParamBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const computePipeline = device.createComputePipeline({
    layout: 'auto',
    compute: {
      module: device.createShaderModule({
        code: updateSpritesWGSL,
      }),
      entryPoint: 'main_vertex',
    },
  });
    for (let i = 0; i < 2; ++i) {
      particleBindGroups[i] = device.createBindGroup({
        layout: computePipeline.getBindGroupLayout(0),
        entries: [
          {
            binding: 0,
            resource: {
              buffer: simParamBuffer,
            },
          },
          {
            binding: 1,
            resource: {
              buffer: particleBuffers[i],
              offset: 0,
              size: initialParticleData.byteLength,
            },
          },
          {
            binding: 2,
            resource: {
              buffer: particleBuffers[(i + 1) % 2],
              offset: 0,
              size: initialParticleData.byteLength,
            },
          },
        ],
      });
    }



  // if (! stuff.renderBundle)
  //   passEncoder = device.creacteRenderBundleEncoder({
  //     colorFormats: ['rgb10a2unorm']
  //   } 

  {
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(computePipeline);
    passEncoder.setBindGroup(0, particleBindGroups[t % 2]);
    passEncoder.dispatchWorkgroups(Math.ceil(numParticles / 64));
    passEncoder.end();
    t++
  }

  const bindGroup = device.createBindGroup(state.bindGroupDescriptor);
//  state.pipeline = await makePipeline(state);
  let passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

  updateTexture(state);

  passEncoder.setPipeline(state.pipeline);

  passEncoder.setBindGroup(0, bindGroup);
  passEncoder.setVertexBuffer(0, particleBuffers[(t + 1) % 2]);
  passEncoder.setVertexBuffer(1, spriteVertexBuffer);
  //passEncoder.draw(3 * 2, 1, 0, 0);
  passEncoder.draw(3, numParticles, 0, 0);


  passEncoder.end();
  device.queue.submit([commandEncoder.finish()]); //async
};

function updateUniforms(state: any) {
  let { data, device } = state;

  let values: any = Object.values(data).filter(val => typeof val !== 'object');

  let uniformsArray = new Float32Array(values.length);
  uniformsArray.set(values, 0);

if (state.uniformsBuffer) {
  device.queue.writeBuffer(state.uniformsBuffer, 0, uniformsArray.buffer, 0, 28);
  return state.uniformsBuffer
} else {
  return (state.uniformsBuffer = utils.createBuffer(
    device,
    uniformsArray,
    GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  ));
}
}
async function makePipeline(state) {
  let { device } = state;

  let pipelineDesc = {
    layout: "auto",
    vertex: {
      module: state.shader,
      entryPoint: "main_vertex",
      buffers: [
        {
          // instanced particles buffer
          arrayStride: 4 * 4,
          stepMode: 'instance',
          attributes: [
            {
              // instance position
              shaderLocation: 0,
              offset: 0,
              format: 'float32x2',
            },
            {
              // instance velocity
              shaderLocation: 1,
              offset: 2 * 4,
              format: 'float32x2',
            },
          ],
        },
        {
          // vertex buffer
          arrayStride: 2 * 4,
          stepMode: 'vertex',
          attributes: [
            {
              // vertex positions
              shaderLocation: 2,
              offset: 0,
              format: 'float32x2',
            },
          ],
        },
      ],
    },
    fragment: {
      module: state.shader,
      entryPoint: "main_fragment",
      targets: [{ format: "bgra8unorm" }],
    },

    primitive: {
      topology: 'triangle-list',
    },
  } as GPURenderPipelineDescriptor;

  const sampler = device.createSampler({
    magFilter: "linear",
    minFilter: "linear",
    mipmapFilter: "nearest",
  });

  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: {
          type: "uniform",
          minBindingSize: 4 *7,
        },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        type: "sampler",
        sampler,
      },
      {
        binding: 2,
        visibility: GPUShaderStage.FRAGMENT,
        texture: {},
      },
    ],
  });

  const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout],
  });
 
  state.bindGroupLayout = bindGroupLayout;
  updateUniforms(state);
  const renderPassDescriptor = {
    colorAttachments: [
      {
        view: void 0,
        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        loadOp: "clear",
        storeOp: "store",
      },
    ],
  };

  state.renderPassDescriptor = renderPassDescriptor;

  let pipeline = device.createRenderPipeline({
    ...pipelineDesc,
    layout: pipelineLayout,
  });

  let cubeTexture = await makeTexture(state);
  state.bindGroupDescriptor = {
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: { buffer: state.uniformsBuffer },
      },
      {
        binding: 1,
        resource: sampler,
      },
      {
        binding: 2,
        resource: cubeTexture.createView({
          baseMipLevel: 0, // Make sure we're getting the right mip level...
          mipLevelCount: 1,
        }),
        texture: {
          sampleType: "float",
          viewDimension: "2d",
          multisampled: 0,
        },
      },
    ],
  };

  state.bindGroupDescriptor.entries[0].resource.buffer = updateUniforms(state);

  state.bindGroupDescriptor.entries[2].resource = state.cubeTexture.createView({
    baseMipLevel: 0, // Make sure we're getting the right mip level...
    mipLevelCount: 1,
  });

  return pipeline;
}

function makeShaderModule(device: any, data: any, source: any) {
  if (!source) source = defaultShader;
  validateData(data);

  const uniforms = Object.keys(data)
    .filter((name) => typeof data[name] === 'number' )
    .map((name) => `${name}: f32,`)
    .join("\n");

  const code = `
    struct Uniforms {
     ${uniforms}
   }
  @binding(0) @group(0) var<uniform> u: Uniforms;
  @binding(1) @group(0) var mySampler: sampler;
  @binding(2) @group(0) var myTexture: texture_2d<f32>;

  struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) fragUV : vec2<f32>,
    @location(1) fragPosition: vec4<f32>,
  }
  @vertex
  fn main_vertex(
    @builtin(vertex_index) VertexIndex : u32,
  ) -> VertexOutput {
    const pos = array(
      vec2( 1.0,  1.0),
      vec2( 1.0, -1.0),
      vec2(-1.0, -1.0),
      vec2( 1.0,  1.0),
      vec2(-1.0, -1.0),
      vec2(-1.0,  1.0),
    );
  
    const uv = array(
      vec2(1.0, 0.0),
      vec2(1.0, 1.0),
      vec2(0.0, 1.0),
      vec2(1.0, 0.0),
      vec2(0.0, 1.0),
      vec2(0.0, 0.0),
    );

    var output : VertexOutput;
    output.Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
    output.fragUV = uv[VertexIndex];
    output.fragPosition = (output.Position + vec4<f32>(1.0, 1.0, 1.0, 1.0));
    output.fragPosition.g = 1.5 - output.fragPosition.g;
    return output;
  }
  ${source}`;

  //add actual vertex attributes for the quad positions
//  return device.createShaderModule({ code });
  const spriteShaderModule = device.createShaderModule({ code: spriteWGSL });

  return spriteShaderModule
}

let defaultData = {
  width: innerWidth, //based on canvas
  height: innerHeight, //based on canvas
  pixelRatio: 2, //recompile
  time: 0,
  mouseX: 0,
  mouseY: 0,
  angle: 0,
};

function validateData(data: any) {
  if (typeof data.width !== "number") throw new Error("bad data!!");
}

const addMouseEvents = function (canvas: any, data: any) {
  canvas.addEventListener("mousemove", (event: any) => {
    let x = event.pageX;
    let y = event.pageY;
    data.mouseX = x / event.target.clientWidth;
    data.mouseY = y / event.target.clientHeight;
  });
};

async function init(options: any) {
  let canvas = options.canvas || utils.createCanvas();
  const state = {
    renderPassDescriptor: {},
    data: Object.assign(defaultData, options.data),
  };

  addMouseEvents(canvas, state.data);

  const context = canvas.getContext("webgpu") as GPUCanvasContext;
  const adapter = (await navigator.gpu.requestAdapter()) as GPUAdapter;

  const device = (await adapter?.requestDevice()) as GPUDevice;

  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

  Object.assign(state, {
    device,
    context,
    adapter,
  });

  context.configure({
    device,
    format: presentationFormat,
    alphaMode: "opaque",
    usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
  });

  state.shader = makeShaderModule(device, state.data, options.shader);

  state.pipeline = await makePipeline(state);
  function draw(newData: any) {
    newData.time = performance.now();
    updateTexture(state)
    Object.assign(state.data, newData);
    updateUniforms(state);
    recordRenderPass(state);

    return draw;
  }

  draw.canvas = canvas;
  return draw;
}
init.version = '0.5.9'
export { init };

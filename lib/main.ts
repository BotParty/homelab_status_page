// import { scaleLinear } from "d3-scale";
import utils from './utils';
// @ts-ignore
import defaultShader from './default.wgsl?raw';
import blurWGSL from './blur.wgsl?raw';
import fullscreenTexturedQuadWGSL from './fullscreenTexturedQuad.wgsl?raw';


const attribs = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);

const recordRenderPass = async function (stuff:any,) {
  let {
    attribsBuffer,
    context,
    gpuDevice,
    pipeline,
    uniformsBuffer,
    renderPassDescriptor,
  } = stuff;

  const commandEncoder = gpuDevice.createCommandEncoder();
  const textureView = context.getCurrentTexture().createView();
  renderPassDescriptor.colorAttachments[0].view = textureView;

  let passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

  // if (! stuff.renderBundle)
  //   passEncoder = stuff.gpuDevice.createRenderBundleEncoder({
  //     colorFormats: ['rgb10a2unorm']
  //   })

  passEncoder.setPipeline(pipeline);
  const bindGroup = gpuDevice.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: { buffer: uniformsBuffer } } ],
  });

  //first pass
  passEncoder.setBindGroup(0, bindGroup);
  passEncoder.setVertexBuffer(0, attribsBuffer);
  passEncoder.draw(3 * 2, 1, 0, 0);
  passEncoder.endPass();
  gpuDevice.queue.submit([commandEncoder.finish()]); //async
};

function updateUniforms(stuff:any) {
  let {
    data,
    gpuDevice,
  } = stuff;
  let values:any = Object.values(data);
  let uniformsArray = new Float32Array(values.length);
  uniformsArray.set(values, 0);
  stuff.uniformsBuffer = utils.createBuffer(
    gpuDevice, uniformsArray, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  );
}
function makePipeline(shader:any, gpuDevice:any,) {
  let pipelineDesc = {
    vertex: {
      module: shader,
      entryPoint: "main_vertex",
      buffers: [{ arrayStride: Float32Array.BYTES_PER_ELEMENT * 2,
                attributes: [ { offset: 0, shaderLocation: 0, format: "float32x2" } ] } ] },
    fragment: {
      module: shader,
      entryPoint: "main_fragment",
      targets: [{ format: "bgra8unorm" }],
    },
    primitives: { topology: "triangle-list" },
  };
  return gpuDevice.createRenderPipeline(pipelineDesc);
}

function makeShaderModule(gpuDevice:any, data:any, source:any,) {
  if (! source) source = defaultShader;
  validateData(data)
  const uniforms = Object.keys(data).map((name) => `${name}: f32;`).join("\n");
  const code = `
  [[block]] struct Uniforms {
    ${uniforms}
  };
  [[group(0), binding(0)]] var<uniform> u: Uniforms;
 struct VertexInput {
    [[location(0)]] pos: vec2<f32>;
  };
  struct VertexOutput {
    [[builtin(position)]] pos: vec4<f32>;
    [[location(0)]] uv: vec2<f32>;
  };

  [[stage(vertex)]]
  fn main_vertex(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;
    var pos: vec2<f32> = input.pos * 3.0 - 1.0;
    output.pos = vec4<f32>(pos, 0.0, 1.0);
    output.uv = input.pos;
    return output;
  }
  ${source}`
  return gpuDevice.createShaderModule({ code });
}

let defaultData =  {
  width: 900, //based on canvas
  height: 500, //based on canvas
  pixelRatio: 2, //based on canvas
  time: 0,
  mouseX: 0,
  mouseY: 0,
  angle: 0,
};

function validateData (data:any) {
  if (typeof data.width !== 'number') throw new Error('bad data!!')
}

async function init2(options:any) {
  let canvas = options.canvas || utils.createCanvas();
  const state = { 
    renderPassDescriptor: {},
    attribsBuffer: {},
    data: Object.assign(defaultData, options.data)
  };
  
  const context = canvas.getContext("webgpu");
  const adapter = await navigator.gpu.requestAdapter();
  const gpuDevice = await adapter?.requestDevice();
  const presentationFormat = context.getPreferredFormat(adapter);
  const presentationSize = [
    canvas.width * devicePixelRatio,
    canvas.height * devicePixelRatio,
  ];
  Object.assign(state, {
    gpuDevice,
    context,
    adapter, 
  });

  context.configure({
    device: gpuDevice,
    format: presentationFormat,
    size: presentationSize,
  });
  let shader = makeShaderModule(gpuDevice, state.data, options.shader);

  const pipeline = makePipeline(shader, gpuDevice);

  const textureView = context.getCurrentTexture().createView();
  const renderPassDescriptor = {
    colorAttachments: [{ view: textureView,
        loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        storeOp: "store",
      },
    ],
  };
  state.renderPassDescriptor = renderPassDescriptor;
  Object.assign(state, {
    textureView,
    renderPassDescriptor,
    pipeline,
  });
  state.attribsBuffer = utils.createBuffer(gpuDevice, attribs, GPUBufferUsage.VERTEX);
  function draw(newData:any) {
    Object.assign(state.data, newData)//todo diff data for reupload uniform/texture
    updateUniforms(state);
    recordRenderPass(state) 
    return draw
  }

  draw.canvas = canvas
  return draw
}


const tileDim = 128;
const batch = [4, 4];
const init = async (options:any) => {
  let canvas = options.canvas || utils.createCanvas();
  const state = { 
    renderPassDescriptor: {},
    attribsBuffer: {},
    data: Object.assign(defaultData, options.data)
  };
 



  const adapter = await navigator.gpu?.requestAdapter();
  const device = await adapter.requestDevice();

  const context = canvas.getContext('webgpu');

  const devicePixelRatio = window.devicePixelRatio || 1;
  const presentationSize = [
    canvas.clientWidth * devicePixelRatio,
    canvas.clientHeight * devicePixelRatio,
  ];
  const presentationFormat = context.getPreferredFormat(adapter);

  context.configure({
    device,
    format: presentationFormat,
    size: presentationSize,
  });

  const blurPipeline = device.createComputePipeline({
    compute: {
      module: device.createShaderModule({
        code: blurWGSL,
      }),
      entryPoint: 'main',
    },
  });

  const fullscreenQuadPipeline = device.createRenderPipeline({
    vertex: {
      module: device.createShaderModule({
        code: fullscreenTexturedQuadWGSL,
      }),
      entryPoint: 'vert_main',
    },
    fragment: {
      module: device.createShaderModule({
        code: fullscreenTexturedQuadWGSL,
      }),
      entryPoint: 'frag_main',
      targets: [
        {
          format: presentationFormat,
        },
      ],
    },
    primitive: {
      topology: 'triangle-list',
    },
  });

  const sampler = device.createSampler({
    magFilter: 'linear',
    minFilter: 'linear',
  });

  const img = document.createElement('img');
  img.src = './late.png';
  await img.decode();
  const imageBitmap = await createImageBitmap(img);

  const [srcWidth, srcHeight] = [imageBitmap.width, imageBitmap.height];
  const cubeTexture = device.createTexture({
    size: [srcWidth, srcHeight, 1],
    format: 'rgba8unorm',
    usage:
      GPUTextureUsage.TEXTURE_BINDING |
      GPUTextureUsage.COPY_DST |
      GPUTextureUsage.RENDER_ATTACHMENT,
  });
  device.queue.copyExternalImageToTexture(
    { source: imageBitmap },
    { texture: cubeTexture },
    [imageBitmap.width, imageBitmap.height]
  );

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

  const blurParamsBuffer = device.createBuffer({
    size: 8,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM,
  });

  const computeConstants = device.createBindGroup({
    layout: blurPipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: sampler,
      },
      {
        binding: 1,
        resource: {
          buffer: blurParamsBuffer,
        },
      },
    ],
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

  const showResultBindGroup = device.createBindGroup({
    layout: fullscreenQuadPipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: sampler,
      },
      {
        binding: 1,
        resource: textures[1].createView(),
      },
    ],
  });

  const settings = {
    filterSize: 15,
    iterations: 2,
  };

  let blockDim: number;
  const updateSettings = () => {
    blockDim = tileDim - (settings.filterSize - 1);
    device.queue.writeBuffer(
      blurParamsBuffer,
      0,
      new Uint32Array([settings.filterSize, blockDim])
    );
  };


  updateSettings();

  function draw() {

    const commandEncoder = device.createCommandEncoder();

    const computePass = commandEncoder.beginComputePass();
    computePass.setPipeline(blurPipeline);
    computePass.setBindGroup(0, computeConstants);

    computePass.setBindGroup(1, computeBindGroup0);
    computePass.dispatch(
      Math.ceil(srcWidth / blockDim),
      Math.ceil(srcHeight / batch[1])
    );

    computePass.setBindGroup(1, computeBindGroup1);
    computePass.dispatch(
      Math.ceil(srcHeight / blockDim),
      Math.ceil(srcWidth / batch[1])
    );

    for (let i = 0; i < settings.iterations - 1; ++i) {
      computePass.setBindGroup(1, computeBindGroup2);
      computePass.dispatch(
        Math.ceil(srcWidth / blockDim),
        Math.ceil(srcHeight / batch[1])
      );

      computePass.setBindGroup(1, computeBindGroup1);
      computePass.dispatch(
        Math.ceil(srcHeight / blockDim),
        Math.ceil(srcWidth / batch[1])
      );
    }

    computePass.endPass();

    const passEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: context.getCurrentTexture().createView(),
          loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
          storeOp: 'store',
        },
      ],
    });

    passEncoder.setPipeline(fullscreenQuadPipeline);
    passEncoder.setBindGroup(0, showResultBindGroup);
    passEncoder.draw(6, 1, 0, 0);
    passEncoder.endPass();
    device.queue.submit([commandEncoder.finish()]);

  }
  return draw
};

export { 
  init,
};
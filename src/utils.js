//add utils file for the top level fns
let data = {
  width: 900, //based on canvas
  height: 500, //based on canvas
  pixelRatio: 2, //based on canvas
  time: 0,
  mouseX: 0,
  mouseY: 0,
  angle: 0,
  //texture: (video)
};

function makeVideoBindGroupDescriptor(stuff) {
  let { gpuDevice, pipeline, video } = stuff;
  const sampler = gpuDevice.createSampler({
    magFilter: "linear",
    minFilter: "linear",
  });

  const videoBindGroupEntries = [
    {
      binding: 1,
      resource: sampler,
    },
    {
      binding: 2,
      resource: gpuDevice.importExternalTexture({
        source: video,
      }),
    },
  ];
  return {
    videoBindGroupEntries,
    sampler,
  };
}

const webGPUTextureFromImageUrl = async function (gpuDevice, url) {
  const response = await fetch(url);
  const blob = await response.blob();
  const imgBitmap = await createImageBitmap(blob);

  return webGPUTextureFromImageBitmapOrCanvas(gpuDevice, imgBitmap);
};

const recordRenderPass = async function (stuff) {
  let {
    attribsBuffer,
    context,
    gpuDevice,
    pipeline,
    uniformsBuffer,
    renderPassDescriptor,
  } = stuff;
  // console.log(
  //   "stuff",
  //   attribsBuffer,
  //   context,
  //   gpuDevice,
  //   pipeline,
  //   uniformsBuffer,
  //   renderPassDescriptor
  // );
  const commandEncoder = gpuDevice.createCommandEncoder();
  const textureView = context.getCurrentTexture().createView();
  renderPassDescriptor.colorAttachments[0].view = textureView;
  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
  passEncoder.setPipeline(pipeline);
  //slots 0 = uniform
  //1 = texture sampler

  //required GPUIndex32 binding;
  // required GPUShaderStageFlags visibility;
  //
  // GPUBufferBindingLayout buffer;
  // GPUSamplerBindingLayout sampler;
  // GPUTextureBindingLayout texture;
  // GPUStorageTextureBindingLayout storageTexture;
  // GPUExternalTextureBindingLayout externalTexture;

  //
  // ypedef [EnforceRange] unsigned long GPUBufferDynamicOffset;
  // typedef [EnforceRange] unsigned long GPUStencilValue;
  // typedef [EnforceRange] unsigned long GPUSampleMask;
  // typedef [EnforceRange] long GPUDepthBias;
  //
  // typedef [EnforceRange] unsigned long long GPUSize64;
  // typedef [EnforceRange] unsigned long GPUIntegerCoordinate;
  // typedef [EnforceRange] unsigned long GPUIndex32;
  // typedef [EnforceRange] unsigned long GPUSize32;
  // typedef [EnforceRange] long GPUSignedOffset32;
  //
  // typedef unsigned long GPUFlagsConstant;
  const bindGroup = gpuDevice.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: {
          buffer: uniformsBuffer,
        },
      },
      // {
      //   binding: 1,
      //   resource: stuff.sampler,
      // },
      // {
      //   binding: 2,
      //   resource: gpuDevice.importExternalTexture({
      //     source: document.querySelector("video"),
      //   }),
      // },
    ],
  });
  //concat was right, off by one index
  //same error as previously, how to
  passEncoder.setBindGroup(0, bindGroup);
  passEncoder.setVertexBuffer(0, attribsBuffer);
  passEncoder.draw(3 * 2, 1, 0, 0);
  passEncoder.endPass();
  gpuDevice.queue.submit([commandEncoder.finish()]); //async
};
function updateUniforms(stuff) {
  let {
    data,
    gpuDevice,
    uniformsBuffer,
    state,
    renderPassDescriptor,
    pipeline,
    attribsBuffer,
  } = stuff;
  let values = Object.values(data);
  let uniformsArray = new Float32Array(values.length);
  uniformsArray.set(values, 0, values.length);
  return createBuffer(
    gpuDevice,
    uniformsArray,
    GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  );
}
function makePipeline(shader, gpuDevice, dataTexturesBindGroupLayout) {
  // let pipeLineLayout = gpuDevice.createPipelineLayout({
  //   bindGroupLayouts: [dataTexturesBindGroupLayout],
  // });

  let pipelineDesc = {
    //layout: pipeLineLayout,
    vertex: {
      module: shader,
      entryPoint: "main_vertex",
      buffers: [
        {
          arrayStride: Float32Array.BYTES_PER_ELEMENT * 2,
          attributes: [
            {
              offset: 0,
              shaderLocation: 0,
              format: "float32x2",
            },
          ],
        },
      ],
    },
    fragment: {
      module: shader,
      entryPoint: "main_fragment",
      targets: [{ format: "bgra8unorm" }],
    },
    primitives: {
      topology: "triangle-list",
    },
  };
  return gpuDevice.createRenderPipeline(pipelineDesc);
}

const createBuffer = (gpuDevice, arr, usage) => {
  let desc = {
    size: (arr.byteLength + 3) & ~3,
    usage,
    mappedAtCreation: true,
  };
  let buffer = gpuDevice.createBuffer(desc);
  const writeArray =
    arr instanceof Uint16Array
      ? new Uint16Array(buffer.getMappedRange())
      : new Float32Array(buffer.getMappedRange());
  writeArray.set(arr);
  buffer.unmap();
  return buffer;
};

function makeShaderModule(gpuDevice, data, name, sources) {
  let source = `
    let size = 3.0;
  fn main(uv: vec2<f32>) -> vec4<f32> {
    var base = vec4<f32>(cos(u.time), .5, sin(u.time), 1.);
    let dist = distance( uv, vec2<f32>(u.mouseX, u.mouseY));
    if (uv.x < .1 ) { base.y = .1; }
    if (uv.x > .2 ) { base.y = .5; }
    if (uv.x > .3 ) { base.x = .5; }
    //if (uv.x > .4 ) { base.z = .7; }
    //if (uv.x > .5 ) { base.z = .9; }
    //if (dist < .1) { base.x = .1; }
    return base;
  }

  [[stage(fragment)]]
  fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
    return main(in.uv);
  }
  `;
  const userland_Uniforms = Object.keys(data)
    .map((name) => `${name}: f32;`)
    .join("\n");

  const shader = gpuDevice.createShaderModule({
    code: `
  [[block]] struct Uniforms {
    ${userland_Uniforms}
  };
  [[group(0), binding(0)]] var<uniform> u: Uniforms;
  // [[group(0), binding(1)]] var mySampler: sampler;
  // [[group(0), binding(2)]] var myTexture: texture_external;
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
  ${source}`,
  });
  return shader;
}
//generic functions above
async function init(options) {
  const stuff = {
    ...options,
    canvas: options.canvas,
    state: {}, //passed from frame to frame
  };
  const context = stuff.canvas.value || stuff.canvas.getContext("webgpu");
  const adapter = await navigator.gpu.requestAdapter();
  const gpuDevice = await adapter.requestDevice();
  const presentationFormat = context.getPreferredFormat(adapter);
  const presentationSize = [
    options.width * devicePixelRatio,
    options.height * devicePixelRatio,
  ];
  Object.assign(stuff, {
    gpuDevice,
    context,
    adapter, //gpuAdapter
  });

  context.configure({
    device: gpuDevice,
    format: presentationFormat,
    size: presentationSize,
  });
  let shader = makeShaderModule(gpuDevice, data, name);

  // Object.assign(stuff, {
  //   renderPassDescriptor,
  //   pipeline,
  //   uniformsBuffer,
  //   attribsBuffer,
  // });
  //let videoBindGroupDescriptor = makeVideoBindGroupDescriptor(stuff);

  // Object.assign(stuff, {
  //   videoBindGroupDescriptor: videoBindGroupDescriptor.videoBindGroupEntries,
  //   videoBindGroupDescriptor: videoBindGroupDescriptor.sampler,
  // });

  const pipeline = makePipeline(
    shader,
    gpuDevice
    //dataTexturesBindGroupLayout
  );

  const textureView = context.getCurrentTexture().createView();
  const renderPassDescriptor = {
    colorAttachments: [
      {
        view: textureView,
        loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        storeOp: "store",
      },
    ],
  };
  stuff.renderPassDescriptor = renderPassDescriptor;
  Object.assign(stuff, {
    textureView,
    renderPassDescriptor,
    pipeline,
    // uniformsBuffer,
    // attribsBuffer,
  });
  //before calling createBindgroup
  //bindgroupaylout must be configured to have 3 entries
  const attribs = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);

  stuff.attribsBuffer = createBuffer(gpuDevice, attribs, GPUBufferUsage.VERTEX);
  function draw(state) {
    let uniformsBuffer = updateUniforms(stuff);
    stuff.uniformsBuffer = uniformsBuffer;
    recordRenderPass(stuff).finally(() => {});
    //do something to state if needed
    return state;
  }

  return { draw, canvas: options.canvas };
}
//userland
//run takes in a stuff object
//which has data and a canvas
//user passes in options which contain
// let utils = {
//   makeVideoBindGroupDescriptor,
//   webGPUTextureFromImageUrl,
//   recordRenderPass,
//   updateUniforms,
//   makePipeline,
//   makeShaderModule,
//   init,
//   start_loop,
//   createVideo,
// }
//export default utils;
export default { init };

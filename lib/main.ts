// import { scaleLinear } from "d3-scale";
import utils from './utils';
// @ts-ignore
import defaultShader from './default.wgsl?raw';

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
      buffers: [{ 
        arrayStride: 
        Float32Array.BYTES_PER_ELEMENT * 2,
                attributes:
                 [ { offset: 0, shaderLocation: 0, format: "float32x2" } ] } ] },
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
   struct Uniforms {
    ${uniforms}
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

const addMouseEvents = function (canvas:any, data:any) {
  canvas.addEventListener('mousemove', (event:any) => {
    let x = event.pageX 
    let y = event.pageY
    data.mouseX = x / event.target.clientWidth
    data.mouseY = y / event.target.clientHeight
  })
}

async function init(options:any) {
  let canvas = options.canvas || utils.createCanvas();
  const state = { 
    renderPassDescriptor: {},
    attribsBuffer: {},
    data: Object.assign(defaultData, options.data)
  };
  addMouseEvents(canvas, state.data)

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
    if (! newData.time) newData.time = performance.now()
    Object.assign(state.data, newData)
    updateUniforms(state);
    recordRenderPass(state) 
    return draw
  }

  draw.canvas = canvas
  return draw
}
























init.version = '0.8.0';

export { 
  init,
};
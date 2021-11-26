import { scaleLinear } from "d3-scale";
import utils from './utils';


const attribs = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);

const recordRenderPass = async function (stuff) {
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
//  const renderBundle = passEncoder.finish();
  //2nd pass
  // passEncoder.executeBundles([renderBundle]);
  // passEncoder.endPass();
  gpuDevice.queue.submit([commandEncoder.finish()]); //async
  //return renderBundle
};
function updateUniforms(stuff) {
  let {
    data,
    gpuDevice,
  } = stuff;
  let values = Object.values(data);
  let uniformsArray = new Float32Array(values.length);
  uniformsArray.set(values, 0, values.length);
  stuff.uniformsBuffer = utils.createBuffer(
    gpuDevice, uniformsArray, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  );
}
function makePipeline(shader, gpuDevice) {
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

function makeShaderModule(gpuDevice, data, source) {
  const uniforms = Object.keys(data).map((name) => `${name}: f32;`).join("\n");
  const code = `
  [[block]] struct Uniforms {
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

async function init(options) {
  const stuff = {
    data: options.data,
    canvas: options.canvas || utils.createCanvas(),
    state: {}, //passed from frame to frame-comment line 229
  };
  const context = stuff.canvas.value || stuff.canvas.getContext("webgpu");
  const adapter = await navigator.gpu.requestAdapter();
  const gpuDevice = await adapter.requestDevice();
  const presentationFormat = context.getPreferredFormat(adapter);
  const presentationSize = [
    stuff.canvas.width * devicePixelRatio,
    stuff.canvas.height * devicePixelRatio,
  ];
  Object.assign(stuff, {
    gpuDevice,
    context,
    adapter, 
  });

  context.configure({
    device: gpuDevice,
    format: presentationFormat,
    size: presentationSize,
  });
  let shader = makeShaderModule(gpuDevice, data, options.shader);

  const pipeline = makePipeline(shader, gpuDevice);

  const textureView = context.getCurrentTexture().createView();
  const renderPassDescriptor = {
    colorAttachments: [{ view: textureView,
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
  });
  stuff.attribsBuffer = utils.createBuffer(gpuDevice, attribs, GPUBufferUsage.VERTEX);
  function draw(state) {
    updateUniforms(stuff);
    recordRenderPass(stuff) 
    return state;
  }
  return { draw, canvas: stuff.canvas};
}

async function start_loop_nb(data) {
  const canvas = document.createElement("canvas");

  canvas.addEventListener("mousemove", function (e) {
    data.mouseX = e.clientX / data.width;
    data.mouseY = e.clientY / data.height;
  });

  let copiedData = Object.assign({}, data); //should come from args
  copiedData.time = Date.now() % 1000; //le clock
  let options = { data: copiedData, canvas: canvas, width: data.width, height: data.height };
  let state = await init(options);
  let next_state = state.draw(state); //this should have all the inner stuff
  return next_state;
}
let data = {
  width: 900, //based on canvas
  height: 500, //based on canvas
  pixelRatio: 2, //based on canvas
  time: 0,
  mouseX: 0,
  mouseY: 0,
  angle: 0,
};
//user land
async function start_loop_static(options) {
  options.data = options.data || data; //extend 
  let state = await init(options);
  addMouseEvents(state);
  requestAnimationFrame(function test() {
    data.time = performance.now()
    state = state.draw(state);
    //todo only pass in data that changed and update in place based on names
    requestAnimationFrame(test)
  });
}

function addMouseEvents(state) {
  let scaleX = scaleLinear().domain([0, 1]).range([0, 0.3]);
  let scaleY = scaleLinear().domain([1, 0]).range([0, 1]);
  state.canvas.addEventListener("mousemove", function (e) {
    data.mouseX = scaleX(e.clientX / e.target.clientWidth);
    data.mouseY = scaleY(e.clientY / e.target.clientHeight);
  });
}

export { start_loop_static, start_loop_nb };


//import init
//init (shader,uniforms) == returns a draw call
//draw({time: 2}) === draw() => draw()
//draw returns a applicative functor 
//has props like destroy(), canvas, etc

//update uniforms when controls do stuff 
//maybe have a signal / pubsub api :) 
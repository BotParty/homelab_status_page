// import { scaleLinear } from "d3-scale";
import utils from "./utils";
// @ts-ignore
import defaultShader from "./default.wgsl?raw";

const recordRenderPass = async function (state: any) {
  let {
    vertexBuffer,
    device,
    pipeline,
    renderPassDescriptor,
  } = state;

  renderPassDescriptor.colorAttachments[0].view =  state.context.getCurrentTexture().createView();

  const commandEncoder = device.createCommandEncoder();

  let renderPassEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

  // if (! stuff.renderBundle)
  //   passEncoder = device.creacteRenderBundleEncoder({
  //     colorFormats: ['rgb10a2unorm']
  //   }

  state.bindGroupDescriptor.entries[0].resource.buffer = updateUniforms(state);

  const bindGroup = device.createBindGroup(state.bindGroupDescriptor);

  renderPassEncoder.setPipeline(pipeline);

  renderPassEncoder.setBindGroup(0, bindGroup);
  if (vertexBuffer) renderPassEncoder.setVertexBuffer(0, vertexBuffer);
  
  renderPassEncoder.draw(3 * 2, 1, 0, 0);

  renderPassEncoder.end();
  device.queue.submit([commandEncoder.finish()]); //async
};

function updateUniforms(state: any) {
  let { data, device } = state;
  let values: any = Object.values(data);
  let uniformsArray = new Float32Array(values.length);
  uniformsArray.set(values, 0);
  return state.uniformsBuffer = utils.createBuffer(
    device,
    uniformsArray,
    GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  );
}
async function makePipeline(shader, state) {
  let { device } = state;

  let pipelineDesc = {
    layout: "auto",
    vertex: {
      module: shader,
      entryPoint: "main_vertex",
      // buffers: [
      //   {
      //     shaderLocation: 0,
      //     offset: 0,
      //     format: 'float32x4',
      //     arrayStride: 0
      //   },
      // ]
    },
    fragment: {
      module: shader,
      entryPoint: "main_fragment",
      targets: [{ format: "bgra8unorm" }],
    },
    primitives: { topology: "triangle-list" },
  } as GPURenderPipelineDescriptor;

  const sampler = device.createSampler({
    magFilter: "linear",
    minFilter: "linear",
  });

  const img = document.createElement("img");
  const source = img;
  source.width = 500;
  source.height = 500;

  img.src = "../october.png";
  await img.decode();

  const imageBitmap = await createImageBitmap(img);

  // Fetch the image and upload it into a GPUTexture.
  let cubeTexture: GPUTexture;
  {
    const img = document.createElement("img");
    img.src = "../october.png";
    await img.decode();
    const imageBitmap = await createImageBitmap(img);

    cubeTexture = device.createTexture({
      size: [imageBitmap.width, imageBitmap.height, 1],
      format: "rgba8unorm",
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
  }
 

// const makeStuff = (device) => {
//  const cubeVertexArray = 
 
//  new Float64Array(new Array(1024).fill(0).map((d, i) => i));

//   const waveGridSize = 1024;
//   const waveGridBufferSize = waveGridSize * waveGridSize * 3 * Float32Array.BYTES_PER_ELEMENT;
//   const waveGridVertexBuffer = device.createBuffer({
//     size: waveGridBufferSize,
//     usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
//   });
//   waveGridVertexBuffer.unmap()


//   const numParticles = 1500;
//   const initialParticleData = new Float32Array(numParticles * 4);

//   const verticesBuffer = device.createBuffer({
//     size: cubeVertexArray.byteLength,
//     usage: GPUBufferUsage.VERTEX,
//     mappedAtCreation: true,
//   });
//   new Float32Array(verticesBuffer.getMappedRange()).set(cubeVertexArray);
//   verticesBuffer.unmap();
// }

  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: {
          type: "uniform",
          minBindingSize: 4 * 7,
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
        texture: {
          textureView: cubeTexture.createView(),
        },
        textureView: cubeTexture.createView(),
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
        view:  void 0,
        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        loadOp: "clear",
        storeOp: "store",
      },
    ],
  };

//  renderPassDescriptor.colorAttachments[0].view = cubeTexture.createView();

  state.renderPassDescriptor = renderPassDescriptor;

  let pipeline = device.createRenderPipeline({
    ...pipelineDesc,
    layout: pipelineLayout,
  });

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
        resource: cubeTexture.createView(),
        texture: {
          sampleType: "float",

          viewDimension: "2d",
          multisampled: 0,
        },
      },
    ],
  }

  return pipeline;
}

function makeShaderModule(device: any, data: any, source: any) {
  if (!source) source = defaultShader;
  validateData(data);
  const uniforms = Object.keys(data)
    .map((name) => `${name}: f32,`)
    .join("\n");
  const code = `
    struct Uniforms {
     ${uniforms}
   }
@binding(0) @group(0) var<uniform> u: Uniforms;
@binding(1) @group(0)  var mySampler: sampler;
@binding(2) @group(0) var myTexture: texture_2d<f32>;

struct VertexOutput {
  @builtin(position) Position : vec4<f32>,
  @location(0) fragUV : vec2<f32>,
  @location(1) fragPosition: vec4<f32>,
//  @location(2) stuff: vec4<f32>
}
@vertex
fn main_vertex(
  @builtin(vertex_index) VertexIndex : u32,
  //@location(0) stuff : vec4<f32>,

) -> VertexOutput {

  var uv = array<vec2<f32>, 6>(
    vec2<f32>(1.0, 0.0),
    vec2<f32>(1.0, 1.0),
    vec2<f32>(0.0, 1.0),
    vec2<f32>(1.0, 0.0),
    vec2<f32>(0.0, 1.0),
    vec2<f32>(0.0, 0.0)
  );

  var pos = array<vec2<f32>, 6>(
    vec2<f32>( 1.0,  1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 1.0,  1.0),
    vec2<f32>(-1.0, -1.0),
    vec2<f32>(-1.0,  1.0)
);

  var output : VertexOutput;
  output.Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
  output.fragUV = uv[VertexIndex];
  output.fragPosition = (output.Position + vec4<f32>(1.0, 1.0, 1.0, 1.0));
  output.fragPosition.g = 1.5 - output.fragPosition.g;
  //output.stuff = stuff;
  return output;
}
  ${source}`;
  return device.createShaderModule({ code });
}

let defaultData = {
  width: 900, //based on canvas
  height: 500, //based on canvas
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
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter?.requestDevice() as GPUDevice;

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

  let shader = makeShaderModule(device, state.data, options.shader);

  const pipeline = await makePipeline(shader, state);

  Object.assign(state, {
    pipeline,
  });

  
  function draw(newData: any) {
    newData.time = performance.now();
    updateAttribs(newData, state)
    Object.assign(state.data, newData);
    updateUniforms(state);
    recordRenderPass(state);

    return draw;
  }

  draw.canvas = canvas;
  return draw;
}

init.version = "0.8.0";


function updateAttribs(newData, state) {
  if (! newData.data) return
  state.vertexBuffer = utils.createBuffer(
    state.device,
    newData.data,
    GPUBufferUsage.VERTEX
  );
}

export { init };

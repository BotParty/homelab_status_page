// import { scaleLinear } from "d3-scale";
import utils from "./utils";
// @ts-ignore
import defaultShader from "./default.wgsl?raw";

//makeTexture - state.data.texture = {img, array, etc} 
//make texture - array - resize appropriately 
//make draw loop more robust and reliable 
let makeImgTexture = async () => {
  const img = document.createElement("img");
  const source = img;
  source.width = innerWidth;
  source.height = innerHeight;

  img.src = "../october.png";
  await img.decode();

  return await createImageBitmap(img);
}

async function makeTexture(state) {
  let cubeTexture = state.device.createTexture({
    size: [2556, 1824, 1],
    format: "rgba8unorm",
    usage:
      GPUTextureUsage.TEXTURE_BINDING |
      GPUTextureUsage.COPY_DST |
      GPUTextureUsage.RENDER_ATTACHMENT,
  });
  let imageBitmap = await makeImgTexture();

  let music = new Array(2556)
    .fill(5)
    .map((d, i) => 
    state.data.texture ? 
    state.data.texture[i % state.data.texture.length] : new Float32Array(
      new Array(2556)
      .map((d, i) => Math.random())
    ));

    state.device.queue.copyExternalImageToTexture(
      { source: imageBitmap },
      { texture: cubeTexture },
      [imageBitmap.width, imageBitmap.height]
    );
  state.cubeTexture = cubeTexture
  updateTexture(state)
  let data = new Float32Array(music);


  return cubeTexture
}

function updateTexture(state) {  
  state.device.queue.writeTexture(
    { texture: state.cubeTexture },
    state.data.buffer,
    {
      bytesPerRow: 1024,
      rowsPerImage: 7846,
    },
    [2556, 1824]
  );
}

const recordRenderPass = async function (state: any) {
  let { vertexBuffer, device, pipeline, renderPassDescriptor } = state;

  renderPassDescriptor.colorAttachments[0].view = state.context
    .getCurrentTexture()
    .createView();

  const commandEncoder = device.createCommandEncoder();

  let renderPassEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

  // if (! stuff.renderBundle)
  //   passEncoder = device.creacteRenderBundleEncoder({
  //     colorFormats: ['rgb10a2unorm']
  //   } 
  
  const bindGroup = device.createBindGroup(state.bindGroupDescriptor);

  renderPassEncoder.setPipeline(state.pipeline);

  renderPassEncoder.setBindGroup(0, bindGroup);

  renderPassEncoder.draw(3 * 2, 1, 0, 0);

  renderPassEncoder.end();
  device.queue.submit([commandEncoder.finish()]); //async
};

function updateUniforms(state: any) {
  let { data, device } = state;
  //console.log(data)
  let values: any = Object.values(data).filter(val => typeof val !== 'object');

  let uniformsArray = new Float32Array(values.length);
  uniformsArray.set(values, 0);
  return (state.uniformsBuffer = utils.createBuffer(
    device,
    uniformsArray,
    GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  ));
}
async function makePipeline(shader, state) {
  let { device } = state;

  let pipelineDesc = {
    layout: "auto",
    vertex: {
      module: shader,
      entryPoint: "main_vertex",
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
    mipmapFilter: "nearest",
  });
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
    var uv = array<vec2<f32>, 6>(
      vec2<f32>(1.0, 0.0),
      vec2<f32>(1.0, 1.0),
      vec2<f32>(0.0, 1.0),
      vec2<f32>(1.0, 0.0),
      vec2<f32>(0.0, 1.0),
      vec2<f32>(0.0, 0.0)
    );

    var pos = array<vec2<f32>, 6>(
      vec2<f32>( 1.0, -1.0),
      vec2<f32>(-1.0, -1.0),
      vec2<f32>( 1.0,  1.0),
      vec2<f32>(-1.0,  1.0),
      vec2<f32>( 1.0,  1.0),
      vec2<f32>(-1.0, -1.0),
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
  return device.createShaderModule({ code });
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

  state.pipeline = await makePipeline(state.shader, state);
  function draw(newData: any) {
    console.log('i am being drawn');
    //newData.time = performance.now();
    updateTexture(state)
    Object.assign(state.data, newData);
    updateUniforms(state);
    recordRenderPass(state);

    return draw;
  }

  draw.canvas = canvas;
  return draw;
}
export { init };

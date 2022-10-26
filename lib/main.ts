// import { scaleLinear } from "d3-scale";
import utils from './utils';
// @ts-ignore
import defaultShader from './default.wgsl?raw';

const attribs = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);

const recordRenderPass = async function (stuff:any,) {
  let {
    vertexBuffer,
    context,
    device,
    pipeline,
    uniformsBuffer,
    renderPassDescriptor,
  } = stuff;

  const commandEncoder = device.createCommandEncoder();
  const textureView = context.getCurrentTexture().createView();
  renderPassDescriptor.colorAttachments[0].view = textureView;

  let passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

  // if (! stuff.renderBundle)
  //   passEncoder = stuff.gpuDevice.createRenderBundleEncoder({
  //     colorFormats: ['rgb10a2unorm']
  //   })

  passEncoder.setPipeline(pipeline);

  const layout = device.createBindGroupLayout({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.VERTEX,
        buffer: {
          type: 'uniform',
          minBindingSize: 4 * 7,
        },
      },
    ],
  });

  // const uniformBindGroup = device?.createBindGroup({
  //   layout: pipeline.getBindGroupLayout(0),
  //   entries: [
  //     {
  //       binding: 1,
  //       resource: sampler,
  //     },
  //     {
  //       binding: 2,
  //       resource: device.importExternalTexture({
  //         source: video,
  //       }),
  //     },
  //   ],
  // });

  const bindGroup = device.createBindGroup({
    layout,
    entries: [{ binding: 0, resource: { buffer: uniformsBuffer } } ],
  });

  passEncoder.setBindGroup(0, bindGroup);
  passEncoder.setVertexBuffer(0, vertexBuffer);
  passEncoder.draw(3 * 2, 1, 0, 0);
  passEncoder.end();
  device.queue.submit([commandEncoder.finish()]); //async
};

function updateUniforms(stuff:any) {
  let {
    data,
    device,
  } = stuff;
  let values:any = Object.values(data);
  let uniformsArray = new Float32Array(values.length);

  uniformsArray.set(values, 0);

  stuff.uniformsBuffer = utils.createBuffer(
    device, uniformsArray, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  );
}
function makePipeline(shader:any, device:any,) {
  let pipelineDesc = {
    layout: 'auto',

    vertex: {
      module: shader,
      entryPoint: "main_vertex",
      buffers: [{ 
        arrayStride: Float32Array.BYTES_PER_ELEMENT * 2,
        attributes:[ // vertex positions
          { offset: 0, shaderLocation: 0, format: "float32x2" } 
        ] 
      }] 
    },
    fragment: {
      module: shader,
      entryPoint: "main_fragment",
      targets: [{ format: "bgra8unorm" }],
    },
    primitives: { topology: "triangle-list" },
  };

  
  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.VERTEX,
        buffer: {
          type: 'uniform',
          minBindingSize: 4 * 7, //7 = num of uniforms
        },
      },
    ],
  });


  const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout],
  });

  return device.createRenderPipeline({...pipelineDesc, 
    //layout:  pipeline.getBindGroupLayout(0)//pipelineLayout
  })
}

function makeShaderModule(device:any, data:any, source:any,) {
  if (! source) source = defaultShader;
  validateData(data)
  const uniforms = Object.keys(data).map((name) => `${name}: f32,`).join("\n");
  const code = `
    struct Uniforms {
     ${uniforms}
   }
@group(0) @binding(0) var<uniform> u: Uniforms;
  // [[group(0), binding(1)]] var mySampler: sampler;
  // [[group(0), binding(2)]] var myTexture: texture_external;
  struct VertexInput {
    @location(0) pos: vec2<f32>,
  }

  struct VertexOutput {
    @builtin(position) pos: vec4<f32>,
    @location(0) uv: vec2<f32>,
  }

  @vertex
  fn main_vertex(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;
    var pos: vec2<f32> = input.pos * 3.0 - 1.0;
    output.pos = vec4<f32>(pos, 0.0, 1.0);
    output.uv = input.pos;
    return output;
  }
  ${source}`

  return device.createShaderModule({ code });
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

  const context = canvas.getContext("webgpu") as GPUCanvasContext;
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter?.requestDevice();

  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

  const presentationSize = [
    canvas.width * devicePixelRatio,
    canvas.height * devicePixelRatio,
  ];
  Object.assign(state, {
    device,
    context,
    adapter, 
  });

  context.configure({
    device,
    format: presentationFormat,
    //size: presentationSize,
    alphaMode: 'opaque',
    usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
  });

  let shader = makeShaderModule(device, state.data, options.shader);

  const pipeline = makePipeline(shader, device);

  const textureView = context.getCurrentTexture().createView();
  const renderPassDescriptor = {
    colorAttachments: [{ 
        view: textureView,
        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store'
      },
    ],
  };

  state.renderPassDescriptor = renderPassDescriptor;

  Object.assign(state, {
    textureView,
    renderPassDescriptor,
    pipeline,
  });
  state.vertexBuffer = utils.createBuffer(device, attribs, GPUBufferUsage.VERTEX);

  function draw(newData:any) {
    //if (! newData.time)
     newData.time = performance.now()
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
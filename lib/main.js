// import { scaleLinear } from "d3-scale";
import utils from "./utils";
// @ts-ignore
import {updateTexture, makeTexture} from './Texture';
import {makeShaderModule} from './shader'

let hasMadeCompute = false;


function createRenderPasses(state) {
  if (!hasMadeCompute && state.compute) {
    makeCompute(state);
  }

  let {
    particleBuffers,
    computeVertexBufferData,
    device,
  } = state;

  const bindGroup = device.createBindGroup(state.bindGroupDescriptor);

  const mainRenderPass = {
    renderPassDescriptor: state.renderPassDescriptor,
    texture: state.texture,
    pipeline: state.pipeline,
    bindGroup: bindGroup,
    type: "draw",
  };

  //@ts-ignore
  if (state?.compute?.numVertices)
    //@ts-ignore
    mainRenderPass.numVertices = state.compute.numVertices();
  //@ts-ignore
  if (state.compute && particleBuffers)
    //@ts-ignore
    mainRenderPass.vertexBuffers = [
      particleBuffers[0],
      computeVertexBufferData,
    ];

  state.renderPasses.push(mainRenderPass);
  console.log(state.renderPasses)
}

const recordRenderPass = async function (state) {
  let { device, renderPassDescriptor } = state;

  renderPassDescriptor.colorAttachments[0].view = state.context
    .getCurrentTexture()
    .createView();

  const commandEncoder = device.createCommandEncoder();

  console.log('state.renderpasses', state.renderPasses)
  let _ = state.renderPasses[0]
  if (! _) return console.log('no worky')

  let passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
  passEncoder.setPipeline(_.pipeline);
  passEncoder.setBindGroup(0, _.bindGroup);
  passEncoder.draw(3 * 2, 1, 0, 0)
  passEncoder.end();
  device.queue.submit([commandEncoder.finish()]); 

};

function updateUniforms(state) {
  let { data, device } = state;

  let values = Object.values(data).filter(
    (val) => typeof val !== "object"
  );

  let uniformsArray = new Float32Array(values.length);
  uniformsArray.set(values, 0);

  if (state.uniformsBuffer) {
    device.queue.writeBuffer(
      state.uniformsBuffer,
      0,
      uniformsArray.buffer,
      0,
      4 * uniformsArray.length
    );
    return state.uniformsBuffer;
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

  const cubeVertexArray = new Float32Array(
    new Array(10000).fill(5).map((_, i) => {
      let n = i / 1000;
      if (i % 2 === 1) return n % 1
      if (i % 2 === 0) return n / 10
    })
   );
 //x coordinate should be 0 to 1 .1 * n % 1
 //y coordinates should be 0 till 100 then

   const cubeVertexSize = 4 * 10; // Byte size of one cube vertex.

  const verticesBuffer = device.createBuffer({
    size: cubeVertexArray.byteLength,
    usage: GPUBufferUsage.VERTEX,
    mappedAtCreation: true,
  });
  new Float32Array(verticesBuffer.getMappedRange()).set(cubeVertexArray);
  verticesBuffer.unmap();
  state.cubeVertices= verticesBuffer

 

  let pipelineDesc = {
    layout: "auto",
    vertex: {
      module: state.shader,
      entryPoint: "main_vertex",
      buffers: [
        // {
        //   arrayStride: cubeVertexSize,
        //   attributes: [{
        //     shaderLocation: 0,
        //     offset: 0,
        //     format: 'float32x4',
        //   }]
        // }
      ],
    },
    fragment: {
      module: state.shader,
      entryPoint: "main_fragment",
      targets: [{ format: "bgra8unorm" }],
    },

    primitive: {
      topology: "triangle-list",
    },
  };

  if (state.compute) {
    //@ts-ignore
    pipelineDesc.vertex.buffers.push(
      {
        // instanced particles buffer
        arrayStride: 4 * 4,
        stepMode: "instance",
        attributes: [
          {
            // instance position
            shaderLocation: 0,
            offset: 0,
            format: "float32x2",
          },
          {
            // instance velocity
            shaderLocation: 1,
            offset: 2 * 4,
            format: "float32x2",
          },
        ],
      },
      {
        // vertex buffer
        arrayStride: 2 * 4,
        stepMode: "vertex",
        attributes: [
          {
            // vertex positions
            shaderLocation: 2,
            offset: 0,
            format: "float32x2",
          },
        ],
      }
    );
  }
  const sampler = device.createSampler({
    magFilter: "linear",
    minFilter: "linear",
    mipmapFilter: "nearest",
  });

  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.COMPUTE,
        buffer: {
          type: "uniform",
          minBindingSize: 4 * 7,
        },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.COMPUTE,
        type: "sampler",
        sampler,
      },
      {
        binding: 2,
        visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.COMPUTE,
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
        clearValue: { r: 0.5, g: 0.5, b: 0.5, a: 1.0 },
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

  let texture = await makeTexture(state);
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
        resource: texture.createView({
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

  state.bindGroupDescriptor.entries[2].resource = texture.createView({
    baseMipLevel: 0, // Make sure we're getting the right mip level...
    mipLevelCount: 1,
  });

  return pipeline;
}

  //@ts-ignore
async function compile(state, options) {
  console.log(123, 555, 144)
  //state.renderPasses = []
  if (state.compute) {
    if (state.compute.cs)
     state.renderPasses.push(makeComputePass(state))
  }

  let shaderCode = state.options.shader

  state.shader = makeShaderModule(state, shaderCode);
  state.pipeline = await makePipeline(state);
  createRenderPasses(state);
  //debugger
  //console.log(state, options)
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

async function init(options={}) {
  let canvas = options.canvas || utils.createCanvas();
  const state = {
    renderPassDescriptor: {},
    options,
    data: Object.assign(defaultData, options.data), //user data
    compute: options.compute, //user data
    renderPasses: [], //internal state
  };

  utils.addMouseEvents(canvas, state.data);

  if (! navigator.gpu) return console.log('Error: webgpu is not available. Please install canary!!!')

  const context = canvas.getContext("webgpu");
  const adapter = (await navigator.gpu.requestAdapter());
  const device = (await adapter?.requestDevice());
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

  //delete state and assign stuff to context with _ for private var
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

  //@ts-ignore
  function draw(newData) {
    newData.time = performance.now();

    updateTexture(state);
    Object.assign(state.data, newData);
    updateUniforms(state);
    recordRenderPass(state);

    // console.log('is draw being called')
    return draw;
  }

  draw.canvas = canvas;
  draw.prop = prop;
  draw.buffer = buffer
  draw.initDrawCall = initDrawCall
  draw.state = state
  draw.draw = draw
  
  return draw;
}

init.version = "0.9.9";

function initDrawCall (options) {
  //debugger
  let state = this.state;
  compile(state, state.options);
  console.log('initDrawCall', 123)

  return this;
}

function buffer(args) {
  return args
}

function prop(name) {}


function scopes() {}
//insight: each draw call has its own scope and render pass descriptor
export default { init };

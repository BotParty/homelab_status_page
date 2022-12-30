import utils from "./utils";
import {updateTexture, makeTexture} from './Texture';
import {makeShaderModule, updateUniforms} from './shader'

function createRenderPasses(state) {
  let {
    particleBuffers,
    computeVertexBufferData,
    device,
  } = state;

 
  //state.bindGroupDescriptor[2].resource = updateTexture(state)
  const bindGroup = device.createBindGroup(state.bindGroupDescriptor);

  const mainRenderPass = {
    renderPassDescriptor: state.renderPassDescriptor,
    texture: state.texture,
    pipeline: state.pipeline,
    bindGroup: bindGroup,
    type: "draw",
  };
  
  if (state?.compute?.numVertices)
  mainRenderPass.numVertices = state.compute.numVertices();
  //@ts-ignore
  if (state.compute && particleBuffers)
    //@ts-ignore
    mainRenderPass.vertexBuffers = [
      particleBuffers[0],
      computeVertexBufferData,
    ];

  state.renderPasses.push(mainRenderPass);
}

const recordRenderPass = async function (state) {
  let { device, renderPassDescriptor } = state;

  renderPassDescriptor.colorAttachments[0].view = state.context
    .getCurrentTexture()
    .createView();

  const commandEncoder = device.createCommandEncoder();
  let _ = state.renderPasses[0]
  if (! _) return console.log('no worky')

let cubeVertexArray = new Float32Array(state.options.attributes.position.array.flat());

  const verticesBuffer = device.createBuffer({
    size: cubeVertexArray.byteLength,
    usage: GPUBufferUsage.VERTEX,
    mappedAtCreation: true,
  });
  new Float32Array(verticesBuffer.getMappedRange()).set(cubeVertexArray);
  verticesBuffer.unmap();

  let passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
  passEncoder.setPipeline(_.pipeline);
  passEncoder.setBindGroup(0, _.bindGroup);
  passEncoder.setVertexBuffer(0, verticesBuffer);
  passEncoder.draw(state.options.count , 1, 0, 0)
  passEncoder.end();
  device.queue.submit([commandEncoder.finish()]); 
};

async function makePipeline(state) {
  let { device } = state;

  const cubeVertexArray = new Float32Array(
    new Array(10000).fill(5).map((_, i) => {
      let n = i / 1000;
      if (i % 2 === 1) return n % 1
      if (i % 2 === 0) return n / 10
    })
   );
   const cubeVertexSize = 4 * 10; // Byte size of one cube vertex.

  const verticesBuffer = device.createBuffer({
    size: cubeVertexArray.byteLength,
    usage: GPUBufferUsage.VERTEX,
    mappedAtCreation: true,
  });
  new Float32Array(verticesBuffer.getMappedRange()).set(cubeVertexArray);
  verticesBuffer.unmap();
  state.cubeVertices= verticesBuffer

  //console.log(state.options.attributes.position.buffer)
  let pipelineDesc = {
    layout: "auto",
    vertex: {
      module: device.createShaderModule({
        code: state.options.vert,
      }),
      entryPoint: "main",
      buffers: [
        {
          arrayStride: 4 * 10, //two vertices so 4 bytes each
          attributes: [
            {
              // position
              shaderLocation: 0,
              offset: 0, 
              format: 'float32x4',
            },
            {
              // color
              shaderLocation: 1,
              offset: 0,
              format: 'float32x2',
            },
          ],
        },
      ],
    },
    fragment: {
      module: device.createShaderModule({
        code: state.options.frag,
      }),
      entryPoint: "main",
      targets: [{ format: "bgra8unorm" }],
    },

    primitive: {
      topology: "triangle-list",
      cullMode: 'back'
    },
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth24plus'
    }
    // multisample: {
    //   count: 4,
    // },
  };

  if (state.compute) {
    applyCompute(pipeline.vertexBuffers)
  }
  const sampler = device.createSampler({
    magFilter: "linear",
    minFilter: "linear",
    mipmapFilter: "nearest",
  });

  // const bindGroupLayout = device.createBindGroupLayout({
  //   entries: [
  //     {
  //       binding: 0,
  //       visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.COMPUTE,
  //       buffer: {
  //         type: "uniform",
  //         minBindingSize: 4 * 7,
  //       },
  //     },
  //     {
  //       binding: 1,
  //       visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.COMPUTE,
  //       type: "sampler",
  //       sampler,
  //     },
  //     {
  //       binding: 2,
  //       visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.COMPUTE,
  //       texture: {},
  //     },
  //   ],
  // });

  // const pipelineLayout = device.createPipelineLayout({
  //   bindGroupLayouts: [bindGroupLayout],
  // });

//  state.bindGroupLayout = bindGroupLayout;
  updateUniforms(state); //overwrites the state.uniformsbfufer

  const depthTexture = device.createTexture({
    size: [500 * devicePixelRatio, 500 * devicePixelRatio],
    format: 'depth24plus',
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  });

                    const renderPassDescriptor = {
    colorAttachments: [
    {
        view: void 0,
        clearValue: { r: 0.5, g: 0.5, b: 0.5, a: 1.0 },
        loadOp: "clear",
        storeOp: "store",
      },
    ],
    depthStencilAttachment: {
      view: depthTexture.createView(),

      depthClearValue: 1.0,
      depthLoadOp: 'clear',
      depthStoreOp: 'store',
    },
  };

  state.renderPassDescriptor = renderPassDescriptor;

  let pipeline = device.createRenderPipeline({
    ...pipelineDesc,
//    layout: pipelineLayout,
  });

  const uniformBufferSize = 4 * 16; // 4x4 matrix
  const uniformBuffer = device.createBuffer({
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  let texture = await updateTexture(state);
  state.bindGroupDescriptor = {
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: { buffer: uniformBuffer },
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
        // texture: {
        //   sampleType: "float",
        //   viewDimension: "2d",
        //   multisampled: 0,
        // },
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
async function compile(state, options) {
  let shaderCode = state.options.shader

  //state.shader = makeShaderModule(state, shaderCode);
  state.pipeline = await makePipeline(state);
  createRenderPasses(state);
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

  //delete state and assign stuff to context with __ for private var like d3 to leave backdoor
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

  function draw(newScope) {
    if (Array.isArray(newScope)) 
      return newScope.map((scope) => draw(scope))
  
    //Object.assign(state.scope, newScope);
    
    updateUniforms(state, state.options.uniforms.modelViewProjectionMatrix());
    recordRenderPass(state);
    return draw;
  }

  draw.canvas = canvas;
  draw.prop = prop;
  draw.buffer = buffer
  draw.initDrawCall = initDrawCall
  draw.state = state
  draw.draw = draw

  return {
    initDrawCall, 
    buffer, 
    prop,
    clear,
    frame,
    version: '0.10.0'
  }

  function frame(cb) {
    requestAnimationFrame(function anon() {
      cb()
      requestAnimationFrame(anon)
    })
  }
  async function initDrawCall (options) {
    state.options = options
    await compile(state, state.options);
  
    return draw
  }
}

function clear(options) {
  state.clearValue.r = options.color[0]
  state.clearValue.g = options.color[1]
  state.clearValue.b = options.color[2]
}

function buffer(array) {
  if (! (this instanceof buffer)) return new buffer(array);
  this.array = array
}

function prop(name) {
  return () => {
    let context = {
      
        viewportWidth: 500,
        viewportHeight: 500,
        tick: Performance.now()
    }
    let val = ( typeof state.uniforms[name] === 'function') ? state.uniforms[name](context) : state.uniforms[name]
    return state.uniforms[name]
  }
}
function scopes() {}
export default { init, version: '0.15.0'}; //insight: each draw call has its own scope and render pass descriptor

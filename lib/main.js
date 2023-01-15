import utils from "./utils";
import {updateTexture, makeTexture} from './Texture';
import {makeShaderModule, updateUniforms} from './shader'

function createComputePass(options, state) {
  let device = state.device

  const pipeline = device.createComputePipeline({
    layout: 'auto',
    compute: {
      module: device.createShaderModule({
        code: options.code,
      }),
      entryPoint: 'main',
    },
  });
    const mainComputePass = {
      pipeline: pipeline,
      bindGroups: [],
      workGroups: [
        [], []
      ]
    }
    state.computePass = mainComputePass
}

function execComputePass (state, srcWidth, blockDim, batch, srcHeight) {
  state.commandEncoder = state.commandEncoder || device.createCommandEncoder();
  const commandEncoder = state.commandEncoder


  const computePass = commandEncoder.beginComputePass();
  computePass.setPipeline(blurPipeline);
  computePass.setBindGroup(0, computeConstants);

  computePass.setBindGroup(1, computeBindGroup0);
  computePass.dispatchWorkgroups(
    Math.ceil(srcWidth / blockDim),
    Math.ceil(srcHeight / batch[1])
  );

  computePass.setBindGroup(1, computeBindGroup1);
  computePass.dispatchWorkgroups(
    Math.ceil(srcHeight / blockDim),
    Math.ceil(srcWidth / batch[1])
  );

  for (let i = 0; i < settings.iterations - 1; ++i) {
    computePass.setBindGroup(1, computeBindGroup2);
    computePass.dispatchWorkgroups(
      Math.ceil(srcWidth / blockDim),
      Math.ceil(srcHeight / batch[1])
    );

    computePass.setBindGroup(1, computeBindGroup1);
    computePass.dispatchWorkgroups(
      Math.ceil(srcHeight / blockDim),
      Math.ceil(srcWidth / batch[1])
    );
  }
  computePass.end();
}


function createRenderPasses(state, options) {
  let device = state.device;
console.log(state.bindGroupDescriptor)
   const bindGroup = device.createBindGroup(
    options.bindGroup || state.bindGroupDescriptor);

  const mainRenderPass = {
    renderPassDescriptor: state.renderPassDescriptor,
    texture: state.texture,
    pipeline: state.pipeline,
    bindGroup: bindGroup,
    type: "draw",
  };
  
  state.renderPasses.push(mainRenderPass);
}

const recordRenderPass = async function (state) {
  let { device, renderPassDescriptor } = state;

  renderPassDescriptor.colorAttachments[0].view = state.context
    .getCurrentTexture()
    .createView();

  const commandEncoder = state.commandEncoder || device.createCommandEncoder();
  let _ = state.renderPasses[0]
  if (! _) return console.log('no worky')

  if (state.options?.uniforms?.modelViewProjectionMatrix) {
  const transformationMatrix = state.options.uniforms.modelViewProjectionMatrix()
  device.queue.writeBuffer(
    state.uniformBuffer,
    0,
    transformationMatrix.buffer,
    transformationMatrix.byteOffset,
    transformationMatrix.byteLength
  );
  }
  
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
  delete state.commandEncoder
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
  state.cubeVertices = verticesBuffer

  let pipelineDesc = {
    layout: "auto",
    vertex: {
      module: device.createShaderModule({
        code: state?.options?.shader?.code || state.options.vert,
      }),
      entryPoint: state?.options?.shader?.vertEntryPoint || "main",
      buffers: [
        {
          arrayStride: 4 * 10, //inspect array vertices and say 10 elements per array * 4 bytes
          attributes: [
            {
              // position
              shaderLocation: 0,
              offset: 0, 
              format: 'float32x4',
            },
            {
              // uv
              shaderLocation: 1,
              offset: 4 * 8,
              format: 'float32x2',
            },
          ],
        },
      ],
    },
    fragment: {
      module: device.createShaderModule({
        code: state?.options?.shader?.code || state.options.frag,
      }),
      entryPoint: state?.options?.shader?.fragEntryPoint || "main",
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
    },
  };

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
  });

  //TODO Construct dynamically
  const uniformBufferSize = 4 * 16; // 4x4 matrix
  const uniformBuffer = device.createBuffer({
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });
  state.uniformBuffer = uniformBuffer

  state.bindGroupDescriptor = state.options.bindGroupDescriptor || {
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: { buffer: uniformBuffer },
      },
    ],
  };

 if (state.options?.uniforms?.texture) {
  state.bindGroupDescriptor.entries.push(
    {
      binding: 1,
      resource: await state.options.uniforms.texture,
    },
    {
      binding: 2,
      resource: (await state.options.uniforms.texture).texture.createView(),
    },
  )}
  return pipeline;
}
async function compile(state, options) {
  let shaderCode = state.options.shader
  state.pipeline = await makePipeline(state);
  createRenderPasses(state, options);
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
    canvas,
  };

  utils.addMouseEvents(canvas, state.data);

  if (! navigator.gpu) return console.log('Error: webgpu is not available. Please install canary!!!')

  const context = canvas.getContext("webgpu");
  const adapter = (await navigator.gpu.requestAdapter());
  const device = (await adapter?.requestDevice());
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

  //TODO: delete state and assign stuff to context with _ for private var like d3 to leave backdoor
  Object.assign(state, {
    device,
    context,
    adapter,
  });

  context.configure({
    device,
    format: presentationFormat,
    alphaMode: "opaque",
  });

  function draw(newScope) {
    if (Array.isArray(newScope)) return newScope.map((scope) => draw(scope))
    recordRenderPass(state);
    return draw;
  }

  draw.canvas = canvas
  draw.prop = prop
  draw.buffer = buffer
  draw.initDrawCall = initDrawCall
  draw.state = state
  draw.draw = draw

  async function texture(img) {
    const sampler = device.createSampler({
      magFilter: "linear",
      minFilter: "linear",
      mipmapFilter: "nearest",
    });

    const texture = await makeTexture(device, img)



    return {
      data: img,
      texture: texture.texture,
      sampler,
      width: texture.width, 
      height: texture.height,
      imageBitmap: texture.imageBitmap
    }
  }

  return {
    initDrawCall, 
    buffer, 
    prop,
    clear,
    frame,
    initComputeCall,
    device, 
    context,
    texture,
  }

  function compute(options) {
    execComputePass(options)
  }

function initComputeCall(options) {
  createComputePass(options, state)
  
  return compute
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
export default init; 

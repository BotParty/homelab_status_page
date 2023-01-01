var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop2 in b || (b = {}))
    if (__hasOwnProp.call(b, prop2))
      __defNormalProp(a, prop2, b[prop2]);
  if (__getOwnPropSymbols)
    for (var prop2 of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop2))
        __defNormalProp(a, prop2, b[prop2]);
    }
  return a;
};
const createBuffer = (device, arr, usage) => {
  let desc = {
    size: arr.byteLength + 3 & ~3,
    usage,
    mappedAtCreation: true
  };
  let buffer2 = device.createBuffer(desc);
  arr[5] = Date.now();
  const writeArray = arr instanceof Uint16Array ? new Uint16Array(buffer2.getMappedRange()) : new Float32Array(buffer2.getMappedRange());
  writeArray.set(arr);
  buffer2.unmap();
  return buffer2;
};
const addMouseEvents = function(canvas, data) {
  canvas.addEventListener("mousemove", (event) => {
    let x = event.pageX;
    let y = event.pageY;
    data.mouseX = x / event.target.clientWidth;
    data.mouseY = y / event.target.clientHeight;
  });
};
function createCanvas(width = 500, height = 500) {
  let dpi = devicePixelRatio;
  var canvas = document.createElement("canvas");
  canvas.width = dpi * width;
  canvas.height = dpi * height;
  canvas.style.width = width + "px";
  document.body.appendChild(canvas);
  return canvas;
}
var utils = {
  createBuffer,
  createCanvas,
  addMouseEvents
};
async function updateTexture(state2) {
  let { device } = state2;
  if (!state2.options.uniforms.texture)
    return console.log("no texture bound");
  const imageBitmap = await createImageBitmap(state2.options.uniforms.texture);
  let cubeTexture = device.createTexture({
    size: [imageBitmap.width, imageBitmap.height, 1],
    format: "rgba8unorm",
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
  });
  device.queue.copyExternalImageToTexture({ source: imageBitmap }, { texture: cubeTexture }, [imageBitmap.width, imageBitmap.height]);
  return cubeTexture;
}
function updateUniforms(state2, modelViewProjectionMatrix = new Float32Array(16)) {
  let { data, device } = state2;
  Object.values(data).filter((val) => typeof val !== "object");
  let uniformsArray = new Float32Array(16);
  uniformsArray.set(modelViewProjectionMatrix, 0);
  if (state2.uniformsBuffer) {
    device.queue.writeBuffer(state2.uniformsBuffer, 0, uniformsArray.buffer, 0, 28);
    return state2.uniformsBuffer;
  } else {
    return state2.uniformsBuffer = utils.createBuffer(device, uniformsArray, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);
  }
}
function createRenderPasses(state2) {
  var _a;
  let {
    particleBuffers,
    computeVertexBufferData,
    device
  } = state2;
  const bindGroup = device.createBindGroup(state2.bindGroupDescriptor);
  const mainRenderPass = {
    renderPassDescriptor: state2.renderPassDescriptor,
    texture: state2.texture,
    pipeline: state2.pipeline,
    bindGroup,
    type: "draw"
  };
  if ((_a = state2 == null ? void 0 : state2.compute) == null ? void 0 : _a.numVertices)
    mainRenderPass.numVertices = state2.compute.numVertices();
  if (state2.compute && particleBuffers)
    mainRenderPass.vertexBuffers = [
      particleBuffers[0],
      computeVertexBufferData
    ];
  state2.renderPasses.push(mainRenderPass);
}
const recordRenderPass = async function(state2) {
  let { device, renderPassDescriptor } = state2;
  renderPassDescriptor.colorAttachments[0].view = state2.context.getCurrentTexture().createView();
  const commandEncoder = device.createCommandEncoder();
  let _ = state2.renderPasses[0];
  if (!_)
    return console.log("no worky");
  if (state2.options.uniforms.modelViewProjectionMatrix) {
    const transformationMatrix = state2.options.uniforms.modelViewProjectionMatrix();
    device.queue.writeBuffer(state2.uniformBuffer, 0, transformationMatrix.buffer, transformationMatrix.byteOffset, transformationMatrix.byteLength);
  }
  let cubeVertexArray = new Float32Array(state2.options.attributes.position.array.flat());
  const verticesBuffer = device.createBuffer({
    size: cubeVertexArray.byteLength,
    usage: GPUBufferUsage.VERTEX,
    mappedAtCreation: true
  });
  new Float32Array(verticesBuffer.getMappedRange()).set(cubeVertexArray);
  verticesBuffer.unmap();
  let passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
  passEncoder.setPipeline(_.pipeline);
  passEncoder.setBindGroup(0, _.bindGroup);
  passEncoder.setVertexBuffer(0, verticesBuffer);
  passEncoder.draw(state2.options.count, 1, 0, 0);
  passEncoder.end();
  device.queue.submit([commandEncoder.finish()]);
};
async function makePipeline(state2) {
  let { device } = state2;
  const cubeVertexArray = new Float32Array(new Array(1e4).fill(5).map((_, i) => {
    let n = i / 1e3;
    if (i % 2 === 1)
      return n % 1;
    if (i % 2 === 0)
      return n / 10;
  }));
  const verticesBuffer = device.createBuffer({
    size: cubeVertexArray.byteLength,
    usage: GPUBufferUsage.VERTEX,
    mappedAtCreation: true
  });
  new Float32Array(verticesBuffer.getMappedRange()).set(cubeVertexArray);
  verticesBuffer.unmap();
  state2.cubeVertices = verticesBuffer;
  let pipelineDesc = {
    layout: "auto",
    vertex: {
      module: device.createShaderModule({
        code: state2.options.vert
      }),
      entryPoint: "main",
      buffers: [
        {
          arrayStride: 4 * 10,
          attributes: [
            {
              shaderLocation: 0,
              offset: 0,
              format: "float32x4"
            },
            {
              shaderLocation: 1,
              offset: 4 * 8,
              format: "float32x2"
            }
          ]
        }
      ]
    },
    fragment: {
      module: device.createShaderModule({
        code: state2.options.frag
      }),
      entryPoint: "main",
      targets: [{ format: "bgra8unorm" }]
    },
    primitive: {
      topology: "triangle-list",
      cullMode: "back"
    },
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: "less",
      format: "depth24plus"
    }
  };
  if (state2.compute) {
    applyCompute(pipeline.vertexBuffers);
  }
  device.createSampler({
    magFilter: "linear",
    minFilter: "linear",
    mipmapFilter: "nearest"
  });
  updateUniforms(state2);
  const depthTexture = device.createTexture({
    size: [500 * devicePixelRatio, 500 * devicePixelRatio],
    format: "depth24plus",
    usage: GPUTextureUsage.RENDER_ATTACHMENT
  });
  const renderPassDescriptor = {
    colorAttachments: [
      {
        view: void 0,
        clearValue: { r: 0.5, g: 0.5, b: 0.5, a: 1 },
        loadOp: "clear",
        storeOp: "store"
      }
    ],
    depthStencilAttachment: {
      view: depthTexture.createView(),
      depthClearValue: 1,
      depthLoadOp: "clear",
      depthStoreOp: "store"
    }
  };
  state2.renderPassDescriptor = renderPassDescriptor;
  let pipeline = device.createRenderPipeline(__spreadValues({}, pipelineDesc));
  const uniformBufferSize = 4 * 16;
  const uniformBuffer = device.createBuffer({
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });
  state2.uniformBuffer = uniformBuffer;
  await updateTexture(state2);
  state2.bindGroupDescriptor = {
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: { buffer: uniformBuffer }
      }
    ]
  };
  return pipeline;
}
async function compile(state2, options) {
  state2.options.shader;
  state2.pipeline = await makePipeline(state2);
  createRenderPasses(state2);
}
let defaultData = {
  width: innerWidth,
  height: innerHeight,
  pixelRatio: 2,
  time: 0,
  mouseX: 0,
  mouseY: 0,
  angle: 0
};
async function init(options = {}) {
  let canvas = options.canvas || utils.createCanvas();
  const state2 = {
    renderPassDescriptor: {},
    options,
    data: Object.assign(defaultData, options.data),
    compute: options.compute,
    renderPasses: []
  };
  utils.addMouseEvents(canvas, state2.data);
  if (!navigator.gpu)
    return console.log("Error: webgpu is not available. Please install canary!!!");
  const context = canvas.getContext("webgpu");
  const adapter = await navigator.gpu.requestAdapter();
  const device = await (adapter == null ? void 0 : adapter.requestDevice());
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
  Object.assign(state2, {
    device,
    context,
    adapter
  });
  context.configure({
    device,
    format: presentationFormat,
    alphaMode: "opaque"
  });
  function draw(newScope) {
    if (Array.isArray(newScope))
      return newScope.map((scope) => draw(scope));
    updateUniforms(state2, state2.options.uniforms.modelViewProjectionMatrix());
    recordRenderPass(state2);
    return draw;
  }
  draw.canvas = canvas;
  draw.prop = prop;
  draw.buffer = buffer;
  draw.initDrawCall = initDrawCall;
  draw.state = state2;
  draw.draw = draw;
  return {
    initDrawCall,
    buffer,
    prop,
    clear,
    frame,
    version: "0.17.0"
  };
  function frame(cb) {
    requestAnimationFrame(function anon() {
      cb();
      requestAnimationFrame(anon);
    });
  }
  async function initDrawCall(options2) {
    state2.options = options2;
    await compile(state2, state2.options);
    return draw;
  }
}
function clear(options) {
  state.clearValue.r = options.color[0];
  state.clearValue.g = options.color[1];
  state.clearValue.b = options.color[2];
}
function buffer(array) {
  if (!(this instanceof buffer))
    return new buffer(array);
  this.array = array;
}
function prop(name) {
  return () => {
    let context = {
      viewportWidth: 500,
      viewportHeight: 500,
      tick: Performance.now()
    };
    typeof state.uniforms[name] === "function" ? state.uniforms[name](context) : state.uniforms[name];
    return state.uniforms[name];
  };
}
var main = { init, version: "0.17.0" };
export { main as default };

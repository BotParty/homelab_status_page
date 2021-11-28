const createBuffer = (gpuDevice, arr, usage) => {
  let desc = {
    size: arr.byteLength + 3 & ~3,
    usage,
    mappedAtCreation: true
  };
  let buffer = gpuDevice.createBuffer(desc);
  arr[5] = Date.now();
  const writeArray = arr instanceof Uint16Array ? new Uint16Array(buffer.getMappedRange()) : new Float32Array(buffer.getMappedRange());
  writeArray.set(arr);
  buffer.unmap();
  return buffer;
};
function createCanvas(width = 960, height = 500) {
  let dpi = devicePixelRatio;
  var canvas = document.createElement("canvas");
  canvas.width = dpi * width;
  canvas.height = dpi * height;
  canvas.style.width = width + "px";
  document.body.appendChild(canvas);
  return canvas;
}
function addMouseEvents(canvas) {
  return canvas;
}
var utils = {
  createBuffer,
  createCanvas,
  addMouseEvents
};
var defaultShader = "let size = 4.0;\n\n    let b = 0.3;		//size of the smoothed border\n\n    fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {\n      let aspect = iResolution.x/iResolution.y;\n      let position = (fragCoord.xy) * aspect;\n      let dist = distance(position, vec2<f32>(aspect*0.5, 0.5));\n      let offset=u.time * 000.0001;\n      let conv=4.;\n      let v=dist*4.-offset;\n      let ringr=floor(v);\n      \n      var stuff = 0.;\n      if (v % 3. > .5) {\n        stuff = 0.;\n      }\n\n	var color=smoothStep(-b, b, abs(dist- (ringr+stuff+offset)/conv));\n      if (ringr % 2. ==1.) {\n       color=2.-color;\n      }\n\n    let distToMouseX = distance(u.mouseX, fragCoord.x);\n    let distToMouseY = distance(u.mouseY, fragCoord.y);\n\n    return vec4<f32>(\n      distToMouseX, \n      color, \n      color, \n      1.\n      );\n  };\n\n  fn main(uv: vec2<f32>) -> vec4<f32> {\n    let fragCoord = vec2<f32>(uv.x, uv.y);\n    var base = vec4<f32>(cos(u.time * .000001), .5, sin(u.time * 0.000001), 1.);\n    let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));\n    return mainImage(fragCoord, vec2<f32>(u.width, u.height));\n  }\n\n  [[stage(fragment)]]\n  fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {\n    return main(in.uv) - vec4<f32>(.8);\n  }\n  ";
const attribs = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);
const recordRenderPass = async function(stuff) {
  let {
    attribsBuffer,
    context,
    gpuDevice,
    pipeline,
    uniformsBuffer,
    renderPassDescriptor
  } = stuff;
  const commandEncoder = gpuDevice.createCommandEncoder();
  const textureView = context.getCurrentTexture().createView();
  renderPassDescriptor.colorAttachments[0].view = textureView;
  let passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
  passEncoder.setPipeline(pipeline);
  const bindGroup = gpuDevice.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: { buffer: uniformsBuffer } }]
  });
  passEncoder.setBindGroup(0, bindGroup);
  passEncoder.setVertexBuffer(0, attribsBuffer);
  passEncoder.draw(3 * 2, 1, 0, 0);
  passEncoder.endPass();
  gpuDevice.queue.submit([commandEncoder.finish()]);
};
function updateUniforms(stuff) {
  let {
    data,
    gpuDevice
  } = stuff;
  let values = Object.values(data);
  let uniformsArray = new Float32Array(values.length);
  uniformsArray.set(values, 0);
  stuff.uniformsBuffer = utils.createBuffer(gpuDevice, uniformsArray, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);
}
function makePipeline(shader, gpuDevice) {
  let pipelineDesc = {
    vertex: {
      module: shader,
      entryPoint: "main_vertex",
      buffers: [{
        arrayStride: Float32Array.BYTES_PER_ELEMENT * 2,
        attributes: [{ offset: 0, shaderLocation: 0, format: "float32x2" }]
      }]
    },
    fragment: {
      module: shader,
      entryPoint: "main_fragment",
      targets: [{ format: "bgra8unorm" }]
    },
    primitives: { topology: "triangle-list" }
  };
  return gpuDevice.createRenderPipeline(pipelineDesc);
}
function makeShaderModule(gpuDevice, data, source) {
  if (!source)
    source = defaultShader;
  validateData(data);
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
  ${source}`;
  return gpuDevice.createShaderModule({ code });
}
let defaultData = {
  width: 900,
  height: 500,
  pixelRatio: 2,
  time: 0,
  mouseX: 0,
  mouseY: 0,
  angle: 0
};
function validateData(data) {
  if (typeof data.width !== "number")
    throw new Error("bad data!!");
}
async function init(options) {
  let canvas = options.canvas || utils.createCanvas();
  const state = {
    renderPassDescriptor: {},
    attribsBuffer: {},
    data: Object.assign(defaultData, options.data)
  };
  const context = canvas.getContext("webgpu");
  const adapter = await navigator.gpu.requestAdapter();
  const gpuDevice = await (adapter == null ? void 0 : adapter.requestDevice());
  const presentationFormat = context.getPreferredFormat(adapter);
  const presentationSize = [
    canvas.width * devicePixelRatio,
    canvas.height * devicePixelRatio
  ];
  Object.assign(state, {
    gpuDevice,
    context,
    adapter
  });
  context.configure({
    device: gpuDevice,
    format: presentationFormat,
    size: presentationSize
  });
  let shader = makeShaderModule(gpuDevice, state.data, options.shader);
  const pipeline = makePipeline(shader, gpuDevice);
  const textureView = context.getCurrentTexture().createView();
  const renderPassDescriptor = {
    colorAttachments: [
      {
        view: textureView,
        loadValue: { r: 0, g: 0, b: 0, a: 1 },
        storeOp: "store"
      }
    ]
  };
  state.renderPassDescriptor = renderPassDescriptor;
  Object.assign(state, {
    textureView,
    renderPassDescriptor,
    pipeline
  });
  state.attribsBuffer = utils.createBuffer(gpuDevice, attribs, GPUBufferUsage.VERTEX);
  function draw(newData) {
    Object.assign(state.data, newData);
    updateUniforms(state);
    recordRenderPass(state);
    return draw;
  }
  draw.canvas = canvas;
  return draw;
}
export { init };

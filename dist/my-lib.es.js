let defaultShader = `//This is rings
let size = 4.0;

    let b = 0.3;		//size of the smoothed border

    fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {
      let aspect = iResolution.x/iResolution.y;
      let position = (fragCoord.xy) * aspect;
      let dist = distance(position, vec2<f32>(aspect*0.5, 0.5));
      let offset=u.time * 000.0001;
      let conv=4.;
      let v=dist*4.-offset;
      let ringr=floor(v);
      
      var stuff = 0.;
      if (v % 3. > .5) {
        stuff = 0.;
      }

	var color=smoothStep(-b, b, abs(dist- (ringr+stuff+offset)/conv));
      if (ringr % 2. ==1.) {
       color=2.-color;
      }

    let distToMouseX = distance(u.mouseX, fragCoord.x);
    let distToMouseY = distance(u.mouseY, fragCoord.y);

    return vec4<f32>(
      distToMouseX, 
      color, 
      color, 
      1.
      );
  };

  fn main(uv: vec2<f32>) -> vec4<f32> {
    let fragCoord = vec2<f32>(uv.x, uv.y);
    var base = vec4<f32>(cos(u.time * .000001), .5, sin(u.time * 0.000001), 1.);
    let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));
    return mainImage(fragCoord, vec2<f32>(u.width, u.height));
  }

  [[stage(fragment)]]
  fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
    return main(in.uv) - vec4<f32>(.8);
  }
  
  `;
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
let utils = { createBuffer, createCanvas };
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
async function init(options) {
  const stuff = {
    renderPassDescriptor: {},
    attribsBuffer: {},
    data: options.data || {},
    canvas: options.canvas || utils.createCanvas(),
    state: {}
  };
  const context = stuff.canvas.value || stuff.canvas.getContext("webgpu");
  const adapter = await navigator.gpu.requestAdapter();
  const gpuDevice = await (adapter == null ? void 0 : adapter.requestDevice());
  const presentationFormat = context.getPreferredFormat(adapter);
  const presentationSize = [
    stuff.canvas.width * devicePixelRatio,
    stuff.canvas.height * devicePixelRatio
  ];
  Object.assign(stuff, {
    gpuDevice,
    context,
    adapter
  });
  context.configure({
    device: gpuDevice,
    format: presentationFormat,
    size: presentationSize
  });
  let shader = makeShaderModule(gpuDevice, stuff.data, options.shader);
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
  stuff.renderPassDescriptor = renderPassDescriptor;
  Object.assign(stuff, {
    textureView,
    renderPassDescriptor,
    pipeline
  });
  stuff.attribsBuffer = utils.createBuffer(gpuDevice, attribs, GPUBufferUsage.VERTEX);
  function draw(data) {
    Object.assign(stuff.data, data);
    updateUniforms(stuff);
    recordRenderPass(stuff);
    return draw;
  }
  draw.canvas = stuff.canvas;
  return draw;
}
export { init };

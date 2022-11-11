const createBuffer = (device, arr, usage) => {
  let desc = {
    size: arr.byteLength + 3 & ~3,
    usage,
    mappedAtCreation: true
  };
  let buffer = device.createBuffer(desc);
  arr[5] = Date.now();
  const writeArray = arr instanceof Uint16Array ? new Uint16Array(buffer.getMappedRange()) : new Float32Array(buffer.getMappedRange());
  writeArray.set(arr);
  buffer.unmap();
  return buffer;
};
function createCanvas(width = innerWidth, height = innerHeight) {
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
  createCanvas
};
var defaultShader = "// let size = 4.0;\n\n// let b = 0.3;		//size of the smoothed border\n\n//     fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {\n//       let aspect = iResolution.x/iResolution.y;\n//       let position = (fragCoord.xy) * aspect;\n//       let dist = distance(position, vec2<f32>(aspect*0.5, 0.5));\n//       let offset=u.time * 000.0001;\n//       let conv=4.;\n//       let v=dist*4.-offset;\n//       let ringr=floor(v);\n      \n//       var stuff = 0.;\n//       if (v % 3. > .5) {\n//         stuff = 0.;\n//       }\n\n// 	var color=smoothStep(-b, b, abs(dist- (ringr+stuff+offset)/conv));\n//       if (ringr % 2. ==1.) {\n//        color=2.-color;\n//       }\n\n//     let distToMouseX = distance(u.mouseX, fragCoord.x);\n//     let distToMouseY = distance(u.mouseY, fragCoord.y);\n\n//     return vec4<f32>(\n//       distToMouseX, \n//       color, \n//       color, \n//       1.\n//       );\n//   };\n\n//   fn main(uv: vec2<f32>) -> vec4<f32> {\n//     let fragCoord = vec2<f32>(uv.x, uv.y);\n//     var base = vec4<f32>(cos(u.time * .000001), .5, sin(u.time * 0.000001), 1.);\n//     let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));\n//     return mainImage(fragCoord, vec2<f32>(u.width, u.height));\n//   }\n\n@fragment\n  fn main_fragment(in: VertexOutput) -> @location(0) vec4<f32> {\n    return vec4<f32>(.8);\n  }\n  ";
let makeCompute = (state) => {
  let { device } = state;
  const vertexBufferData = new Float32Array([
    -0.01,
    -0.02,
    0.01,
    -0.02,
    0,
    0.02
  ]);
  const spriteVertexBuffer = device.createBuffer({
    size: vertexBufferData.byteLength,
    usage: GPUBufferUsage.VERTEX,
    mappedAtCreation: true
  });
  new Float32Array(spriteVertexBuffer.getMappedRange()).set(vertexBufferData);
  spriteVertexBuffer.unmap();
  const simParams = {
    deltaT: 0.04,
    rule1Distance: 0.1,
    rule2Distance: 0.025,
    rule3Distance: 0.025,
    rule1Scale: 0.02,
    rule2Scale: 0.05,
    rule3Scale: 5e-3
  };
  const particleBuffers = new Array(2);
  const particleBindGroups = new Array(2);
  for (let i = 0; i < 2; ++i) {
    particleBuffers[i] = device.createBuffer({
      size: state.compute.buffers.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE,
      mappedAtCreation: true
    });
    new Float32Array(particleBuffers[i].getMappedRange()).set(
      state.compute.buffers
    );
    particleBuffers[i].unmap();
  }
  const simParamBufferSize = 7 * Float32Array.BYTES_PER_ELEMENT;
  state.simParamBuffer = device.createBuffer({
    size: simParamBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });
  const computePipeline = device.createComputePipeline({
    compute: {
      module: device.createShaderModule({
        code: state.compute.cs
      }),
      entryPoint: "main_vertex"
    }
  });
  device.queue.writeBuffer(
    state.simParamBuffer,
    0,
    new Float32Array([
      simParams.deltaT,
      simParams.rule1Distance,
      simParams.rule2Distance,
      simParams.rule3Distance,
      simParams.rule1Scale,
      simParams.rule2Scale,
      simParams.rule3Scale
    ])
  );
  for (let i = 0; i < 2; ++i) {
    particleBindGroups[i] = device.createBindGroup({
      layout: computePipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: {
            buffer: state.simParamBuffer
          }
        },
        {
          binding: 1,
          resource: {
            buffer: particleBuffers[i],
            offset: 0,
            size: state.compute.buffers.byteLength
          }
        },
        {
          binding: 2,
          resource: {
            buffer: particleBuffers[(i + 1) % 2],
            offset: 0,
            size: state.compute.buffers.byteLength
          }
        }
      ]
    });
  }
  Object.assign(state, {
    computePipeline,
    particleBindGroups,
    particleBuffers,
    spriteVertexBuffer
  });
};
let hasMadeCompute = false;
async function makeTexture(state) {
  let cubeTexture = state.device.createTexture({
    size: [256, 1, 1],
    format: "rgba8unorm",
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
  });
  let music = new Float32Array(
    new Array(800).fill(5).map(
      (d, i) => state.data.texture ? state.data.texture[i % state.data.texture.length + d] : Math.random()
    )
  );
  state.cubeTexture = cubeTexture;
  state.data.music = music;
  state.cubeTexture = cubeTexture;
  updateTexture(state);
  return cubeTexture;
}
let t = 0;
function updateTexture(state) {
  let data = new Uint8Array(
    new Array(1024).fill(5).map(
      (d, i) => {
        console.log(d);
        return state.data.texture ? state.data.texture[i % state.data.texture.length] : Math.random();
      }
    )
  );
  state.device.queue.writeTexture(
    { texture: state.cubeTexture },
    data.buffer,
    {
      bytesPerRow: 3200,
      rowsPerImage: 600
    },
    [256, 1]
  );
}
function createRenderPasses(state) {
  if (!hasMadeCompute && state.compute) {
    hasMadeCompute = true;
    makeCompute(state);
  }
  let {
    computePipeline,
    particleBindGroups,
    particleBuffers,
    spriteVertexBuffer,
    device
  } = state;
  const bindGroup = device.createBindGroup(state.bindGroupDescriptor);
  state.renderPasses = [];
  if (state.compute)
    state.renderPasses.push({
      pipeline: computePipeline,
      bindGroup: particleBindGroups,
      dispatchWorkGroups: Math.ceil(state.compute.buffers.length / 64),
      type: "compute"
    });
  const mainRenderPass = {
    renderPassDescriptor: state.renderPassDescriptor,
    texture: state.texture,
    pipeline: state.pipeline,
    bindGroup,
    type: "draw"
  };
  if (state.compute)
    mainRenderPass.numVertices = state.compute.buffers.length / 4;
  if (state.compute)
    mainRenderPass.vertexBuffers = [particleBuffers[0], spriteVertexBuffer];
  state.renderPasses.push(mainRenderPass);
}
const recordRenderPass = async function(state) {
  let { device, renderPassDescriptor } = state;
  renderPassDescriptor.colorAttachments[0].view = state.context.getCurrentTexture().createView();
  const commandEncoder = device.createCommandEncoder();
  state.renderPasses.forEach(function render(_) {
    let isCompute = _.type === "compute";
    let passEncoder = isCompute ? commandEncoder.beginComputePass() : commandEncoder.beginRenderPass(renderPassDescriptor);
    if (_.texture)
      updateTexture(_);
    passEncoder.setPipeline(_.pipeline);
    passEncoder.setBindGroup(0, Array.isArray(_.bindGroup) ? _.bindGroup[t % 2] : _.bindGroup);
    if (_.vertexBuffers)
      _.vertexBuffers.forEach(function(vertexBuffer, i) {
        passEncoder.setVertexBuffer(i, vertexBuffer);
      });
    if (_.numVertices)
      passEncoder.draw(3, _.numVertices, 0, 0);
    else
      !isCompute && _.type === passEncoder.draw(3 * 2, 1, 0, 0);
    if (_.dispatchWorkGroups)
      passEncoder.dispatchWorkgroups(_.dispatchWorkGroups);
    passEncoder.end();
  });
  device.queue.submit([commandEncoder.finish()]);
  t++;
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
      28
    );
    return state.uniformsBuffer;
  } else {
    return state.uniformsBuffer = utils.createBuffer(
      device,
      uniformsArray,
      GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    );
  }
}
async function makePipeline(state) {
  var _a;
  let { device } = state;
  let pipelineDesc = {
    layout: "auto",
    vertex: {
      module: ((_a = state == null ? void 0 : state.shader) == null ? void 0 : _a.vs) || state.shader,
      entryPoint: "main_vertex",
      buffers: []
    },
    fragment: {
      module: state.shader,
      entryPoint: "main_fragment",
      targets: [{ format: "bgra8unorm" }]
    },
    primitive: {
      topology: "triangle-list"
    }
  };
  if (state.compute) {
    pipelineDesc.vertex.buffers.push(
      {
        arrayStride: 4 * 4,
        stepMode: "instance",
        attributes: [
          {
            shaderLocation: 0,
            offset: 0,
            format: "float32x2"
          },
          {
            shaderLocation: 1,
            offset: 2 * 4,
            format: "float32x2"
          }
        ]
      },
      {
        arrayStride: 2 * 4,
        stepMode: "vertex",
        attributes: [
          {
            shaderLocation: 2,
            offset: 0,
            format: "float32x2"
          }
        ]
      }
    );
  }
  const sampler = device.createSampler({
    magFilter: "linear",
    minFilter: "linear",
    mipmapFilter: "nearest"
  });
  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.COMPUTE,
        buffer: {
          type: "uniform",
          minBindingSize: 4 * 7
        }
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.COMPUTE,
        type: "sampler",
        sampler
      },
      {
        binding: 2,
        visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.COMPUTE,
        texture: {}
      }
    ]
  });
  const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout]
  });
  state.bindGroupLayout = bindGroupLayout;
  updateUniforms(state);
  const renderPassDescriptor = {
    colorAttachments: [
      {
        view: void 0,
        clearValue: { r: 0.5, g: 0.5, b: 0.5, a: 1 },
        loadOp: "clear",
        storeOp: "store"
      }
    ]
  };
  state.renderPassDescriptor = renderPassDescriptor;
  let pipeline = device.createRenderPipeline({
    ...pipelineDesc,
    layout: pipelineLayout
  });
  let cubeTexture = await makeTexture(state);
  state.bindGroupDescriptor = {
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: { buffer: state.uniformsBuffer }
      },
      {
        binding: 1,
        resource: sampler
      },
      {
        binding: 2,
        resource: cubeTexture.createView({
          baseMipLevel: 0,
          mipLevelCount: 1
        }),
        texture: {
          sampleType: "float",
          viewDimension: "2d",
          multisampled: 0
        }
      }
    ]
  };
  state.bindGroupDescriptor.entries[0].resource.buffer = updateUniforms(state);
  state.bindGroupDescriptor.entries[2].resource = state.cubeTexture.createView({
    baseMipLevel: 0,
    mipLevelCount: 1
  });
  return pipeline;
}
function makeShaderModule(state, source) {
  const { device, data } = state;
  if (!source)
    source = defaultShader;
  validateData(data);
  const uniforms = Object.keys(data).filter((name) => typeof data[name] === "number").map((name) => `${name}: f32,`).join("\n");
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
    const pos = array(
      vec2( 1.0,  1.0),
      vec2( 1.0, -1.0),
      vec2(-1.0, -1.0),
      vec2( 1.0,  1.0),
      vec2(-1.0, -1.0),
      vec2(-1.0,  1.0),
    );
  
    const uv = array(
      vec2(1.0, 0.0),
      vec2(1.0, 1.0),
      vec2(0.0, 1.0),
      vec2(1.0, 0.0),
      vec2(0.0, 1.0),
      vec2(0.0, 0.0),
    );


    
    var output : VertexOutput;
    output.Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
    output.fragUV = uv[VertexIndex];
    output.fragPosition = (output.Position + vec4<f32>(1.0, 1.0, 1.0, 1.0));
    output.fragPosition.g = 1.5 - output.fragPosition.g;
    return output;
  }
  ${source}`;
  console.log(123123);
  console.log(code);
  return state.compute ? device.createShaderModule({ code: state.compute.vs + state.compute.fs }) : device.createShaderModule({ code });
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
function validateData(data) {
  if (typeof data.width !== "number")
    throw new Error("bad data!!");
}
const addMouseEvents = function(canvas, data) {
  canvas.addEventListener("mousemove", (event) => {
    let x = event.pageX;
    let y = event.pageY;
    data.mouseX = x / event.target.clientWidth;
    data.mouseY = y / event.target.clientHeight;
  });
};
async function init(options) {
  let canvas = options.canvas || utils.createCanvas();
  const state = {
    renderPassDescriptor: {},
    data: Object.assign(defaultData, options.data),
    compute: options.compute,
    renderPasses: []
  };
  addMouseEvents(canvas, state.data);
  const context = canvas.getContext("webgpu");
  const adapter = await navigator.gpu.requestAdapter();
  const device = await (adapter == null ? void 0 : adapter.requestDevice());
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
  Object.assign(state, {
    device,
    context,
    adapter
  });
  context.configure({
    device,
    format: presentationFormat,
    alphaMode: "opaque",
    usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
  });
  state.shader = makeShaderModule(state, options.shader);
  state.pipeline = await makePipeline(state);
  createRenderPasses(state);
  function draw(newData) {
    newData.time = performance.now();
    updateTexture(state);
    Object.assign(state.data, newData);
    updateUniforms(state);
    recordRenderPass(state);
    return draw;
  }
  draw.canvas = canvas;
  return draw;
}
init.version = "0.6.0";
export { init };

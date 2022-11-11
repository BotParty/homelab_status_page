// import { scaleLinear } from "d3-scale";
import utils from "./utils";
// @ts-ignore
import defaultShader from "./default.wgsl?raw";

let makeCompute = (state) => {
  let { device } = state;

  // prettier-ignore
  const vertexBufferData = new Float32Array([
      -0.01, -0.02, 0.01,
      -0.02, 0.0, 0.02,
    ]);

  const spriteVertexBuffer = device.createBuffer({
    size: vertexBufferData.byteLength,
    usage: GPUBufferUsage.VERTEX,
    mappedAtCreation: true,
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
    rule3Scale: 0.005,
  };

  const particleBuffers: GPUBuffer[] = new Array(2);
  const particleBindGroups: GPUBindGroup[] = new Array(2);
  for (let i = 0; i < 2; ++i) {
    particleBuffers[i] = device.createBuffer({
      size: state.compute.buffers.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE,
      mappedAtCreation: true,
    });
    new Float32Array(particleBuffers[i].getMappedRange()).set(
      state.compute.buffers
    );
    particleBuffers[i].unmap();
  }

  const simParamBufferSize = 7 * Float32Array.BYTES_PER_ELEMENT;
  state.simParamBuffer = device.createBuffer({
    size: simParamBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const computePipeline = device.createComputePipeline({
    // layout: device.createPipelineLayout({
    //   bindGroupLayouts: [state.bindGroupLayout]
    // }),
    compute: {
      module: device.createShaderModule({
        code: state.compute.cs,
      }),
      entryPoint: "main_vertex",
    },
  });
  
  // const simParamBufferSize = 7 * Float32Array.BYTES_PER_ELEMENT;
  // const simParamBuffer = device.createBuffer({
  //   size: simParamBufferSize,
  //   usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  // });

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
      simParams.rule3Scale,
    ])
  );


  for (let i = 0; i < 2; ++i) {
    particleBindGroups[i] = device.createBindGroup({
      layout: computePipeline.getBindGroupLayout(0),
      entries: [ 
        // {
        //   binding: 0,
        //   resource: { buffer: state.uniformsBuffer },
        // },
        {
          binding: 0,
          resource: {
            buffer: state.simParamBuffer, //particlePos //rename to make generic
          },
        },
        {
          binding: 1,
          resource: {
            buffer: particleBuffers[i],//paricleVel //rename to make generic
            offset: 0,
            size: state.compute.buffers.byteLength,
          },
        },
        {
          binding: 2,
          resource: {
            buffer: particleBuffers[(i + 1) % 2], //a_pos
            offset: 0,
            size: state.compute.buffers.byteLength,
          },
        },
    
      ],
    });
  }

  Object.assign(state, {
    computePipeline,
    particleBindGroups,
    particleBuffers,
    spriteVertexBuffer,
  });
};

let hasMadeCompute = false;
let makeImgTexture = async (state) => {
  const img = document.createElement("img");
  const source = img;
  source.width = innerWidth;
  source.height = innerHeight;
  //console.log(state.data.texture);
  //console.log(img)
  img.src = state.data.texture
  console.log(img.src);

  await img.decode();

  return await createImageBitmap(img);
};

async function makeTexture(state) {
  let cubeTexture = state.device.createTexture({
    size: [256, 1, 1],
    format: "rgba8unorm",
    usage:
      GPUTextureUsage.TEXTURE_BINDING |
      GPUTextureUsage.COPY_DST |
      GPUTextureUsage.RENDER_ATTACHMENT,
  });
  let imageBitmap = await makeImgTexture(state);

  let music = new Float32Array(
    new Array(800)
      .fill(5)
      .map((d, i) =>
        state.data.texture
          ? state.data.texture[i % state.data.texture.length]
          : Math.random()
      )
  );
  
  

  state.cubeTexture = cubeTexture;
  state.data.music = music;
 
  state.cubeTexture = cubeTexture;
  let data = new Uint8Array(new Array(256).fill(5).map((d, i) => i / 25));

  updateTexture(state);
  return cubeTexture;
}
let t = 0;

function updateTexture(state) {
  let data = new Uint8Array(
    new Array(1024)
      .fill(5)
      .map((d, i) =>
        state.data.texture
          ? state.data.texture[i % state.data.texture.length]
          : Math.random()
      )
  );

  state.device.queue.writeTexture(
    { texture: state.cubeTexture },
    data.buffer,
    {
      bytesPerRow: 3200,
      rowsPerImage: 600,
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
    device, 
  } = state;
  // if (! stuff.renderBundle)
  //   passEncoder = device.createRenderBundleEncoder({
  //     colorFormats: ['rgb10a2unorm']
  //   }
  const bindGroup = device.createBindGroup(state.bindGroupDescriptor);

  state.renderPasses = []
  if (state.compute) state.renderPasses.push(  {
    pipeline: computePipeline,
    bindGroup: particleBindGroups,
    dispatchWorkGroups: Math.ceil(state.compute.buffers.length / 64),
    type: "compute",
  },)

  const mainRenderPass =  {
    renderPassDescriptor: state.renderPassDescriptor,
    texture: state.texture,
    pipeline: state.pipeline,
    bindGroup: bindGroup,
    type: "draw",
  }
  if (state.compute) mainRenderPass.numVertices =  state.compute.buffers.length / 4
  if (state.compute) mainRenderPass.vertexBuffers = [particleBuffers[0], spriteVertexBuffer]
  state.renderPasses.push(mainRenderPass)

}

const recordRenderPass = async function (state: any) {
  let { vertexBuffer, device, pipeline, renderPassDescriptor } = state;

  renderPassDescriptor.colorAttachments[0].view = state.context
    .getCurrentTexture()
    .createView();

  const commandEncoder = device.createCommandEncoder();

  state.renderPasses.forEach(function render(_) {
    let isCompute = _.type === "compute"

    let passEncoder =isCompute
      
        ? commandEncoder.beginComputePass()
        : commandEncoder.beginRenderPass(renderPassDescriptor);

        if (_.texture) updateTexture(_);

    passEncoder.setPipeline(_.pipeline);

    passEncoder.setBindGroup(0, Array.isArray(_.bindGroup) ? _.bindGroup[t % 2] : _.bindGroup);

    if (_.vertexBuffers)
      _.vertexBuffers.forEach(function (vertexBuffer, i) {
        passEncoder.setVertexBuffer(i, vertexBuffer);
      });
    if (_.numVertices) passEncoder.draw(3, _.numVertices, 0, 0);
    else ! isCompute && _.type===passEncoder.draw(3 * 2, 1, 0, 0);
    if (_.dispatchWorkGroups)
      passEncoder.dispatchWorkgroups(_.dispatchWorkGroups);
    
    passEncoder.end();
  });

  device.queue.submit([commandEncoder.finish()]); //async
  t++
};
function updateUniforms(state: any) {
  let { data, device } = state;

  let values: any = Object.values(data).filter(
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
    return (state.uniformsBuffer = utils.createBuffer(
      device,
      uniformsArray,
      GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    ));
  }
}
async function makePipeline(state) {
  let { device } = state;

  let pipelineDesc = {
    layout: "auto",
    vertex: {
      module: state?.shader?.vs || state.shader,
      entryPoint: "main_vertex",
      buffers: [],
    },
    fragment: {
      module: state.shader,
      entryPoint: "main_fragment",
      targets: [{ format: "bgra8unorm" }],
    },

    primitive: {
      topology: "triangle-list",
    },
  } as GPURenderPipelineDescriptor;

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
        clearValue: { r: .5, g: 0.5, b: 0.5, a: 1.0 },
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

  // let bindGroupLayout = device.createBindGroupLayout({
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
  //       visibility: GPUShaderStage.FRAGMENT,
  //       type: "sampler",
  //       sampler,
  //     },
  //     {
  //       binding: 2,
  //       visibility: GPUShaderStage.FRAGMENT,
  //       texture: {},
  //     },
      
  //   ],
  // });

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

function makeShaderModule(state, source: any) {
  const { device, data } = state;
  if (!source) source = defaultShader;
  validateData(data);

  const uniforms = Object.keys(data)
    .filter((name) => typeof data[name] === "number")
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
console.log(code)
  return state.compute
    ? device.createShaderModule({ code: state.compute.vs + state.compute.fs })
    : device.createShaderModule({ code });
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
    data: Object.assign(defaultData, options.data), //user data
    compute: options.compute, //user data
    renderPasses: [], //internal state
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

  state.shader = makeShaderModule(state, options.shader);

  state.pipeline = await makePipeline(state);
  createRenderPasses(state)
  function draw(newData: any) {
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

init.version = '0.6.0';
export { init, version };

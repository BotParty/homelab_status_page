const attribs = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);

async function init(options) {
  const stuff = {
    data: options.data,
    canvas: options.canvas || createCanvas(),
    state: {}, //passed from frame to frame-comment line 229
  };
  stuff.video = options.video;
  console.log(options)
  const context = stuff.canvas.value || stuff.canvas.getContext("webgpu");
  const adapter = await navigator.gpu.requestAdapter();
  const gpuDevice = await adapter.requestDevice();
  const presentationFormat = context.getPreferredFormat(adapter);
  const presentationSize = [
    stuff.canvas.width * devicePixelRatio,
    stuff.canvas.height * devicePixelRatio,
  ];
  Object.assign(stuff, {
    gpuDevice,
    context,
    adapter, //gpuAdapter
  });

  context.configure({
    device: gpuDevice,
    format: presentationFormat,
    size: presentationSize,
  });
  let shader = makeShaderModule(gpuDevice, data, options.shader);
  // Object.assign(stuff, {
  //   renderPassDescriptor,
  //   pipeline,
  //   uniformsBuffer,
  //   attribsBuffer,
  // });
  //let videoBindGroupDescriptor = makeVideoBindGroupDescriptor(stuff);

  // Object.assign(stuff, {
  //   videoBindGroupDescriptor: videoBindGroupDescriptor.videoBindGroupEntries,
  //   videoBindGroupDescriptor: videoBindGroupDescriptor.sampler,
  // });

  const pipeline = makePipeline(
    shader,
    gpuDevice
    //dataTexturesBindGroupLayout
  );

  const textureView = context.getCurrentTexture().createView();
  const renderPassDescriptor = {
    colorAttachments: [
      {
        view: textureView,
        loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        storeOp: "store",
      },
    ],
  };
  stuff.renderPassDescriptor = renderPassDescriptor;
  Object.assign(stuff, {
    textureView,
    renderPassDescriptor,
    pipeline,
    // uniformsBuffer,
    // attribsBuffer,
  });


  stuff.attribsBuffer = createBuffer(gpuDevice, attribs, GPUBufferUsage.VERTEX);
  function draw(state) {
    let uniformsBuffer = updateUniforms(stuff);
    stuff.uniformsBuffer = uniformsBuffer;
    recordRenderPass(stuff).finally(() => {});
    return state;
  }

  return {
    draw,
    canvas: stuff.canvas,
    updateUniforms: function (data) {
      stuff.data = data;
      updateUniforms(stuff);
    },
  };
}


let default_source = `
    let size = 3.0;
    let b = 0.003;		//size of the smoothed border
    fn mainImage(fragCoord: vec2<f32>, iResolution: vec2<f32>) -> vec4<f32> {
      let aspect = iResolution.x/iResolution.y;
      let position = (fragCoord.xy/iResolution.xy) * aspect;
      let dist = distance(position, vec2<f32>(aspect*0.5, 0.5));
      let offset=u.time;
      let conv=4.;
      let v=dist*4.-offset;
      let ringr=floor(v);
      //let color=smoothstep(-b, b, abs(dist- (ringr+float(fract(v)>0.5)+offset)/conv));
      //let color=smoothstep(-b, b, abs(dist- (ringr+((v)>0.5)+offset)/conv));
      var color = b;
      if (ringr % 2. ==1.) {
       color=2.-color;
      }
    return vec4<f32>(.5, color, color, 1.);
  };


  fn main(uv: vec2<f32>) -> vec4<f32> {
    let fragCoord = vec2<f32>(uv.x, uv.y);
    var base = vec4<f32>(cos(u.time), .5, sin(u.time), 1.);
    let dist = distance( fragCoord, vec2<f32>(u.mouseX,  u.mouseY));
    return vec4<f32>(.3, .3, sin(u.time), 1.) + mainImage(fragCoord, vec2<f32>(u.width, u.height));
  }

  [[stage(fragment)]]
  fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
    return main(in.uv);
  }
  `;
let data = {
  width: innerWidth, //based on canvas
  height: innerHeight, //based on canvas
  time: 0,
  mouseX: 0,
  mouseY: 0,
  angle: 0,
  //texture: (video)
};
const webGPUTextureFromImageUrl = async function (gpuDevice, url) {
  const response = await fetch(url);
  const blob = await response.blob();
  const imgBitmap = await createImageBitmap(blob);

  return webGPUTextureFromImageBitmapOrCanvas(gpuDevice, imgBitmap);
};

const recordRenderPass = async function (stuff) {
  let {
    attribsBuffer,
    context,
    gpuDevice,
    pipeline,
    uniformsBuffer,
    renderPassDescriptor,
  } = stuff;

  let videoResource = gpuDevice.importExternalTexture({
    source: stuff.video, //stuff.data.
  });
  
  const bindGroup = gpuDevice.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: stuff.sampler,
      },
      {
        binding: 1,
        resource: videoResource,
      },
    ],
  });
  const commandEncoder = gpuDevice.createCommandEncoder();
  const textureView = context.getCurrentTexture().createView();
  renderPassDescriptor.colorAttachments[0].view = textureView;
  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
  passEncoder.setPipeline(pipeline);
  passEncoder.setBindGroup(0, bindGroup);
  passEncoder.setVertexBuffer(0, attribsBuffer);
  passEncoder.draw(3 * 2, 1, 0, 0);
  passEncoder.endPass();
  gpuDevice.queue.submit([commandEncoder.finish()]); //async
};
function updateUniforms(stuff) {
  let {
    data,
    gpuDevice,
    uniformsBuffer,
    state,
    renderPassDescriptor,
    pipeline,
    attribsBuffer,
  } = stuff;
  let values = Object.values(data);
  let uniformsArray = new Float32Array(values.length);
  uniformsArray.set(values, 0, values.length);
  return createBuffer(
    gpuDevice,
    uniformsArray,
    GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  );
}
function makePipeline(shader, gpuDevice, dataTexturesBindGroupLayout) {
  // let pipeLineLayout = gpuDevice.createPipelineLayout({
  //   bindGroupLayouts: [dataTexturesBindGroupLayout],
  // });

  let pipelineDesc = {
    //layout: pipeLineLayout,
    vertex: {
      module: shader,
      entryPoint: "main_vertex",
      buffers: [
        {
          arrayStride: Float32Array.BYTES_PER_ELEMENT * 2,
          attributes: [
            {
              offset: 0,
              shaderLocation: 0,
              format: "float32x2",
            },
            // {
            //   shaderLocation: 1,
            //   offset: 12,
            //   format: 'float32x2',
            // }
          ],
        },
      ],
    },
    fragment: {
      module: shader,
      entryPoint: "main_fragment",
      targets: [{ format: "bgra8unorm" }],
    },
    primitives: {
      topology: "triangle-list",
    },
  };
  return gpuDevice.createRenderPipeline(pipelineDesc);
}

const createBuffer = (gpuDevice, arr, usage) => {
  let desc = {
    size: (arr.byteLength + 3) & ~3,
    usage,
    mappedAtCreation: true,
  };
  let buffer = gpuDevice.createBuffer(desc);
  const writeArray =
    arr instanceof Uint16Array
      ? new Uint16Array(buffer.getMappedRange())
      : new Float32Array(buffer.getMappedRange());
  writeArray.set(arr);
  buffer.unmap();
  return buffer;
};

function makeShaderModule(gpuDevice, data,shaderCode) {

  let source = shaderCode || default_source;
  const userland_Uniforms = Object.keys(data)
    .map((name) => `${name}: f32;`)
    .join("\n");

  const shader = gpuDevice.createShaderModule({
    code: `
  [[block]] struct Uniforms {
    ${userland_Uniforms}
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
  ${source}`,
  });
  return shader;
}
//generic functions above
//options type sig =
//{ canvas: optional,
//  data: [num | video | audio | 'trees.csv' | protocol.buffer | binary data |
//  canvasTag(2d/webgl) | promise
//]
//}
//copy regl's api w/o the inner stuff
//returns a {
//draw
//canvas
//}
// draw returns 223-226
//state contains any interstitial datums between gpgpu compute-layers
//may want to read texture-data back into js-land for ray-casting or saving or
//sending via http or w/e

function createCanvas (width=960, height=500, options={}) {
  let dpi = devicePixelRatio;
  var canvas = document.createElement("canvas");
  canvas.width = dpi * width;
  canvas.height = dpi * height;
  canvas.style.width = width + "px";
  document.body.appendChild(canvas)
  // canvas.value = regl;
  // canvas.__reglConfig = {dpi, reglOptions}
  return canvas;
}



export default { init };

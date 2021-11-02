(function main() {
  const recordRenderPass = async function (stuff) {
    let {
      gpuDevice,
      context,
      renderPassDescriptor,
      pipeline,
      uniformsBuffer,
      attribsBuffer,
    } = stuff;
    const commandEncoder = gpuDevice.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();
    renderPassDescriptor.colorAttachments[0].view = textureView;
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(pipeline);
    const bindGroup = gpuDevice.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: {
            buffer: uniformsBuffer,
          },
        },
      ],
    });
    //let videoBindGroup = missingStuff(stuff)
    passEncoder.setBindGroup(0, bindGroup);
    //passEncoder.setBindGroup(1, videoBindGroup);
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
      ctx,
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
  function makePipeline(shader, gpuDevice) {
    let pipelineDesc = {
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

  function makeShaderModule(gpuDevice, data, name, sources) {
    let source = `
    let size = 3.0;
  fn main(uv: vec2<f32>) -> vec4<f32> {
    var base = vec4<f32>(.5, .5, .9, 1.);
    let dist = distance( uv, vec2<f32>(u.mouseX, u.mouseY));
    if (uv.x < .1 ) { base.y = .1; }
    if (uv.x > .2 ) { base.y = .5; }
    if (uv.x > .3 ) { base.x = .5; }
    if (uv.x > .4 ) { base.z = .7; }
    if (uv.x > .5 ) { base.z = .9; }
    if (dist < .1) { base.x = .1; }
    return base;
  }

  [[stage(fragment)]]
  fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
    return main(in.uv);
  }
  `;
    const userland_Uniforms = Object.keys(data)
      .map((name) => `${name}: f32;`)
      .join("\n");

    const shader = gpuDevice.createShaderModule({
      code: `
      [[block]] struct Uniforms {
        ${userland_Uniforms}
      };

  [[group(0), binding(0)]] var<uniform> u: Uniforms;
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
  //userland code
  let canvas = document.createElement("canvas");
  let DOM = { canvas: canvas };
  const width = innerWidth,
    height = innerHeight;
  let data = {
    width: 900,
    height: 500,
    pixelRatio: 2,
    time: 0,
    mouseX: 0,
    mouseY: 0,
    angle: 0,
  };
  canvas.addEventListener("mousemove", function (e) {
    data.mouseX = e.clientX / innerWidth;
    data.mouseY = e.clientY / innerHeight;
  });
  //end userland

  async function init(stuff) {
    //bplate
    const context = canvas.value || canvas.getContext("webgpu");
    const adapter = await navigator.gpu.requestAdapter();
    const gpuDevice = await adapter.requestDevice();
    const presentationFormat = context.getPreferredFormat(adapter);
    const presentationSize = [
      canvas.clientWidth * devicePixelRatio,
      canvas.clientHeight * devicePixelRatio,
    ];
    context.configure({
      device: gpuDevice,
      format: presentationFormat,
      size: presentationSize,
    });

    let shader = makeShaderModule(gpuDevice, data, name);

    const pipeline = makePipeline(shader, gpuDevice);
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
    //
    const attribs = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);
    const attribsBuffer = createBuffer(
      gpuDevice,
      attribs,
      GPUBufferUsage.VERTEX
    );
    //wrap make attributes

    function draw(ctx) {
      let uniformsBuffer = updateUniforms({
        data: ctx.data,
        gpuDevice,
        context,
        renderPassDescriptor,
        pipeline,
        attribsBuffer,
      });

      recordRenderPass({
        gpuDevice,
        context,
        renderPassDescriptor,
        pipeline,
        uniformsBuffer,
        attribsBuffer,
      }).finally(() => {});
    }
    return draw;
  }
  async function run() {
    let copiedData = Object.assign({}, data);
    copiedData.time = performance.now();
    let options = { data: copiedData };
    let draw = await init(options);
    draw(options);
    //setInterval(draw, 100);
  }
  let isWithinWorkerScope = true;
  let host = window.location.host;
  if (host !== "localhost:3000") {
    run();
    return canvas;
  } else {
    requestAnimationFrame(async function () {
      let div = document.body;
      div.insertBefore(canvas, document.querySelector("img"));
      run();
    });
  }
}.call(this));

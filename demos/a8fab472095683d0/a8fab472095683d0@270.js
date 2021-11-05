export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# simple shader`
)});
  main.variable(observer()).define(["GPUBufferUsage","name"], function(GPUBufferUsage,name){return(
function main() {
  const recordRenderPass = async function(stuff) {
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
    }
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
    let values = Object.values(data)
    let uniformsArray = new Float32Array(values.length);
    uniformsArray.set(values, 0, values.length);
    return createBuffer(gpuDevice, uniformsArray, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);
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
    }
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
  //userland code.. move 
//end userland
  async function init(stuff) {//bplate
    const context = stuff.canvas.value || stuff.canvas.getContext("webgpu");
    const adapter = await navigator.gpu.requestAdapter();
    const gpuDevice = await adapter.requestDevice();
    const presentationFormat = context.getPreferredFormat(adapter);
    const presentationSize = [
      stuff.width * devicePixelRatio,
      stuff.height * devicePixelRatio,
    ];
    context.configure({
      device: gpuDevice,
      format: presentationFormat,
      size: presentationSize,
    });

    let shader = makeShaderModule(gpuDevice, data, name);
    
    const pipeline = makePipeline(shader, gpuDevice)
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
        data:ctx.data,
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


  
//userland
  let data = {
    width: 900,
    height: 500,
    pixelRatio: 2,
    time: 0,
    mouseX: 0, 
    mouseY: 0,
    angle: 0, 
    //texture: video 
  };
  function run() {
    const canvas = document.createElement("canvas");
    console.log(canvas);
  const width = 960, height = 500;
  canvas.addEventListener("mousemove", function (e) {
    data.mouseX = e.clientX / width;
    data.mouseY = e.clientY / height;
  });
    let copiedData = Object.assign({}, data);
    copiedData.time = performance.now();
    let stuff = {data: copiedData, canvas: canvas, width, height}
    init(stuff).then(draw => draw(stuff))
    //inbetween these two places ... do things that mutate the stuff 
    //setInterval(draw, 100);
    return canvas
  }
  
  let isWithinWorkerScope = true;
  let host = window.location.host;
  if (host !== "localhost:3000") {
    return run();
  } else {
    requestAnimationFrame(async function () {
      let canvas = run();
      document.body.insertBefore(canvas, document.querySelector("img"));
    });
  }
}.call(this)
)});
  main.variable(observer("viewof video")).define("viewof video", function()
{
  //let myVideo = html`<video id="my-video"  ></video>`
  const video = document.createElement('video');
  video.loop = true;
  //video.autoplay = true;
  video.muted = true;
  video.width="480";
  video.height="270";
  video.crossorigin="anonymous"
  video.controls="true"
  video.src = 'http://jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v'
  //http://jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm
  //await video.play();

  return video;
}
);
  main.variable(observer("video")).define("video", ["Generators", "viewof video"], (G, _) => G.input(_));
  main.variable(observer("missingStuff")).define("missingStuff", ["GPUDevice","video"], function(GPUDevice,video){return(
function missingStuff (stuff) {
  let {gpuDevice, pipeline} = stuff;
    const sampler = gpuDevice.createSampler({
    magFilter: 'linear',
    minFilter: 'linear',
  });
const uniformBindGroup = gpuDevice.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: sampler,
        },
        {
          binding: 1,
          resource: GPUDevice.importExternalTexture({
            source: video,
          }),
        },
      ],
    });
  return uniformBindGroup
  
}
)});
  main.variable(observer("webGPUTextureFromImageBitmapOrCanvas")).define("webGPUTextureFromImageBitmapOrCanvas", ["GPUTextureUsage"], function(GPUTextureUsage){return(
function webGPUTextureFromImageBitmapOrCanvas(gpuDevice, source) {
  const textureDescriptor = {
    // Unlike in WebGL, the size of our texture must be set at texture creation time.
    // This means we have to wait until the image is loaded to create the texture, since we won't
    // know the size until then.
    size: { width: source.width, height: source.height },
    format: 'rgba8unorm',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST
  };
  const texture = gpuDevice.createTexture(textureDescriptor);

  gpuDevice.queue.copyExternalImageToTexture({ source }, { texture }, textureDescriptor.size);

  return texture;
}
)});
  main.variable(observer("webGPUTextureFromImageUrl")).define("webGPUTextureFromImageUrl", ["createImageBitmap","webGPUTextureFromImageBitmapOrCanvas"], function(createImageBitmap,webGPUTextureFromImageBitmapOrCanvas){return(
async function webGPUTextureFromImageUrl(gpuDevice, url) { // Note that this is an async function
  const response = await fetch(url);
  const blob = await response.blob();
  const imgBitmap = await createImageBitmap(blob);


  return webGPUTextureFromImageBitmapOrCanvas(gpuDevice, imgBitmap);
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`https://www.google.com/search?q=carmack+data+texture+youtube&ei=84OBYfDxDaewqtsPtsGPsAw&oq=carmack+data+texture+youtube&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQzQI6BQghEKABOgcIIRAKEKABSgQIQRgAULgBWOwIYJIKaABwAHgAgAFsiAHuBJIBAzYuMZgBAKABAcABAQ&sclient=gws-wiz-serp&ved=0ahUKEwiwt5j9p_rzAhUnmGoFHbbgA8YQ4dUDCA8&uact=5`
)});
  return main;
}

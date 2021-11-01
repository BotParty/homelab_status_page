import "./style.css";
//make it so simple a 7 year old can understand it.
const width = 640,
  height = 480;

const data = {
  mouseX: 0,
  mouseY: 0,
  angle: 50
};
//uniformsArray
//(dimensions.xyz), (time, angle), (mouseX, mouseY)
//(0, 1, 2)         (2 , 3),  4 , (5, 6)
function updateUniforms(stuff) {
  let {
    uniformsArray,
    data,
    device,
    uniformsBuffer,
    ctx,
    renderPassDescriptor,
    pipeline,
    attribsBuffer
  } = stuff;

  uniformsArray.set(
    [
      performance.now() / 1000,
      data.angle + Math.random(),
      data.mouseX,
      data.mouseY
    ],
    3,
    6
  );
  uniformsBuffer = createBuffer(
    device,
    uniformsArray,
    GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  );
  return uniformsBuffer;
}

const createBuffer = (device, arr, usage) => {
  let desc = {
    size: (arr.byteLength + 3) & ~3,
    usage,
    mappedAtCreation: true
  };
  let buffer = device.createBuffer(desc);
  const writeArray =
    arr instanceof Uint16Array
      ? new Uint16Array(buffer.getMappedRange())
      : new Float32Array(buffer.getMappedRange());
  writeArray.set(arr);
  buffer.unmap();
  return buffer;
};

const canvas = document.querySelector("canvas");
canvas.addEventListener("mousemove", function(e) {
  data.mouseX = e.clientX / innerWidth;
  data.mouseY = e.clientY / innerHeight;
  //console.log("hi", data.mouseX, data.mouseY);
});
canvas.style = `max-width: 100%; width: ${width}px; height: auto;`;

function makeShaderModule(device, uniforms, name, sources, inputs) {
  let source = `
fn rotate2d(a: f32) -> mat2x2<f32> {
let c = cos(a);
let s = sin(a);
return mat2x2<f32>(
    vec2<f32>(c, -s),
    vec2<f32>(s, c)
);
}

let size = 15.0;

fn main(uv: vec2<f32>) -> vec4<f32> {
  var p = (uv - 0.5) * (u.resolution.xy) * rotate2d(u.angle);
  if (p.x < 0.0) {p.x = p.x - size;}
  if (p.y < 0.0) {p.y = p.y - size;}
  p = abs(p);
  let q = p.x % (size * 2.0) < size == p.y % (size * 2.0) < size;
  let o = f32(q);
  return vec4<f32>(o, o, o, 1.0);
}
`;

  const shader = device.createShaderModule({
    code: `
    [[block]] struct Uniforms {
    resolution: vec3<f32>;
     time: f32;
${Object.keys(uniforms)
      .map(name => `${name}: f32;`)
      .join("\n")}
${Object.keys(inputs)
      .map(name => `${name}: f32;`)
      .join("\n")}
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
var pos: vec2<f32> = input.pos * 2.0 - 1.0;
output.pos = vec4<f32>(pos, 0.0, 1.0);
output.uv = input.pos;
return output;
}

${[...sources].join("\n")}
${source}
[[stage(fragment)]]
fn main_fragment(in: VertexOutput) -> [[location(0)]] vec4<f32> {
let x = u.resolution; // need to use all inputs
return main(in.uv) + vec4<f32>(0., u.mouseX, u.mouseY, 0.);
}`
  });
  return shader;
}
async function init(stuff) {
  //top level
  let { uniforms = {}, inputs = {}, sources = [] } = stuff;
  const context = canvas.getContext("webgpu");
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();
  context.configure({
    device,
    format: "bgra8unorm"
  });

  let shader = makeShaderModule(device, uniforms, name, sources, inputs);

  const pipeline = device.createRenderPipeline({
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
              format: "float32x2"
            }
          ]
        }
      ]
    },
    fragment: {
      module: shader,
      entryPoint: "main_fragment",
      targets: [{ format: "bgra8unorm" }]
    },
    primitives: {
      topology: "triangle-list"
    }
  });
  const textureView = context.getCurrentTexture().createView();
  const renderPassDescriptor = {
    colorAttachments: [
      {
        view: textureView,
        loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        storeOp: "store"
      }
    ]
  };
  const attribs = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);
  const attribsBuffer = createBuffer(device, attribs, GPUBufferUsage.VERTEX);

  let uniformsArray = new Float32Array([
    width, // res.x
    height, // res.y
    window.devicePixelRatio, // res.z
    0, // time
    ...Object.values(uniforms),
    ...Array.from(Object.values(inputs), input => input.value)
  ]);

  async function recordRenderPass(stuff) {
    let {
      device,
      context,
      renderPassDescriptor,
      pipeline,
      uniformsBuffer,
      attribsBuffer
    } = stuff;
    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();
    renderPassDescriptor.colorAttachments[0].view = textureView;
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(pipeline);
    const bindGroup = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: {
            buffer: uniformsBuffer
          }
        }
      ]
    });

    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.setVertexBuffer(0, attribsBuffer);
    passEncoder.draw(3 * 2, 1, 0, 0);
    passEncoder.endPass();
    device.queue.submit([commandEncoder.finish()]); //async
  }

  function draw(ctx) {
    let uniformsBuffer = updateUniforms({
      //needs an upload spot
      uniformsArray,
      data,
      device,
      context,
      renderPassDescriptor,
      pipeline,
      attribsBuffer
    });

    recordRenderPass({
      device,
      context,
      renderPassDescriptor,
      pipeline,
      uniformsBuffer,
      attribsBuffer
    }).finally(() => {
      //console.log("drawn!");
    });
  }
  return draw; //one shot
}
async function dot() {
  let options = {
    uniforms: data
  };
  let draw = await init(options);
  setInterval(draw, 150);
}

dot();

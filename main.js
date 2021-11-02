import "./style.css";
//want fragCoord to do stuff with mouse
//otherwise fragment has no idea what it's distance to the cursor is at all.
//fragCoord is a vertex attribute not uniform
//could just add an array from 0-size of list
//and the vertex shader will naturally interpolate the data

//with 1 more thing, anyone can add anything in shadertoy
//mousePosition, fragPosition and

//(insert whatever uniforms desired here) (numbers only for now )
//texture data next (still numbers but more flexible than vertices because compute shaders can do stuff )

//scatter plot on map =

// complaint = (long / lat) :

//convert to NDC(-1,1) by using d3.geo to transform a
//quadrant of nyc to
//01          11
//  ...311...
//00          10

//make js script to
//convert 1e6 311 complaints to
//observable in a manner that it can be downloaded and repackaged on npm/hub for all

//
//quad of nyc = 4 (long lat)
//take sample of 1million complaints and
//tail -n=1e6 file_name

//accept the slight hindrance(mostly embaressment and slight shame cus choices),
//but mostly the awe-inspiring - power of the cosmos

//g rated thoughts
//either
//1. more closed ,less open
//2. slow down thought w/ i

const width = innerWidth,
  height = innerHeight;

const data = {
  mouseX: 0,
  mouseY: 0,
  angle: 0,
};
//
setInterval(function () {
  data.angle = (data.angle + 5) % 360;
}, 16);
//uniformsArray
//(dimensions.xyz), (time, angle), (mouseX, mouseY)
//(0,       1,  2)  (2,   3),      (5,          6)
function updateUniforms(stuff) {
  let {
    uniformsArray,
    data,
    device,
    uniformsBuffer,
    ctx,
    renderPassDescriptor,
    pipeline,
    attribsBuffer,
  } = stuff;

  uniformsArray.set(
    [performance.now() / 1000, data.angle, data.mouseX, data.mouseY],
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
    mappedAtCreation: true,
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
canvas.addEventListener("mousemove", function (e) {
  data.mouseX = e.clientX / innerWidth;
  data.mouseY = e.clientY / innerHeight;
});
canvas.style = `max-width: 100%; width: ${width}px; height: auto;`;

function makeShaderModule(device, uniforms, name, sources, inputs) {
  let source = `
let size = 3.0;

// fn mandelbrot(p: vec2<f32>) -> vec2<f32> {
//   let a: i32 = 2;
//   let b: f32 = 2.0;
// 	var z = vec4<f32>(0.0, 0.0);
// 	var c = vec4<f32>(p.xy * 2.0);
//   let MAX_ITERATIONS = 100;
//   let epsilon = 10.0;
// 	for (int i = 0; i < MAX_ITERATIONS; i++) {
// 		if (length(z) > epsilon) {
// 			return (float(i) / 50.0) + vec2<f32>(0.25);
// 		}
// 		z = vec2<f32>(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
// 	}
// 	return vec3<f32>(0.0, 0.0, 0.0);
// }

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
  let x = u.resolution;
  return main(in.uv);
}
`;
  const userland_Uniforms = Object.keys(uniforms)
    .map((name) => `${name}: f32;`)
    .join("\n");

  const input = Object.keys(inputs)
    .map((name) => `${name}: f32;`)
    .join("\n");

  const shader = device.createShaderModule({
    code: `
    [[block]] struct Uniforms {
      resolution: vec3<f32>;
      time: f32;
      ${userland_Uniforms}
      ${input}
    };

[[group(0), binding(0)]] var<uniform> u: Uniforms;

struct VertexInput {
[[location(0)]] pos: vec2<f32>;
};
//uv coordinates seem to be off...
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
${[...sources].join("\n")}
${source}
`,
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
    format: "bgra8unorm",
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
  });
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
  const attribs = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);
  const attribsBuffer = createBuffer(device, attribs, GPUBufferUsage.VERTEX);

  let uniformsArray = new Float32Array([
    width, // res.x
    height, // res.y
    window.devicePixelRatio, // res.z
    0, // time
    ...Object.values(uniforms),
    ...Array.from(Object.values(inputs), (input) => input.value),
  ]);

  async function recordRenderPass(stuff) {
    let {
      device,
      context,
      renderPassDescriptor,
      pipeline,
      uniformsBuffer,
      attribsBuffer,
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
            buffer: uniformsBuffer,
          },
        },
      ],
    });

    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.setVertexBuffer(0, attribsBuffer);
    passEncoder.draw(3 * 2, 1, 0, 0);
    passEncoder.endPass();
    device.queue.submit([commandEncoder.finish()]); //async
  }

  function draw(ctx) {
    let uniformsBuffer = updateUniforms({
      uniformsArray,
      data,
      device,
      context,
      renderPassDescriptor,
      pipeline,
      attribsBuffer,
    });

    recordRenderPass({
      device,
      context,
      renderPassDescriptor,
      pipeline,
      uniformsBuffer,
      attribsBuffer,
    }).finally(() => {});
  }
  return draw;
}
async function dot() {
  let options = {
    uniforms: data,
  };
  let draw = await init(options);
  setInterval(draw, 19);
}

dot();

import { mat4, vec3 } from 'gl-matrix';

const vertex = `struct Uniforms {
    modelViewProjectionMatrix : mat4x4<f32>,
  }
  @binding(0) @group(0) var<uniform> uniforms : Uniforms;
  
  struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) fragUV : vec2<f32>,
    @location(1) fragPosition: vec4<f32>,
  }
  
  @vertex
  fn main(
    @location(0) position : vec4<f32>,
    @location(1) uv : vec2<f32>
  ) -> VertexOutput {
    var output : VertexOutput;
    output.Position = uniforms.modelViewProjectionMatrix * position;
    output.fragUV = uv;
    output.fragPosition = 0.5 * (position + vec4(1.0, 1.0, 1.0, 1.0));
    return output;
  }
  `

  const fragment = `@fragment
  fn main(
    @location(0) fragUV: vec2<f32>,
    @location(1) fragPosition: vec4<f32>
  ) -> @location(0) vec4<f32> {
    return fragPosition;
  }
  `

 const cubeVertexSize = 4 * 10; // Byte size of one cube vertex.
 const cubePositionOffset = 0;
 const cubeColorOffset = 4 * 4; // Byte offset of cube vertex color attribute.
 const cubeUVOffset = 4 * 8;
 const cubeVertexCount = 36;

// prettier-ignore
 const cubeVertexArray = new Float32Array([
  // float4 position, float4 color, float2 uv,
  1, -1, 1, 1,   1, 0, 1, 1,  1, 1,
  -1, -1, 1, 1,  0, 0, 1, 1,  0, 1,
  -1, -1, -1, 1, 0, 0, 0, 1,  0, 0,
  1, -1, -1, 1,  1, 0, 0, 1,  1, 0,
  1, -1, 1, 1,   1, 0, 1, 1,  1, 1,
  -1, -1, -1, 1, 0, 0, 0, 1,  0, 0,

  1, 1, 1, 1,    1, 1, 1, 1,  1, 1,
  1, -1, 1, 1,   1, 0, 1, 1,  0, 1,
  1, -1, -1, 1,  1, 0, 0, 1,  0, 0,
  1, 1, -1, 1,   1, 1, 0, 1,  1, 0,
  1, 1, 1, 1,    1, 1, 1, 1,  1, 1,
  1, -1, -1, 1,  1, 0, 0, 1,  0, 0,

  -1, 1, 1, 1,   0, 1, 1, 1,  1, 1,
  1, 1, 1, 1,    1, 1, 1, 1,  0, 1,
  1, 1, -1, 1,   1, 1, 0, 1,  0, 0,
  -1, 1, -1, 1,  0, 1, 0, 1,  1, 0,
  -1, 1, 1, 1,   0, 1, 1, 1,  1, 1,
  1, 1, -1, 1,   1, 1, 0, 1,  0, 0,

  -1, -1, 1, 1,  0, 0, 1, 1,  1, 1,
  -1, 1, 1, 1,   0, 1, 1, 1,  0, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,
  -1, -1, -1, 1, 0, 0, 0, 1,  1, 0,
  -1, -1, 1, 1,  0, 0, 1, 1,  1, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,

  1, 1, 1, 1,    1, 1, 1, 1,  1, 1,
  -1, 1, 1, 1,   0, 1, 1, 1,  0, 1,
  -1, -1, 1, 1,  0, 0, 1, 1,  0, 0,
  -1, -1, 1, 1,  0, 0, 1, 1,  0, 0,
  1, -1, 1, 1,   1, 0, 1, 1,  1, 0,
  1, 1, 1, 1,    1, 1, 1, 1,  1, 1,

  1, -1, -1, 1,  1, 0, 0, 1,  1, 1,
  -1, -1, -1, 1, 0, 0, 0, 1,  0, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,
  1, 1, -1, 1,   1, 1, 0, 1,  1, 0,
  1, -1, -1, 1,  1, 0, 0, 1,  1, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,
]);

const cube = async ()=> {
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();
  
    const canvas = document.createElement('canvas')
    canvas.width = 500
    canvas.height = 500
    const context = canvas.getContext('webgpu');
    
    const devicePixelRatio = window.devicePixelRatio || 1;
    const presentationSize = [
      500,
      500,
    ];
 
    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
  
    context.configure({
      device,
      size: presentationSize,
      format: presentationFormat,
      alphaMode: 'opaque',
    });
  
    // Create a vertex buffer from the cube data.
    const verticesBuffer = device.createBuffer({
      size: cubeVertexArray.byteLength,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true,
    });
    new Float32Array(verticesBuffer.getMappedRange()).set(cubeVertexArray);
    verticesBuffer.unmap();
  
    const pipeline = device.createRenderPipeline({
      layout: 'auto',
      vertex: {
        module: device.createShaderModule({
          code: vertex,
        }),
        entryPoint: 'main',
        buffers: [
          {
            arrayStride: cubeVertexSize,
            attributes: [
              {
                // position
                shaderLocation: 0,
                offset: cubePositionOffset,
                format: 'float32x4',
              },
              {
                // uv
                shaderLocation: 1,
                offset: cubeUVOffset,
                format: 'float32x2',
              },
            ],
          },
        ],
      },
      fragment: {
        module: device.createShaderModule({
          code: fragment,
        }),
        entryPoint: 'main',
        targets: [
          {
            format: presentationFormat,
          },
        ],
      },
      primitive: {
        topology: 'triangle-list',
  
        // Backface culling since the cube is solid piece of geometry.
        // Faces pointing away from the camera will be occluded by faces
        // pointing toward the camera.
        cullMode: 'back',
      },
  
      // Enable depth testing so that the fragment closest to the camera
      // is rendered in front.
      depthStencil: {
        depthWriteEnabled: true,
        depthCompare: 'less',
        format: 'depth24plus',
      },
    });
  
    const depthTexture = device.createTexture({
      size: presentationSize,
      format: 'depth24plus',
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
  
    const matrixSize = 4 * 16; // 4x4 matrix
    const offset = 256; // uniformBindGroup offset must be 256-byte aligned
    const uniformBufferSize = offset + matrixSize;
  
    const uniformBuffer = device.createBuffer({
      size: uniformBufferSize,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
  
    const uniformBindGroup1 = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: {
            buffer: uniformBuffer,
            offset: 0,
            size: matrixSize,
          },
        },
      ],
    });
  
    const uniformBindGroup2 = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: {
            buffer: uniformBuffer,
            offset: offset,
            size: matrixSize,
          },
        },
      ],
    });
  
    const renderPassDescriptor = {
      colorAttachments: [
        {
          view: undefined, // Assigned later
  
          clearValue: { r: 0.5, g: 0.5, b: 0.5, a: 1.0 },
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
      depthStencilAttachment: {
        view: depthTexture.createView(),
  
        depthClearValue: 1.0,
        depthLoadOp: 'clear',
        depthStoreOp: 'store',
      },
    };
  
    const aspect = presentationSize[0] / presentationSize[1];
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, (2 * Math.PI) / 5, aspect, 1, 100.0);
  
    const modelMatrix1 = mat4.create();
    mat4.translate(modelMatrix1, modelMatrix1, vec3.fromValues(-2, 0, 0));
    const modelMatrix2 = mat4.create();
    mat4.translate(modelMatrix2, modelMatrix2, vec3.fromValues(2, 0, 0));
    const modelViewProjectionMatrix1 = mat4.create() ;
    const modelViewProjectionMatrix2 = mat4.create() ;
    const viewMatrix = mat4.create();
    mat4.translate(viewMatrix, viewMatrix, vec3.fromValues(0, 0, -7));
  
    const tmpMat41 = mat4.create();
    const tmpMat42 = mat4.create();
  
    function updateTransformationMatrix() {
      const now = Date.now() / 1000;
  
      mat4.rotate(
        tmpMat41,
        modelMatrix1,
        1,
        vec3.fromValues(Math.sin(now), Math.cos(now), 0)
      );
      mat4.rotate(
        tmpMat42,
        modelMatrix2,
        1,
        vec3.fromValues(Math.cos(now), Math.sin(now), 0)
      );
  
      mat4.multiply(modelViewProjectionMatrix1, viewMatrix, tmpMat41);
      mat4.multiply(
        modelViewProjectionMatrix1,
        projectionMatrix,
        modelViewProjectionMatrix1
      );
      mat4.multiply(modelViewProjectionMatrix2, viewMatrix, tmpMat42);
      mat4.multiply(
        modelViewProjectionMatrix2,
        projectionMatrix,
        modelViewProjectionMatrix2
      );
    }
  
    function frame() {  
      updateTransformationMatrix();
      device.queue.writeBuffer(
        uniformBuffer,
        0,
        modelViewProjectionMatrix1.buffer,
        modelViewProjectionMatrix1.byteOffset,
        modelViewProjectionMatrix1.byteLength
      );
      device.queue.writeBuffer(
        uniformBuffer,
        offset,
        modelViewProjectionMatrix2.buffer,
        modelViewProjectionMatrix2.byteOffset,
        modelViewProjectionMatrix2.byteLength
      );
  
      renderPassDescriptor.colorAttachments[0].view = context
        .getCurrentTexture()
        .createView();
  
      const commandEncoder = device.createCommandEncoder();
      const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
      passEncoder.setPipeline(pipeline);
      passEncoder.setVertexBuffer(0, verticesBuffer);
  
      // Bind the bind group (with the transformation matrix) for
      // each cube, and draw.
      passEncoder.setBindGroup(0, uniformBindGroup1);
      passEncoder.draw(cubeVertexCount, 1, 0, 0);
  
      passEncoder.setBindGroup(0, uniformBindGroup2);
      passEncoder.draw(cubeVertexCount, 1, 0, 0);
  
      passEncoder.end();
      device.queue.submit([commandEncoder.finish()]);
  
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    document.body.appendChild(canvas)
    console.log(123)
  };

  export default cube;
// let applyCompute = function (vertexBuffers) {
//   vertexBuffers.buffers.push(
//     {
//       // instanced particles buffer
//       arrayStride: 4 * 4,
//       stepMode: "instance",
//       attributes: [
//         {
//           // instance position
//           shaderLocation: 0,
//           offset: 0,
//           format: "float32x2",
//         },
//         {
//           // instance velocity
//           shaderLocation: 1,
//           offset: 2 * 4,
//           format: "float32x2",
//         },
//       ],
//     },
//     {
//       // vertex buffer
//       arrayStride: 2 * 4,
//       stepMode: "vertex",
//       attributes: [
//         {
//           // vertex positions
//           shaderLocation: 2,
//           offset: 0,
//           format: "float32x2",
//         },
//       ],
//     }
//   );
// }

// let makeCompute = (state) => {
//     let { device } = state;
  
//     if (state.compute.vertexBufferData) {
//       state.computeVertexBufferData = device.createBuffer({
//         size: state.compute.vertexBufferData.byteLength,
//         usage: GPUBufferUsage.VERTEX,
//         mappedAtCreation: true,
//       });
  
//       new Float32Array(state.computeVertexBufferData.getMappedRange()).set(
//         state.compute.vertexBufferData
//       );
//       state.computeVertexBufferData.unmap();
//     }
  
//     if (state.compute.buffers) {
//       state.particleBuffers = state.compute.buffers.map((userTypedArray) => {
//         let buffer = device.createBuffer({
//           size: userTypedArray.byteLength,
//           usage: GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE,
//           mappedAtCreation: true,
//         });
  
//         new Float32Array(buffer.getMappedRange()).set(userTypedArray);
//         buffer.unmap();
//         return buffer;
//       });
//     }
//     const simParamBufferSize = 7 * Float32Array.BYTES_PER_ELEMENT;
//     state.simParamBuffer = device.createBuffer({
//       size: simParamBufferSize,
//       usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
//     });
    
//   if (state.options.compute.simParams) {
//     const simParams = state.options.compute.simParams;
//     device.queue.writeBuffer(
//       state.simParamBuffer,
//       0,
//       new Float32Array(Object.values(simParams))
//     );
//   }
//     //@ts-ignore
//     if (state.compute.buffers) {
//       //console.log(12313)
//     }
//   };

  function makeComputePass(state) {
    let device = state.device;
    let shader = makeShaderModule(state, state.compute.cs);
    
      const computePipeline = state.device.createComputePipeline({
        compute: {
          module: state.device.createShaderModule({
            code: state.compute.shader,
          }),
          entryPoint: "main_vertex",
        },
      });
    if (state.compute.buffers) {
      state.particleBindGroups = state.compute.buffers.map(function (d, i) {
        return device.createBindGroup({
          layout: computePipeline.getBindGroupLayout(0),
          entries: [
            {
              binding: 0,
              resource: {
                buffer: state.simParamBuffer, //particlePos //rename to make generic
              },
            },
            {
              binding: 1,
              resource: {
                buffer: state.particleBuffers[i], //paricleVel //rename to make generic
                offset: 0,
                size: state.compute.buffers[0].byteLength,
              },
            },
            {
              binding: 2,
              resource: {
                buffer: state.particleBuffers[(i + 1) % 2], //a_pos
                offset: 0,
                size: state.compute.buffers[1].byteLength,
              },
            },
          ],
        });
      });
    }
    
  
  
      if (state.computeBindGroups?.length) {
        state.particleBindGroups.push(
          ...state.compute.bindGroups(state.device, computePipeline)
        );
      }
    
  
      return {
        pipeline: computePipeline,
        bindGroup: state.particleBindGroups,
        dispatchWorkGroups: state.compute.dispatchWorkGroups(),
        type: "compute",
      }
  
  }

  function createComputePass(options, state) {
    let device = state.device
  
    const pipeline = device.createComputePipeline({
      layout: 'auto',
      compute: {
        module: device.createShaderModule({
          code: options.code,
        }),
        entryPoint: 'main',
      },
    });
    
      const mainComputePass = {
        pipeline: pipeline,
        bindGroups: options.bindGroups(state, pipeline),
        workGroups: [
          [], []
        ]
      }
      state.computePass = mainComputePass
  }
  
  function execComputePass (state) {
    const device = state.device
    const tileDim = 128;
    const batch = [4,4]
    const settings = {
      filterSize: 15,
      iterations: 10
    }
    const [srcWidth, srcHeight] = [512, 512];
    const blockDim = tileDim - settings.filterSize;
  
    state.commandEncoder = state.commandEncoder || device.createCommandEncoder();
    const commandEncoder = state.commandEncoder
  
    const computePass = commandEncoder.beginComputePass();
    computePass.setPipeline(state.computePass.pipeline);
    computePass.setBindGroup(0, state.computePass.bindGroups[0]);
  
    computePass.setBindGroup(1, state.computePass.bindGroups[1]);
    computePass.dispatchWorkgroups(
      Math.ceil(srcWidth / blockDim),
      Math.ceil(srcHeight / batch[1])
    );
  
    computePass.setBindGroup(1, state.computePass.bindGroups[2]);
    computePass.dispatchWorkgroups(
      Math.ceil(srcHeight / blockDim),
      Math.ceil(srcWidth / batch[1])
    );
  
    for (let i = 0; i < settings.iterations - 1; ++i) {
      computePass.setBindGroup(1, state.computePass.bindGroups[3]);
      computePass.dispatchWorkgroups(
        Math.ceil(srcWidth / blockDim),
        Math.ceil(srcHeight / batch[1])
      );
  
      computePass.setBindGroup(1, state.computePass.bindGroups[2]);
      computePass.dispatchWorkgroups(
        Math.ceil(srcHeight / blockDim),
        Math.ceil(srcWidth / batch[1])
      );
    }
    computePass.end();
  }

  export  {
   execComputePass, createComputePass
  }
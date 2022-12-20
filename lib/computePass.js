let makeCompute = (state) => {
    let { device } = state;
  
    if (state.compute.vertexBufferData) {
      state.computeVertexBufferData = device.createBuffer({
        size: state.compute.vertexBufferData.byteLength,
        usage: GPUBufferUsage.VERTEX,
        mappedAtCreation: true,
      });
  
      new Float32Array(state.computeVertexBufferData.getMappedRange()).set(
        state.compute.vertexBufferData
      );
      state.computeVertexBufferData.unmap();
    }
  
    if (state.compute.buffers) {
      state.particleBuffers = state.compute.buffers.map((userTypedArray) => {
        let buffer = device.createBuffer({
          size: userTypedArray.byteLength,
          usage: GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE,
          mappedAtCreation: true,
        });
  
        new Float32Array(buffer.getMappedRange()).set(userTypedArray);
        buffer.unmap();
        return buffer;
      });
    }
    const simParamBufferSize = 7 * Float32Array.BYTES_PER_ELEMENT;
    state.simParamBuffer = device.createBuffer({
      size: simParamBufferSize,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    
  if (state.options.compute.simParams) {
    const simParams = state.options.compute.simParams;
    device.queue.writeBuffer(
      state.simParamBuffer,
      0,
      new Float32Array(Object.values(simParams))
    );
  }
    //@ts-ignore
    if (state.compute.buffers) {
      //console.log(12313)
    }
  };

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
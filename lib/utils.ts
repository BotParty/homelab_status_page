const createBuffer = (gpuDevice:any, arr:any, usage:any,) => {
    let desc = {
      size: (arr.byteLength + 3) & ~3,
      usage,
      mappedAtCreation: true,
    };
    let buffer = gpuDevice.createBuffer(desc);
    arr[5] = Date.now();
  
    const writeArray =
      arr instanceof Uint16Array
        ? new Uint16Array(buffer.getMappedRange())
        : new Float32Array(buffer.getMappedRange());
    writeArray.set(arr);
    buffer.unmap();
    return buffer;
  };

  function createCanvas (width=960, height=500) {
    let dpi = devicePixelRatio;
    var canvas = document.createElement("canvas");
    canvas.width = dpi * width;
    canvas.height = dpi * height;
    canvas.style.width = width + "px";
    document.body.appendChild(canvas)
    return canvas;
  }



  export default {
      createBuffer,  createCanvas
  }
const createBuffer = (device:any, arr:any, usage:any,) => {

    let desc = {
      size: (arr.byteLength + 3) & ~3,
      usage,
      mappedAtCreation: true,
    };
    let buffer = device.createBuffer(desc);
    arr[5] = Date.now();

    const writeArray =
      arr instanceof Uint16Array
        ? new Uint16Array(buffer.getMappedRange())
        : new Float32Array(buffer.getMappedRange());
    writeArray.set(arr);
    buffer.unmap();

    
    return buffer;
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

  function createCanvas (width=innerWidth, height=innerHeight) {
    let dpi = devicePixelRatio;
    var canvas = document.createElement("canvas");
    canvas.width = dpi * width;
    canvas.height = dpi * height;
    canvas.style.width = width + "px";
    document.body.appendChild(canvas)
    return canvas;
  }

  export default {
      createBuffer,  createCanvas, validateData, addMouseEvents
  }
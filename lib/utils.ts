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


function addMouseEvents(canvas:any) {

    return canvas
  // let scaleX = scaleLinear().domain([0, 1]).range([0, 0.3]);
  // let scaleY = scaleLinear().domain([1, 0]).range([0, 1]);
  // state.canvas.addEventListener("mousemove", function (e) {
  //   data.mouseX = scaleX(e.clientX / e.target.clientWidth);
  //   data.mouseY = scaleY(e.clientY / e.target.clientHeight);
  // });
}
  export default {
      createBuffer,  createCanvas, addMouseEvents
  }
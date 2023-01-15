const createBuffer = (device, arr, usage,) => {

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

  const addMouseEvents = function (canvas, data) {
    canvas.addEventListener("mousemove", (event) => {
      let x = event.pageX;
      let y = event.pageY;
      data.mouseX = x / event.target.clientWidth;
      data.mouseY = y / event.target.clientHeight;
    });
  };

  function createCanvas (width=500, height=500) {

  let dpi = devicePixelRatio;
    var canvas = document.createElement("canvas");
    canvas.width = dpi * width;
    canvas.height = dpi * height;
    canvas.style.width = width + "px";
    document.body.appendChild(canvas)
    return canvas;
  }

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => { 
      resolve() 
    }, ms)
  })
}


function isBuffer(buffer) {
  return buffer.__proto__.constructor.name === 'GPUBuffer'
}

function makeResource(resource) {
  return isBuffer(resource) ? {buffer: resource} : resource
}


function makeBindGroupDescriptor(layout, resourceList,offset=0) {
  return {
    layout,
    entries: resourceList.map((resource, i) => {
      return {
        binding:i+offset,
        resource: makeResource(resource)
      }
    })
  }
}

function makeConstantsBindGroup(resource1, resource2, buffer, layout) {
  const bg = {
    layout: layout,
    entries: [
      {
        binding: 0,
        resource: resource1,
      },
      {
        binding: 1,
        resource: {buffer: resource2},
      },

    ],}

    if (buffer) bg.entries.push({binding:3 , resource: {buffer }})
    return bg
}

function makeBindGroup(resource1, resource2, buffer, layout){
  return {
    layout: layout,
    entries: [
      {
        binding: 1,
        resource: resource1,
      },
      {
        binding: 2,
        resource: resource2,
      },
      {
        binding: 3,
        resource: {
          buffer: buffer,
        },
      },
    ],
  }
}

  export default {
      createBuffer,  createCanvas, addMouseEvents, makeConstantsBindGroup, makeBindGroup, makeBindGroupDescriptor
  }
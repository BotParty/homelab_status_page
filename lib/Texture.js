//MakeTexture
//htmlImageElement
//string
//array
let makeImgTexture = async (state) => {
  const img = document.createElement("img");
  const source = img;
  source.width = innerWidth;
  source.height = innerHeight;

  img.src = state.data.texture;

  await img.decode();

  return await createImageBitmap(img);
};

async function makeTexture(device, textureData) {
  if (HTMLImageElement === textureData.constructor) {
    let img =  textureData
    await img.decode();
    await createImageBitmap(img);
    let imageBitmap =  await createImageBitmap(img); 

    let texture = device.createTexture({
      size: [imageBitmap.width, imageBitmap.height, 1],
      format: "rgba8unorm",
      usage:
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT |
        GPUTextureUsage.STORAGE_BINDING,
    });
    device.queue.copyExternalImageToTexture(
      { source: imageBitmap },
      { texture: texture },
      [imageBitmap.width, imageBitmap.height]
    );
    //updateTexture(state);
    return {
      imageBitmap,
      texture, width: imageBitmap.width, height: imageBitmap.height};
  } else if ("string" === typeof state.data.texture) {
    let texture = state.device.createTexture({
      size: [900, 500, 1],
      format: "rgba8unorm",
      usage:
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT
        ,
    });

    let imageBitmap = await makeImgTexture(state);

    state.device.queue.copyExternalImageToTexture(
      { source: imageBitmap },
      { texture: texture },
      [imageBitmap.width, imageBitmap.height]
    );
    state.texture = texture;
    updateTexture(state);
    return texture;
  } else {
    let texture = state.device.createTexture({
      size: [256, 1, 1],
      format: "rgba8unorm",
      usage:
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT,
    });
    let music = new Float32Array(
      new Array(800)
        .fill(5)
        .map((d, i) =>
          state.data.texture
            ? state.data.texture[(i % state.data.texture.length) + d]
            : Math.random()
        )
    );

    state.texture = texture
    state.data.music = music;
    updateTexture(state);

    return texture;
  }
}

async function updateTexture(state) {
  let { device}  = state
  
   if (! state.options?.uniforms?.texture) 
     return console.log('no texture bound')
    // else console.log('hello world')
     const imageBitmap = await createImageBitmap(state.options.uniforms.texture);
     let cubeTexture = device.createTexture({
      size: [imageBitmap.width, imageBitmap.height, 1],
      format: 'rgba8unorm',
      usage:
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT,
    });
    
    device.queue.copyExternalImageToTexture(
      { source: imageBitmap },
      { texture: cubeTexture },
      [imageBitmap.width, imageBitmap.height]
    );
    return cubeTexture
  // if ((state.data.texture)) {
  // let data = new Uint8Array(
  //   //@ts-ignore
  //   new Array(1024).fill(5).map((d, i) => {
  //     return state.data.texture
  //       ? state.data.texture[i % state.data.texture.length]
  //       : Math.random();
  //   })
  //  );

  // state.device.queue.writeTexture(
  //   { texture: state.options.uniforms.texture },
  //   data.buffer,
  //   {
  //     bytesPerRow: 3200,
  //     rowsPerImage: 600,
  //   },
  //   [256, 1]
  // );
  // }
}

export {updateTexture, makeTexture}

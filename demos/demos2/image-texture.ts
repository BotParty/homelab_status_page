import { init } from "../../lib/main";
// import updateSpritesWGSL from "../shaders/updateSprites.wgsl?raw";
// import spriteWGSLFS from '../shaders/sprite_fs.wgsl?raw';
// import spriteWGSLVS from '../shaders/sprite_vs.wgsl?raw';

const options = {
    data: {
        texture: '../test.png'
    }
}

async function physics() {
  console.log('start draw loop')

  let draw = await init(options);
  draw(options); 

  requestAnimationFrame(function test() {
    draw(options);
      requestAnimationFrame(test)
      //setTimeout(test, 500)
  });
  }
  
  export default physics;
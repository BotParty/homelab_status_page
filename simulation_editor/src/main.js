import { loadGLTFModel } from './utils/gltf-loader.js';
import { Clock } from 'three';
import { initGraphics } from './initGraphics.js';
import { onWindowResize } from './onWindowResize.js';
import { initPhysics } from './initPhysics.js';
import { renderLoop } from './renderLoop.js';
import { setupExample } from './setupExample.js';
import { handleUserInput } from './utils/handleUserInput.js';
import initJolt from './utils/jolt-physics.wasm-compat.js';
import AudioVisualizer from './utils/play_karaoke.js';
import lyricDetector from './utils/lyricDetector.js';
import * as THREE from 'three';
import editScene from './utils/edit_scene.js';
new AudioVisualizer()


const size = { width: 900, height: 500 };
const container = document.getElementById('container');
const canvas = document.querySelector('canvas');
const { renderer, scene, camera, controls } = initGraphics(canvas, container, size);

const inputState = {
  forwardPressed: false,
  backwardPressed: false,
  leftPressed: false,
  rightPressed: false,
  jump: false,
  crouched: false
};
const clock = new Clock();

const onExampleUpdateRef = { fn: null };


initJolt().then(async (Jolt) => {
  await renderer.init();
  const { joltInterface, physicsSystem, bodyInterface } = initPhysics(Jolt);
  // // 3) Collect dynamic objects in array
  const dynamicObjects = [];
  // // 4) Set up your environment, spawn character, define onExampleUpdate
  setupExample(Jolt, bodyInterface, scene, dynamicObjects, onExampleUpdateRef);
  //editScene(scene);
  // // 6) Prepare user input
  handleUserInput(inputState);
  // // 7) Provide a custom update function that calls the function from onExampleUpdateRef
  function onExampleUpdate(time, deltaTime) {
    // If setupExample assigned a function, call it
    if (onExampleUpdateRef.fn) {
      onExampleUpdateRef.fn(time, deltaTime, inputState);
    }
  }


  // 8) Start render loop
  renderLoop(
    clock,
    onExampleUpdate,
    renderer,
    scene,
    camera,
    joltInterface,
    dynamicObjects,
    Jolt,
    controls,
    {}
  );
}); 










// const textureLoader = new THREE.TextureLoader();
// textureLoader.load( 'textures/hardwood2_diffuse.jpg', function ( map ) {

//   map.wrapS = THREE.RepeatWrapping;
//   map.wrapT = THREE.RepeatWrapping;
//   map.anisotropy = 16;
//   map.repeat.set( 4, 4 );
//   map.colorSpace = THREE.SRGBColorSpace;
//   groundMaterial.map = map;
//   groundMaterial.needsUpdate = true;

// } );


//lyricDetector()
//new AudioVisualizer()
  //editScene()

  import { renderHelmet } from './renderHelmet.js'
  renderHelmet()
import { Clock } from 'three';
import { initGraphics } from './initGraphics.js';
import { onWindowResize } from './onWindowResize.js';
import { initPhysics } from './initPhysics.js';
import { renderLoop } from './renderLoop.js';
import { setupExample } from './setupExample.js';
import { handleUserInput } from './handleUserInput.js';
import initJolt from './utils/jolt-physics.wasm-compat.js';
import AudioVisualizer from './play_karaoke.js';
import lyricDetector from './lyricDetector.js';

const size = { width: 900, height: 500 };
const container = document.getElementById('container');
const canvas = document.querySelector('canvas');
lyricDetector()
new AudioVisualizer()


import { loadGLTFModel } from './gltf-loader.js';

const { renderer, scene, camera, controls } = initGraphics(canvas, container, size);


loadGLTFModel('/static/mini_home.gltf')
    .then(gltf => {
        scene.add(gltf.scene);
    })
    .catch(error => {
        console.error(error);
    });

// We'll track our input in an object that the example can look at
const inputState = {
  forwardPressed: false,
  backwardPressed: false,
  leftPressed: false,
  rightPressed: false,
  jump: false,
  crouched: false
};


const clock = new Clock();

// A reference to your specialized onExampleUpdate function, which we’ll assign in setupExample:
const onExampleUpdateRef = { fn: null };

initJolt().then(async (Jolt) => {
  // 1) Graphics

  // IMPORTANT: Await initialization of WebGPURenderer:
  // This ensures that the renderer backend is ready before we start calling .render()
  await renderer.init();

  // 2) Physics
  const { joltInterface, physicsSystem, bodyInterface } = initPhysics(Jolt);

  // 3) Collect dynamic objects in array
  const dynamicObjects = [];

  // 4) Set up your environment, spawn character, define onExampleUpdate
  setupExample(Jolt, bodyInterface, scene, dynamicObjects, onExampleUpdateRef);

  // 5) Listen for window resize
  window.addEventListener('resize', () => onWindowResize(size, camera, renderer));

  // 6) Prepare user input
  handleUserInput(inputState);

  // 7) Provide a custom update function that calls the function from onExampleUpdateRef
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




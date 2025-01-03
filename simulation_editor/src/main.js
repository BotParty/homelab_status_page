import _ from 'underscore'


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
import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
// import { RectAreaLightTexturesLib } from 'three/addons/lights/RectAreaLightTexturesLib.js';

const size = { width: 900, height: 500 };
const container = document.getElementById('container');
const canvas = document.querySelector('canvas');
lyricDetector()
new AudioVisualizer()


import { loadGLTFModel } from './gltf-loader.js';

const { renderer, scene, camera, controls } = initGraphics(canvas, container, size);


// loadGLTFModel('/static/mini_home.gltf')
//     .then(gltf => {
//         scene.add(gltf.scene);
//     })
//     .catch(error => {
//         console.error(error);
//     });

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

  console.log(scene)


  editScene()

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






const editScene = _.once(function(){
  console.log('once');

  const sceneObjects = document.getElementById('scene-objects');
  sceneObjects.innerHTML = '';

  // Create a table
  const table = document.createElement('table');
  table.style.borderCollapse = 'collapse';

  // Table header row
  const headerTr = document.createElement('tr');
  const headerName = document.createElement('th');
  headerName.innerText = 'Object Name';
  headerName.style.border = '1px solid #ccc';
  const headerAction = document.createElement('th');
  headerAction.innerText = 'Action';
  headerAction.style.border = '1px solid #ccc';

  headerTr.appendChild(headerName);
  headerTr.appendChild(headerAction);
  table.appendChild(headerTr);

  // Create a row for each object in scene.children
  scene.children.forEach((obj, idx) => {
    const tr = document.createElement('tr');

    // Object name cell
    const nameTd = document.createElement('td');
    nameTd.innerText = obj.name || `Object_${idx}`;
    nameTd.style.border = '1px solid #ccc';
    nameTd.style.padding = '4px';

    // Highlight button cell
    const actionTd = document.createElement('td');
    actionTd.style.border = '1px solid #ccc';
    actionTd.style.padding = '4px';

    const highlightButton = document.createElement('button');
    highlightButton.innerText = 'Highlight';

    highlightButton.addEventListener('click', () => {
      // Check if this is a Mesh with a material we can change
      if (obj.isMesh && obj.material && obj.material.color) {
        // Store original color if not already stored
        if (!obj.userData.originalColor) {
          obj.userData.originalColor = obj.material.color.getHex();
        }

        // Toggle highlight (keep it simple)
        const currentColor = obj.material.color.getHex();
        const highlightColor = 0xffff00; // Yellow
        obj.material.color.setHex(
          currentColor === highlightColor
            ? obj.userData.originalColor
            : highlightColor
        );
      }
    });

    actionTd.appendChild(highlightButton);

    // Add cells to row
    tr.appendChild(nameTd);
    tr.appendChild(actionTd);

    // Add row to table
    table.appendChild(tr);
  });

  // Now put the table in the sceneObjects div
  sceneObjects.appendChild(table);

  // Keep a reference to scene on the window object
  window.scene = scene;
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



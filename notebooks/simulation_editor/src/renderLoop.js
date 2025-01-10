import * as THREE from 'three';
import { updatePhysics } from './updatePhysics.js';

/**
 * The main render loop that updates physics, animations, and renders the scene.
 * @param {THREE.Clock} clock 
 * @param {Function} onExampleUpdate - Custom update function. 
 * @param {THREE.Renderer} renderer 
 * @param {THREE.Scene} scene 
 * @param {THREE.Camera} camera 
 * @param {Object} joltInterface 
 * @param {Array} dynamicObjects - Array of objects with references to Jolt bodies.
 * @param {Object} Jolt - The Jolt object.
 * @param {OrbitControls} controls 
 * @param {Object} sharedState - (optional) an object that can hold any user data, e.g. time.
 */
export function renderLoop(
  clock,
  onExampleUpdate,
  renderer,
  scene,
  camera,
  joltInterface,
  dynamicObjects,
  Jolt,
  controls,
  sharedState
) {
  if (!sharedState.time) sharedState.time = 0;

  requestAnimationFrame(() => {
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
      sharedState
    );
  });

  let deltaTime = clock.getDelta();
  deltaTime = Math.min(deltaTime, 1.0 / 30.0);

  if (onExampleUpdate) {
    onExampleUpdate(sharedState.time, deltaTime);
  }

  // Update transforms for dynamic objects
  for (let obj of dynamicObjects) {
    const body = obj.userData.body;
    obj.position.set(body.GetPosition().GetX(), body.GetPosition().GetY(), body.GetPosition().GetZ());
    obj.quaternion.set(
      body.GetRotation().GetX(),
      body.GetRotation().GetY(),
      body.GetRotation().GetZ(),
      body.GetRotation().GetW()
    );
  }

  sharedState.time += deltaTime;

  // Step physics
  updatePhysics(joltInterface, deltaTime);

  // Update camera controls
  controls.update(deltaTime);

  // Render
  renderer.render(scene, camera);




  // scene.children[0].material = new THREE.MeshBasicMaterial({
  //   map: new THREE.TextureLoader().load('textures/hardwood2_diffuse.jpg')
  // });
  
  //.map.image.src = 'textures/hardwood2_diffuse.jpg';

} 
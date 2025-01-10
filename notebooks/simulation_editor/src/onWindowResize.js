/**
 * Handles window resizing by updating the camera aspect and renderer size.
 * @param {Object} size - { width, height } of the rendered area.
 * @param {THREE.Camera} camera - The camera to update.
 * @param {THREE.Renderer} renderer - The renderer to resize.
 */
export function onWindowResize(size, camera, renderer) {
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
} 
/**
 * Creates a box-shaped body and adds it to the scene.
 * @param {Object} Jolt - The Jolt object from jolt-physics.wasm-compat.
 * @param {Object} bodyInterface - The Jolt BodyInterface from initPhysics.js.
 * @param {Function} addToScene - The helper function that adds the body to the scene.
 * @param {Object} position - A Jolt.RVec3 for the box’s position.
 * @param {Object} rotation - A Jolt.Quat for the box’s rotation.
 * @param {Object} halfExtent - A Jolt.Vec3 with half-dimensions of the box.
 * @param {number} motionType - One of the Jolt.EMotionType_* constants (Static, Dynamic, etc.).
 * @param {number} layer - The collision layer (e.g., 0 for non-moving, 1 for moving).
 * @param {number} color - A hex color for the rendered box mesh.
 */
export function createBox(
  Jolt,
  bodyInterface,
  addToScene,
  position,
  rotation,
  halfExtent,
  motionType,
  layer,
  
) {
  const shape = new Jolt.BoxShape(halfExtent, 0.05, null);
  const creationSettings = new Jolt.BodyCreationSettings(
    shape,
    position,
    rotation,
    motionType,
    layer
  );
  const body = bodyInterface.CreateBody(creationSettings);
  Jolt.destroy(creationSettings);

  // Add to scene (using addToScene to create the Three.js mesh)
  const shit = addToScene(body, Jolt, bodyInterface);
  console.log('shit', shit)
  return body;
} 
/**
 * Adds a Jolt body to the physics system (activates it) and
 * then creates and adds the corresponding Three.js mesh to the scene.
 * @param {Object} body - The Jolt body
 * @param {number} color - Hex color
 * @param {Object} Jolt - The Jolt object
 * @param {Object} bodyInterface - The body interface
 * @param {THREE.Scene} scene
 * @param {Array} dynamicObjects - Array to which we'll push the new mesh
 * @param {Function} getThreeObjectForBody - A function to build a mesh from the shape
 */
export function addToScene(body, Jolt, bodyInterface, scene, dynamicObjects, getThreeObjectForBody) {
  bodyInterface.AddBody(body.GetID(), Jolt.EActivation_Activate);
  const threeObject = getThreeObjectForBody(body, Jolt);
  threeObject.userData.body = body;
  scene.add(threeObject);
  dynamicObjects.push(threeObject);
  //console.log('addToScene', threeObject)
  return threeObject
} 
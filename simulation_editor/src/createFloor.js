import * as THREE from 'three';
/**
 * Creates a static floor BoxShape body and adds it to the scene (with color).
 * @param {Object} Jolt - Jolt object
 * @param {Object} bodyInterface - The physics body interface
 * @param {Function} addToScene - A helper that adds the body to the Three.js scene
 * @param {number} size - Size of the square floor
 * @return {Object} - The created body
 */
export function createFloor(Jolt, bodyInterface, addToScene, size = 50) {
  const shape = new Jolt.BoxShape(new Jolt.Vec3(size, 0.5, size), 0.05, null);
  const creationSettings = new Jolt.BodyCreationSettings(
    shape,
    new Jolt.RVec3(0, -0.5, 0),
    new Jolt.Quat(0, 0, 0, 1),
    Jolt.EMotionType_Static,
    0 // LAYER_NON_MOVING
  );
  const body = bodyInterface.CreateBody(creationSettings);
  Jolt.destroy(creationSettings);

  const floor = addToScene(body, 0xff0000);


  console.log('floor', body)



//   const textureLoader = new THREE.TextureLoader();
// textureLoader.load( '/hardwood2_diffuse.jpg', function ( map ) {

//   map.wrapS = THREE.RepeatWrapping;
//   map.wrapT = THREE.RepeatWrapping;
//   map.anisotropy = 16;
//   map.repeat.set( 4, 4 );
//   map.colorSpace = THREE.SRGBColorSpace;
//   groundMaterial.map = map;
//   groundMaterial.needsUpdate = true;

// } );




  return body;
} 
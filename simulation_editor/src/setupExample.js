import { createFloor } from './createFloor.js';
import { createBox } from './createBox.js';
import { addToScene } from './addToScene.js';
import { getThreeObjectForBody } from './getThreeObjectForBody.js';

/**
 * Sets up your environment and character logic. Creates floors, walls, 
 * a simple “character” body, etc. Also provides the onExampleUpdate() function 
 * that drives character motion each frame.
 * 
 * @param {Object} Jolt - Your Jolt WASM object
 * @param {Object} bodyInterface - The result from initPhysics()
 * @param {THREE.Scene} scene 
 * @param {Array} dynamicObjects - Array to push newly created objects
 * @param {Function} onExampleUpdateRef - An empty object with { fn: null } so we can assign .fn 
 */
export function setupExample(Jolt, bodyInterface, scene, dynamicObjects, onExampleUpdateRef) {
  // For collision layers
  const LAYER_NON_MOVING = 0;
  const LAYER_MOVING = 1;

  // 1) Basic floor
  createFloor(Jolt, bodyInterface, (body, color) => {
    addToScene(body, Jolt, bodyInterface, scene, dynamicObjects, getThreeObjectForBody);
  }, 50);

  // 2) Simple walls
  const halfExtendWall = new Jolt.Vec3(0.5, 2, 45);
  const rotationIdentity = Jolt.Quat.prototype.sIdentity();
  createBox(
    Jolt,
    bodyInterface,
    (body, color) => addToScene(body, Jolt, bodyInterface, scene, dynamicObjects, getThreeObjectForBody),
    new Jolt.RVec3(-45, 1, 0),
    rotationIdentity,
    halfExtendWall,
    Jolt.EMotionType_Static,
    LAYER_NON_MOVING,
    0x7f7f7f
  );
  createBox(
    Jolt,
    bodyInterface,
    (body, color) => addToScene(body, Jolt, bodyInterface, scene, dynamicObjects, getThreeObjectForBody),
    new Jolt.RVec3(45, 1, 0),
    rotationIdentity,
    halfExtendWall,
    Jolt.EMotionType_Static,
    LAYER_NON_MOVING,
    0x7f7f7f
  );

  // 3) Simple character
  //    This is a placeholder “character,” just a dynamic box so you can see some object that moves/spawns.
  const halfExtentChar = new Jolt.Vec3(0.5, 0.75, 0.5);
  const charBody = createBox(
    Jolt,
    bodyInterface,
    (body, color) => addToScene(body, Jolt, bodyInterface, scene, dynamicObjects, getThreeObjectForBody),
    new Jolt.RVec3(0, 5, 0),
    rotationIdentity,
    halfExtentChar,
    Jolt.EMotionType_Dynamic,
    LAYER_MOVING,
    0xffaa00
  );

  // 4) A reference to the update function:
  onExampleUpdateRef.fn = (time, deltaTime, inputState) => {
    // Get the body ID once at the start
    const bodyID = charBody.GetID();

    if (inputState.forwardPressed) {
      const currentPos = bodyInterface.GetPosition(bodyID);
      currentPos.SetZ(currentPos.GetZ() - 0.1);
      bodyInterface.SetPosition(bodyID, currentPos);
    }
    if (inputState.backwardPressed) {
      const currentPos = bodyInterface.GetPosition(bodyID);
      currentPos.SetZ(currentPos.GetZ() + 0.1);
      bodyInterface.SetPosition(bodyID, currentPos);
    }

    if (inputState.leftPressed) {
      const currentPos = bodyInterface.GetPosition(bodyID);
      currentPos.SetX(currentPos.GetX() - 0.1);
      bodyInterface.SetPosition(bodyID, currentPos);
    }

    if (inputState.rightPressed) {
      const currentPos = bodyInterface.GetPosition(bodyID);
      currentPos.SetX(currentPos.GetX() + 0.1);
      bodyInterface.SetPosition(bodyID, currentPos);
    }

    if (inputState.jumpPressed) {
      const currentPos = bodyInterface.GetPosition(bodyID);
      currentPos.SetY(currentPos.GetY() + 0.1);
      bodyInterface.SetPosition(bodyID, currentPos);
    }

  };
} 
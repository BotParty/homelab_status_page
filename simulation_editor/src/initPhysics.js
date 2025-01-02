import { setupCollisionFiltering } from './setupCollisionFiltering.js';

/**
 * Initializes the physics system.
 * @param {Object} Jolt - The Jolt object from jolt-physics.wasm-compat.
 * @return {Object} - { joltInterface, physicsSystem, bodyInterface } 
 */
export function initPhysics(Jolt) {
  const settings = new Jolt.JoltSettings();
  settings.mMaxWorkerThreads = 3;

  setupCollisionFiltering(Jolt, settings);

  const joltInterface = new Jolt.JoltInterface(settings);
  const physicsSystem = joltInterface.GetPhysicsSystem();
  const bodyInterface = physicsSystem.GetBodyInterface();

  return { joltInterface, physicsSystem, bodyInterface };
} 
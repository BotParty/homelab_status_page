/**
 * Steps (or 'ticks') the physics simulation.
 * @param {Object} joltInterface - The active JoltInterface instance.
 * @param {number} deltaTime - Time elapsed since last frame in seconds.
 */
export function updatePhysics(joltInterface, deltaTime) {
  // When running below 55 Hz, do 2 steps instead of 1
  const numSteps = deltaTime > 1.0 / 55.0 ? 2 : 1;
  joltInterface.Step(deltaTime, numSteps);
} 
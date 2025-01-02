// main.js
import "./Polyfill.js";
import * as THREE from "https://cdn.skypack.dev/three@0.158.0";
import { WebGPURenderer } from "https://cdn.skypack.dev/three@0.158.0/examples/jsm/renderers/WebGPURenderer.js";

// Create the scene, camera, and a cube.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
camera.position.z = 2;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Initialize the WebGPURenderer
const renderer = new WebGPURenderer({ antialias: true });

// Set size to match our fake texture
renderer.setSize(800, 600);

// Attempt to render one frame
await renderer.render(scene, camera);

// Now we have something rendered into the GPU texture (hopefully).
// The challenge: retrieving the rendered image data. Since we do offscreen
// rendering, we might want to copy the GPU texture to a buffer and write it out.
// For demonstration, let's read it back:

const device = renderer._device; // Accessing internal property of the renderer
const outputTexture = renderer._context.getCurrentTexture();

// Create a buffer to copy pixels into:
const outputBuffer = device.createBuffer({
  size: 800 * 600 * 4,
  usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
});

const commandEncoder = device.createCommandEncoder();
commandEncoder.copyTextureToBuffer(
  { texture: outputTexture },
  { buffer: outputBuffer, bytesPerRow: 800 * 4 },
  [800, 600, 1],
);
device.queue.submit([commandEncoder.finish()]);

await outputBuffer.mapAsync(GPUMapMode.READ);
const arrayBuffer = outputBuffer.getMappedRange();
const pixels = new Uint8Array(arrayBuffer);

// `pixels` now contains the raw RGBA data of our rendered frame.
// Write it to a file (e.g., as a raw image or convert to PNG with a library).
Deno.writeFileSync("output.rgba", pixels);

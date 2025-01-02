import { WebGPURenderer, PerspectiveCamera, Scene, DirectionalLight } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * Initializes renderer, camera, scene, and controls.
 * @param {HTMLCanvasElement} canvas - The canvas to render on.
 * @param {HTMLElement} container - The container that will hold the renderer’s DOM.
 * @param {Object} size - { width, height } of the desired render area.
 * @return {Object} - { renderer, scene, camera, controls } 
 */
export function initGraphics(canvas, container, size) {
  const renderer = new WebGPURenderer({ canvas });
  renderer.setClearColor(0xff00ff);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(size.width, size.height);

  const camera = new PerspectiveCamera(60, size.width / size.height, 0.2, 2000);
  camera.position.set(0, 15, 30);

  const scene = new Scene();

  const dirLight = new DirectionalLight(0xffffff, 1);
  dirLight.position.set(10, 10, 5);
  scene.add(dirLight);

  const controls = new OrbitControls(camera, container);

  container.appendChild(renderer.domElement);

  return { renderer, scene, camera, controls };
} 
import "./deps/map.js";
import "./deps/progress.js";
import "./deps/snackbar.js";
import "./deps/tweet-button.js";
import { GoogleStreetViewLoader } from "./deps/PanomNom/GoogleStreetViewLoader.js";
import { getIdByLocation } from "./deps/PanomNom/utils.js";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  CanvasTexture,
  RepeatWrapping,
  TorusKnotBufferGeometry,
  DirectionalLight,
  IcosahedronBufferGeometry,
} from "./third_party/three.module.js";
import { OrbitControls } from "./third_party/OrbitControls.js";
import { EquirectangularToCubemap } from "./EquirectangularToCubemap.js";
import { material } from "./Material.js";
import { twixt } from "./deps/twixt.js";
import { material as backdropMaterial } from "./BackdropMaterial.js";

const speed = twixt.create("speed", 1);
const textureScale = twixt.create("scale", 2);
const innerScatter = twixt.create("innerScatter", 5);
const outerScatter = twixt.create("outerScatter", 0);
const normalScale = twixt.create("normalScale", 0.5);
const reflectivity = twixt.create("reflectivity", 0);
const roughness = twixt.create("roughness", 1);
const darkness = twixt.create("darkness", 0);
const smoothness = twixt.create("smoothness", 0);

const map = document.querySelector("#map-browser");
const progress = document.querySelector("progress-bar");
const snackbar = document.querySelector("snack-bar");
const description = document.querySelector("#description");
map.snackbar = snackbar;

let currentLocation;

async function load(lat, lng) {
  snackbar.hide();
  progress.reset();
  progress.show();

  const loader = new GoogleStreetViewLoader();
  loader.onProgress((p) => {
    progress.progress = p;
  });

  const zoom = 3;
  let metadata;

  try {
    metadata = await getIdByLocation(lat, lng);
  } catch (e) {
    progress.hide();
    if (e.code === "ZERO_RESULTS") {
      snackbar.error(
        "There are no panoramas available in the selected location."
      );
    }
    return;
  }

  map.moveTo(
    metadata.data.location.latLng.lat(),
    metadata.data.location.latLng.lng()
  );
  window.location.hash = `${metadata.data.location.latLng.lat()},${metadata.data.location.latLng.lng()}`;
  const res = await loader.load(metadata.data.location.pano, zoom);
  description.textContent = `${metadata.data.location.description} 
  ${metadata.data.copyright}`;
  currentLocation = `${metadata.data.location.latLng.lat()}-${metadata.data.location.latLng.lng()}`;

  progress.hide();

  const texture = new CanvasTexture(loader.canvas);
  const cubemap = equiToCube.convert(texture, 1024);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  cubemap.wrapS = cubemap.wrapT = RepeatWrapping;
  cubemap.offset.set(0.5, 0);

  torus.material.uniforms.envMap.value = cubemap;
  backdropMaterial.uniforms.envMap.value = texture;
}

window.addEventListener("map-selection", async (e) => {
  const lat = e.detail.latLng.lat;
  const lng = e.detail.latLng.lng;
  await load(lat, lng);
});

const renderer = new WebGLRenderer({
  antialias: true,
  preserveDrawingBuffer: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(window.devicePixelRatio);
document.body.append(renderer.domElement);

const equiToCube = new EquirectangularToCubemap(renderer);

const scene = new Scene();
const camera = new PerspectiveCamera(75, 1, 0.001, 10);
camera.position.set(0.2, -0.1, 0).normalize().multiplyScalar(0.2);
camera.lookAt(scene.position);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 0.1;
controls.maxDistance = 1.9;
controls.enablePan = false;

const canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#ff00ff";
ctx.fillRect(0, 0, 512, 512);

const texture = new CanvasTexture(canvas);
texture.needsUpdate = true;

const directLight = new DirectionalLight(0xffffff);
scene.add(directLight);

const backdrop = new Mesh(
  new IcosahedronBufferGeometry(2, 3),
  backdropMaterial
);
backdrop.rotation.y = Math.PI;
scene.add(backdrop);

const torus = new Mesh(
  // new TorusKnotBufferGeometry(0.05, 0.015, 200, 36),
  new TorusKnotBufferGeometry(0.05, 0.015, 400, 36, 1, 3), //, 4, 3),
  // new IcosahedronBufferGeometry(0.05, 10),
  material
);
scene.add(torus);

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", resize);

function randomize() {
  textureScale.to(1 + Math.round(Math.random()) * 10, 200);
  innerScatter.to(Math.random() * 5, 200);
  outerScatter.to(Math.random() * 2, 200);
  normalScale.to(Math.random() * 2, 200);
  smoothness.to(Math.random(), 200);
  roughness.to(Math.random(), 200);
  darkness.to(Math.round(Math.random()), 200);
  reflectivity.to(Math.round(Math.random()), 200);
}

let running = true;

function capture() {
  renderer.domElement.toBlob(function (blob) {
    const url = URL.createObjectURL(blob);

    const downloadBtn = document.createElement("a");
    downloadBtn.setAttribute(
      "download",
      `fsk-${performance.now()}-${currentLocation}.png`
    );
    downloadBtn.setAttribute("href", url);
    downloadBtn.click();
  });
}

function pause() {
  running = !running;
  if (running) {
    const s = 1 + Math.random() * 2;
    speed.to(s, s * 200, "OutQuint");
  } else {
    speed.to(0, speed.value * 200, "OutQuint");
  }
}

window.addEventListener("keydown", (e) => {
  const path = e.composedPath();
  if (path && path[0].tagName === "INPUT") {
    return;
  }
  if (e.code === "Space") {
    pause();
  }
  if (e.code === "KeyR") {
    randomize();
  }
});

document.querySelector("#pauseBtn").addEventListener("click", (e) => {
  pause();
  e.preventDefault();
});

document.querySelector("#snapBtn").addEventListener("click", (e) => {
  capture();
  e.preventDefault();
});

document.querySelector("#chromeBtn").addEventListener("click", (e) => {
  textureScale.to(1);
  innerScatter.to(0, 200);
  outerScatter.to(0, 200);
  normalScale.to(0, 200);
  reflectivity.to(1, 200);
  roughness.to(0, 200);
  smoothness.to(0, 200);
  darkness.to(0, 200);
  e.preventDefault();
});

document.querySelector("#glassBtn").addEventListener("click", (e) => {
  textureScale.to(1);
  innerScatter.to(0, 200);
  outerScatter.to(0, 200);
  normalScale.to(0, 200);
  reflectivity.to(0, 200);
  smoothness.to(0, 200);
  roughness.to(0, 200);
  darkness.to(0, 200);
  e.preventDefault();
});

document.querySelector("#randomBtn").addEventListener("click", (e) => {
  randomize();
  e.preventDefault();
});

let time = 0;
let prevTime = performance.now();

function render() {
  controls.update();
  const now = performance.now();
  time += (now - prevTime) * speed.value;
  prevTime = now;

  material.uniforms.repeat.value = textureScale.value;
  material.uniforms.innerScatter.value = innerScatter.value;
  material.uniforms.outerScatter.value = outerScatter.value;
  material.uniforms.normalScale.value = normalScale.value;
  material.uniforms.reflectivity.value = reflectivity.value;
  material.uniforms.roughness.value = roughness.value;
  material.uniforms.darkness.value = darkness.value;
  material.uniforms.smoothness.value = smoothness.value;

  const t = time / 10000;
  torus.rotation.x = 0.49 * t;
  torus.rotation.y = 0.5 * t;
  torus.rotation.z = 0.51 * t;
  material.uniforms.time.value = t;

  renderer.render(scene, camera);
  renderer.setAnimationLoop(render);
}

async function init() {
  await map.ready;
  const [lat, lng] = window.location.hash.substring(1).split(",");
  if (lat && lng) {
    await load(parseFloat(lat), parseFloat(lng));
  } else {
    map.randomLocation();
  }
  render();
}

resize();
init();

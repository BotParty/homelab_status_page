/*
 * From https://www.redblobgames.com/x/2122-shape-transition/
 * Copyright 2021 Red Blob Games <redblobgames@gmail.com>
 * @license CC-0 <https://creativecommons.org/share-your-work/public-domain/cc0/>
 */

import createREGL from "regl";

const TAU = 2 * Math.PI;
const NUM_POINTS = 100000; // 100k-200k seems reasonable
const RADIUS1 = 0.9,
  RADIUS2 = 0.4;

/* Overview

   1. Generate (x1,y1) and (x2,y2) for each point. The point will move in a straight line
      between these two, based on a time phase parameter.
   2. Put the position data into GL buffers. We don't have to update them on each frame; they
      stay on the GPU. We only have to update them if the parameters change.
   3. Draw the points several times in different colors to get chromatic blur, interpolating
      between the two positions for each point.
*/

// these affect the data buffers; changing them requires updating the buffers
let attrConfig = {
  circleCount1: 1,
  multiplier1: 1,
  circleCount2: 6,
  multiplier2: 4,
};

let shaderConfig = {
  // these affect the shaders; changing them does *not* require updating buffers
  alpha: 0.3,
  speed: 0.2,
  spread: 0.1,
  chromaticblur: 0.1,
};

// See http://regl.party/ -- regl makes low level gl programming more convenient!
const regl = createREGL({ canvas: document.querySelector(".two") });
let shape1 = regl.buffer(NUM_POINTS),
  shape2 = regl.buffer(NUM_POINTS);
let angles = Array.from({ length: NUM_POINTS }, (_) => TAU * Math.random());
let jitter = Array.from({ length: NUM_POINTS }, (_) => Math.random());

/** generate N circles in a circle, with a special case when N is 1 */
function circleCenters(radius, N) {
  if (N === 1) {
    return [[0, 0]];
  }
  let centers = [];
  for (let i = 0; i < N; i++) {
    let angle = ((i % N) * TAU) / N;
    centers.push([radius * Math.sin(angle), radius * Math.cos(angle)]);
  }
  return centers;
}

/** generate a set of points that are in some shape involving circles;
    TODO: it'd be fun to use non-circles too, like regular polygons, or stars,
    or my blob logo */
function createShape(shapeBuffer, centers, radius, multiplier) {
  let points = [];
  for (let i = 0; i < NUM_POINTS; i++) {
    let angle = angles[i];
    let center = centers[i % centers.length];
    points.push(
      center[0] + radius * Math.sin(multiplier * angle),
      center[1] + radius * Math.cos(multiplier * angle)
    );
  }
  // Update the GPU buffers from the CPU data
  shapeBuffer({ data: points });
}

function createBothShapes() {
  let r1 = attrConfig.circleCount1 === 1 ? RADIUS1 : RADIUS2,
    r2 = attrConfig.circleCount2 === 1 ? RADIUS1 : RADIUS2;
  createShape(
    shape1,
    circleCenters(r1, attrConfig.circleCount1),
    r1,
    attrConfig.multiplier1
  );
  createShape(
    shape2,
    circleCenters(r2, attrConfig.circleCount2),
    r2,
    attrConfig.multiplier2
  );
}

/* Here's the GLSL shader magic — it's just a linear interpolation between the two positions */
const draw = regl({
  frag: `
        precision highp float;
        uniform vec3 u_color;
        uniform float u_alpha;
        void main () {
            gl_FragColor = vec4(u_color * u_alpha, u_alpha);
        }`,

  vert: `
        precision highp float;
        uniform float u_time, u_chromaticblur, u_spread, u_speed;
        attribute float a_jitter;
        attribute vec2 a_position1, a_position2;
        void main () {
            float phase = 0.5 * (1.0 + cos(u_speed * (u_time + u_chromaticblur) + a_jitter * u_spread));
            phase = smoothstep(0.1, 0.9, phase);
            // TODO: make this a parameter, as the range seems like it's interesting to play with
            // phase = smoothstep(-0.9, 0.9, phase);
            // phase = smoothstep(0.1, 1.5, phase);
            gl_PointSize = 2.0; // TODO: should this be a parameter too?
            gl_Position = vec4(mix(a_position1, a_position2, phase), 0, 1);
        }`,

  // additive — we want to draw many points in the same place and have them add together
  depth: { enable: false },
  blend: { enable: true, func: { src: "one", dst: "one" } },

  attributes: {
    a_jitter: jitter,
    a_position1: shape1,
    a_position2: shape2,
  },

  uniforms: {
    // TODO: instead of multiplying these by some value, it'd probably be better to
    // have a min and max value for each parameter, but right now they're all hard-coded
    // to be 0-1 or 1-20
    u_alpha: () => shaderConfig.alpha,
    u_speed: () => 4 * shaderConfig.speed,
    u_spread: () => TAU * shaderConfig.spread,
    u_color: regl.prop("u_color"),
    u_chromaticblur: regl.prop("u_chromaticblur"),
    u_time: (context) => context.time,
  },

  count: NUM_POINTS,
  primitive: "points",
});

/** create sliders for each parameter */
function constructUi(config, min, max, step, needsRedraw) {
  let configDom = document.getElementById("control-panel");
  for (let param of Object.keys(config)) {
    let label = document.createElement("label");
    let slider = document.createElement("input");
    let br = document.createElement("br");
    label.innerHTML = `${param}`;
    label.style.display = "inline-block";
    label.style.width = "8em";
    label.style.textAlign = "right";
    slider.setAttribute("id", param);
    slider.setAttribute("type", "range");
    slider.setAttribute("min", min);
    slider.setAttribute("max", max);
    slider.setAttribute("step", step);
    slider.setAttribute("value", config[param]);
    slider.addEventListener("input", (event) => {
      config[param] = slider.valueAsNumber;
      if (needsRedraw) {
        createBothShapes();
      }
    });
    configDom.appendChild(label);
    configDom.appendChild(slider);
    configDom.appendChild(br);
  }
}

function redraw() {
  regl.clear({ color: [0, 0, 0, 1], depth: 1 });
  // Chromatic blur: draw blue, cyan, green, orange, red versions of each point,
  // and have them added together using blending so they'll be white if they're
  // all present. The sums of R, G, B should be roughly equal to get white.
  const chromaticblur = 0.1 * shaderConfig.chromaticblur;
  draw({ u_color: [0.0, 0.1, 0.9], u_chromaticblur: 0 });
  draw({ u_color: [0.0, 0.3, 0.5], u_chromaticblur: chromaticblur });
  draw({ u_color: [0.1, 0.7, 0.1], u_chromaticblur: 2 * chromaticblur });
  draw({ u_color: [0.5, 0.3, 0.0], u_chromaticblur: 3 * chromaticblur });
  draw({ u_color: [0.9, 0.1, 0.0], u_chromaticblur: 4 * chromaticblur });
}

function start() {
  console.log("hi");
  constructUi(shaderConfig, 0, 1, 0.01, false);
  constructUi(attrConfig, 1, 20, 1, true);

  createBothShapes();
  regl.frame(redraw);
}
export default start;

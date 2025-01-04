import {
  BackSide,
  GLSL3,
  RawShaderMaterial,
} from "./third_party/three.module.js";

const vertexShader = `precision highp float;

in vec3 position;
in vec2 uv;
in vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;

out vec2 vUv;
out vec3 vNormal;

void main() {
  vUv = uv;
  vNormal = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}`;

const fragmentShader = `precision highp float;

in vec2 vUv;
in vec3 vNormal;

uniform sampler2D envMap;

out vec4 color;

#define PI 3.14159265358979323846264

void main() {
  vec3 n = normalize(vNormal);
  float yaw = .5 - atan( n.z, - n.x ) / ( 2.0 * PI );
  float pitch = .5 - asin( n.y ) / PI;
  color = textureLod ( envMap, vec2(yaw, 1. - pitch), 0.);
}`;

const material = new RawShaderMaterial({
  uniforms: {
    envMap: { value: null },
  },
  // wireframe: true,
  vertexShader,
  fragmentShader,
  glslVersion: GLSL3,
  side: BackSide,
});

export { material };

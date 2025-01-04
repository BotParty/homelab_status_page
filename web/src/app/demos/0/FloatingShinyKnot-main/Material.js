import {
  GLSL3,
  RawShaderMaterial,
  TextureLoader,
  RepeatWrapping,
} from "./third_party/three.module.js";

const vertexShader = `precision highp float;

in vec3 position;
in vec3 normal;
in vec2 uv;
in vec3 tangent;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 modelMatrix;
uniform vec3 cameraPosition;
uniform mat3 normalMatrix;

out vec2 vUv;
out vec3 vNormal;
out vec3 vPosition;
out vec4 vMPosition;
out mat3 nMat;
out vec3 vViewPosition;

void main() {
  vUv = uv;
  vNormal = normal;

  vMPosition = modelMatrix * vec4( position, 1.0 );
  nMat = mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz );
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  vViewPosition = -mvPosition.xyz;

  vPosition = position;
  gl_Position = projectionMatrix * mvPosition;
}`;

const fragmentShader = `precision highp float;

in vec2 vUv;
in vec3 vNormal;
in vec4 vMPosition;
in vec3 vPosition;
in mat3 nMat;
in vec3 vViewPosition;

uniform samplerCube envMap;
uniform sampler2D normalMap;
uniform sampler2D roughnessMap;
uniform vec3 cameraPosition;
uniform float time;
uniform mat3 normalMatrix;

uniform float repeat;
uniform float innerScatter;
uniform float outerScatter;
uniform float normalScale;
uniform float reflectivity;
uniform float roughness;
uniform float darkness;
uniform float smoothness;

out vec4 color;

#define PI 3.14159265358979323846264

void main() {
  
  vec3 n = normalize( vNormal.xyz );
  vec3 blend_weights = abs( n );
  blend_weights = ( blend_weights - 0.2 ) * 7.;  
  blend_weights = max( blend_weights, 0. );
  blend_weights /= ( blend_weights.x + blend_weights.y + blend_weights.z );

  vec3 tanX = vec3(  vNormal.x, -vNormal.z,  vNormal.y );
  vec3 tanY = vec3(  vNormal.z,  vNormal.y, -vNormal.x );
  vec3 tanZ = vec3( -vNormal.y,  vNormal.x,  vNormal.z );
  vec3 blended_tangent = tanX * blend_weights.xxx +  
                          tanY * blend_weights.yyy +  
                          tanZ * blend_weights.zzz; 

  vec2 uv = vUv * vec2(repeat,1.) + vec2(0. *time * repeat,time);
  float bias = smoothness;

  vec3 normalTex = texture(normalMap, uv, bias).rgb *2.0 - 1.0;//blendedNormal * 2.0 - 1.0;
  normalTex.xy *= normalScale;
  normalTex.y *= -1.;
  normalTex = normalize( normalTex );
  mat3 tsb = mat3( normalize( blended_tangent ) , normalize( cross( vNormal, blended_tangent ) ), normalize( vNormal ) );
  vec3 finalNormal = tsb * normalTex;

  float r = 1. - texture(roughnessMap, uv, bias).r;
  r = mix(1., r, roughness);

  vec3 fn = normalize(nMat * finalNormal);
  vec3 t = normalize(vMPosition.xyz - cameraPosition);
  vec3 refl = normalize(reflect(t, fn));
  vec3 refr = normalize(refract(t, fn, .9));

  vec3 e = normalize( vViewPosition );
  float rim = 1. - pow(abs(dot(e, normalMatrix * finalNormal)), 1.);

  vec4 c1 = texture(envMap, refl, r * outerScatter);
  vec4 c2 = texture(envMap, refr, r * innerScatter);
  color = mix(mix(c2, c1, rim), c1, reflectivity);
  color = mix(color, c1 * vec4(vec3(rim), 1.), darkness);
}`;

const loader = new TextureLoader();

const roughnessMap = loader.load("./assets/specular.jpg");
roughnessMap.repeat.set(1, 1);
roughnessMap.wrapS = roughnessMap.wrapT = RepeatWrapping;

const normalMap = loader.load("./assets/normal.jpg");
normalMap.repeat.set(1, 1);
normalMap.wrapS = normalMap.wrapT = RepeatWrapping;

const material = new RawShaderMaterial({
  uniforms: {
    envMap: { value: null },
    roughnessMap: { value: roughnessMap },
    normalMap: { value: normalMap },
    time: { value: 0 },
    repeat: { value: 1 },
    innerScatter: { value: 0 },
    outerScatter: { value: 0 },
    normalScale: { value: 1 },
    reflectivity: { value: 1 },
    roughness: { value: 0 },
    darkness: { value: 0 },
    smoothness: { value: 0 },
  },
  // wireframe: true,
  vertexShader,
  fragmentShader,
  glslVersion: GLSL3,
});

export { material };

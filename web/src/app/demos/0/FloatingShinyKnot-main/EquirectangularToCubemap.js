import {
  Scene,
  CubeCamera,
  MeshBasicMaterial,
  WebGLCubeRenderTarget,
  LinearMipmapLinearFilter,
  BackSide,
  Mesh,
  IcosahedronBufferGeometry,
  CubeReflectionMapping,
} from "./third_party/three.module.js";

function EquirectangularToCubemap(renderer) {
  this.renderer = renderer;
  this.scene = new Scene();

  var gl = this.renderer.getContext();
  this.maxSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);

  this.material = new MeshBasicMaterial({
    map: null,
    side: BackSide,
  });

  this.mesh = new Mesh(new IcosahedronBufferGeometry(100, 4), this.material);
  this.mesh.scale.x = -1;
  this.scene.add(this.mesh);
}

EquirectangularToCubemap.prototype.convert = function (source, size) {
  var mapSize = Math.min(size, this.maxSize);
  const cubeRenderTarget = new WebGLCubeRenderTarget(mapSize, {
    generateMipmaps: true,
    minFilter: LinearMipmapLinearFilter,
  });
  cubeRenderTarget.texture.mapping = CubeReflectionMapping;

  this.camera = new CubeCamera(1, 100000, cubeRenderTarget);
  this.material.map = source;

  this.camera.update(this.renderer, this.scene);

  return cubeRenderTarget.texture;
};

export { EquirectangularToCubemap };

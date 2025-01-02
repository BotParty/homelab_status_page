import { BufferGeometry, BufferAttribute } from 'three';

/**
 * Returns a Three.js geometry from a Jolt shape’s triangle data.
 */
export function createMeshForShape(shape, Jolt) {
  const scale = new Jolt.Vec3(1, 1, 1);
  const triContext = new Jolt.ShapeGetTriangles(
    shape,
    Jolt.AABox.prototype.sBiggest(),
    shape.GetCenterOfMass(),
    Jolt.Quat.prototype.sIdentity(),
    scale
  );
  Jolt.destroy(scale);

  const vertices = new Float32Array(
    Jolt.HEAPF32.buffer,
    triContext.GetVerticesData(),
    triContext.GetVerticesSize() / Float32Array.BYTES_PER_ELEMENT
  );
  const buffer = new BufferAttribute(vertices, 3).clone();

  Jolt.destroy(triContext);

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', buffer);
  geometry.computeVertexNormals();

  return geometry;
} 
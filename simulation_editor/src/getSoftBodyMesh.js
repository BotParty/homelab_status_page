import { BufferGeometry, BufferAttribute, Mesh } from 'three';

/**
 * Constructs a mesh for a soft body from its motion properties.
 */
export function getSoftBodyMesh(body, material, Jolt) {
  const motionProps = Jolt.castObject(body.GetMotionProperties(), Jolt.SoftBodyMotionProperties);
  const vertexSettings = motionProps.GetVertices();
  const settings = motionProps.GetSettings();
  const positionOffset = Jolt.SoftBodyVertexTraits.prototype.mPositionOffset;
  const faceData = settings.mFaces;

  const softVertex = [];
  for (let i = 0; i < vertexSettings.size(); i++) {
    softVertex.push(
      new Float32Array(
        Jolt.HEAP32.buffer,
        Jolt.getPointer(vertexSettings.at(i)) + positionOffset,
        3
      )
    );
  }

  const faces = new Uint32Array(faceData.size() * 3);
  for (let i = 0; i < faceData.size(); i++) {
    faces.set(
      new Uint32Array(Jolt.HEAP32.buffer, Jolt.getPointer(faceData.at(i)), 3),
      i * 3
    );
  }

  const geometry = new BufferGeometry();
  const vertices = new Float32Array(vertexSettings.size() * 3);
  geometry.setAttribute('position', new BufferAttribute(vertices, 3));
  geometry.setIndex(new BufferAttribute(faces, 1));
  material.side = 2; // double side

  const threeObject = new Mesh(geometry, material);

  threeObject.userData.updateVertex = () => {
    for (let i = 0; i < softVertex.length; i++) {
      vertices.set(softVertex[i], i * 3);
    }
    geometry.computeVertexNormals();
    geometry.getAttribute('position').needsUpdate = true;
    geometry.getAttribute('normal').needsUpdate = true;
  };
  threeObject.userData.updateVertex();

  return threeObject;
} 
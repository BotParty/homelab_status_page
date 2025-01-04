'use client'
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
// If you are using three-stdlib, you can import OrbitControls like this:
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// Or if you have them in a local file or CDN, adjust accordingly

const NeonSphere = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // --- 1. Initialize the Scene, Camera & Renderer ---
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1f77d0); // Blue-ish background

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 40);

    // --- 2. OrbitControls (optional) ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // --- 3. Create the Sphere Group ---
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // --- 4. Parameters ---
    const NUM_POINTS = 200;
    const CONNECTION_DISTANCE = 3;
    const SPHERE_RADIUS = 15;
    const POINT_COLOR = 0x00ffff;
    const LINE_COLOR = 0x00ffff;

    // --- 5. Generate Random Points on the Sphere ---
    const points = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      // Random direction using spherical coordinates
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const x = SPHERE_RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta);
      const z = SPHERE_RADIUS * Math.cos(phi);

      points.push(new THREE.Vector3(x, y, z));
    }

    // --- 6. Points (visualize individual vertices) ---
    {
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.PointsMaterial({
        color: POINT_COLOR,
        size: 0.3,
        transparent: true,
        opacity: 0.9,
      });
      const pointCloud = new THREE.Points(geometry, material);
      sphereGroup.add(pointCloud);
    }

    // --- 7. Create line segments for connected points ---
    const lineMaterial = new THREE.LineBasicMaterial({
      color: LINE_COLOR,
      transparent: true,
      opacity: 0.7,
    });
    const lineSegments = new THREE.Group();
    sphereGroup.add(lineSegments);

    for (let i = 0; i < NUM_POINTS; i++) {
      for (let j = i + 1; j < NUM_POINTS; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist <= CONNECTION_DISTANCE) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            points[i],
            points[j],
          ]);
          const line = new THREE.Line(geometry, lineMaterial);
          lineSegments.add(line);
        }
      }
    }

    // --- 8. Optional Glow Sphere ---
    {
      const glowGeometry = new THREE.SphereGeometry(SPHERE_RADIUS * 1.1, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: LINE_COLOR,
        opacity: 0.05,
        transparent: true,
      });
      const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
      sphereGroup.add(glowSphere);
    }

    // --- 9. Handle Window Resize ---
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    // --- 10. Animation Loop ---
    const animate = () => {
      requestAnimationFrame(animate);

      sphereGroup.rotation.y += 0.002;
      sphereGroup.rotation.x += 0.001;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // --- 11. Cleanup on Unmount ---
    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
      // you can do additional cleanup if necessary
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};

export default NeonSphere;
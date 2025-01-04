'use client'

// File: pages/spiral.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function SpiralArt() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene, camera, renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x3b0052); // A deep purple background

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Basic lighting to make lines visible
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Define the corners of an equilateral triangle in 2D
    const corners = [
      new THREE.Vector3(0, 5, 0),    // top
      new THREE.Vector3(-4.33, -2.5, 0), // lower-left
      new THREE.Vector3(4.33, -2.5, 0),  // lower-right
    ];

    // We’ll draw multiple sets of lines that connect
    // points along the triangle’s edges to produce a swirl effect
    const numSteps = 150;
    for (let i = 0; i < numSteps; i++) {
      // Fraction along the triangle edges
      const t = i / numSteps;

      // Points on each side:
      const p1 = corners[0].clone().lerp(corners[1], t);
      const p2 = corners[1].clone().lerp(corners[2], t);
      const p3 = corners[2].clone().lerp(corners[0], t);

      // For color, use HSL so we can generate vibrant rainbow lines.
      // Shift the hue a bit each time; you can tweak sat/lightness as desired.
      const hue = (t * 360) / 60; // scaled down for some variety
      const color = new THREE.Color(`hsl(${hue}, 100%, 50%)`);
      const material = new THREE.LineBasicMaterial({ color });

      // Draw lines:
      // 1) p1 -> p2
      // 2) p2 -> p3
      // 3) p3 -> p1
      // That’ll form “chords” across the triangle, creating the swirl pattern.
      const makeLine = (vStart, vEnd) => {
        const points = [vStart, vEnd];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return new THREE.Line(geometry, material);
      };

      scene.add(makeLine(p1, p2));
      scene.add(makeLine(p2, p3));
      scene.add(makeLine(p3, p1));
    }

    // Optional: rotate the entire scene for visual drama
    const animate = () => {
      requestAnimationFrame(animate);
      scene.rotation.z += 0.002; // slow rotation
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
    };
  }, []);

  // Render a full-screen canvas
  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100vw', height: '100vh' }}
    />
  );
}
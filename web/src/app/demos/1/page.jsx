'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
//import { WebGPURenderer } from 'three/addons/renderers/webgpu/WebGPURenderer.js';

const WebGPURenderer = THREE.WebGLRenderer

export default function ThreeScene() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const init = async () => {
      // Create a Scene
      sceneRef.current = new THREE.Scene();
      sceneRef.current.background = new THREE.Color(0xffffff);

      // Create a Camera
      cameraRef.current = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRef.current.position.set(0, 0, 50);

      // Initialize WebGPU renderer
      rendererRef.current = new WebGPURenderer({ antialias: true });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(rendererRef.current.domElement);

      // Create group
      groupRef.current = new THREE.Group();
      sceneRef.current.add(groupRef.current);

      // Create rings
      for (let i = 0; i < 6; i++) {
        const radius = 5 + i * 1.2;
        const segmentsCount = 24 + i * 8;
        const ring = createRingSegments(radius, segmentsCount);
        ring.rotation.z = Math.random() * Math.PI * 2;
        groupRef.current.add(ring);
      }
    };

    const animate = () => {
      if (!groupRef.current || !sceneRef.current || !rendererRef.current || !cameraRef.current) return;
      
      requestAnimationFrame(animate);
      groupRef.current.rotation.z += 0.002;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    // Initialize and start animation
    init();
    animate();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      rendererRef.current?.dispose();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
}

function createRingSegments(radius, segmentsCount) {
  // A group for the ring
  const ringGroup = new THREE.Group();

  for (let i = 0; i < segmentsCount; i++) {
    // Each segment is a small rectangle
    const width = 0.3 + Math.random() * 0.6;  // random width
    const height = 0.1 + Math.random() * 0.4; // random height

    const geometry = new THREE.BoxGeometry(width, height, 0.05);
    
    // Random color between red/blue/gray
    const color = new THREE.Color();
    if (Math.random() > 0.5) {
      color.setHSL(0.0, 0.7, 0.5 + 0.3 * Math.random()); // some shade of red
    } else {
      color.setHSL(0.6, 0.7, 0.5 + 0.3 * Math.random()); // some shade of blue
    }
    
    const material = new THREE.MeshBasicMaterial({ color });
    const segment = new THREE.Mesh(geometry, material);

    // Position the segment around the ring
    const angle = (i / segmentsCount) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    segment.position.set(x, y, 0);

    // Slight random rotation
    segment.rotation.z = Math.random() * Math.PI * 2;

    ringGroup.add(segment);
  }

  return ringGroup;
}
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function UndulatingVoxels() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene, camera, renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 20, 40);

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x111111);

    const voxelSize = 1;
    const gridSize = 30;  // number of cubes along one axis
    const spacing = 1.2;  // slight gap between cubes

    // Create a group to hold all voxels for easier manipulation
    const voxelGroup = new THREE.Group();
    scene.add(voxelGroup);

    // Build the voxel grid
    const cubes: THREE.Mesh[] = [];
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const geometry = new THREE.BoxGeometry(voxelSize, voxelSize, voxelSize);
        const material = new THREE.MeshPhongMaterial({ 
          color: new THREE.Color().setHSL(x / gridSize, 0.8, 0.5) 
        });
        const cube = new THREE.Mesh(geometry, material);

        cube.position.set(
          (x - gridSize / 2) * spacing,
          0,
          (z - gridSize / 2) * spacing
        );

        voxelGroup.add(cube);
        cubes.push(cube);
      }
    }

    // Add some simple lights
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight.position.set(0, 50, 50);
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0x333333));

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation function
    function animate(time: number) {
      requestAnimationFrame(animate);
      const t = time * 0.001;
      cubes.forEach((cube) => {
        const waveHeight = Math.sin(cube.position.x * 0.8 + t) 
                        + Math.sin(cube.position.z * 0.8 + t * 1.5);
        cube.position.y = waveHeight;
      });
      
      voxelGroup.rotation.y = t * 0.2;
      renderer.render(scene, camera);
    }
    animate(0);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ display: 'block' }}
    />
  );
}
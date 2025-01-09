'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import SoundCloudAudio from 'soundcloud-audio';

export default function MusicVisualizer() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const barsRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const frequencyDataRef = useRef(null);
  const scRef = useRef(null);

  const NUM_BARS = 64;

  useEffect(() => {
    scRef.current = new SoundCloudAudio('adnan_wahab');
  }, []);

  useEffect(() => {
    // Initialize Three.js
    const initThreeJS = () => {
      sceneRef.current = new THREE.Scene();
      sceneRef.current.background = new THREE.Color(0x111111);

      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRef.current.position.set(0, 20, 50);

      rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(rendererRef.current.domElement);
    };

    const createBars = () => {
      const spacing = 0.5;
      const barWidth = 0.5;
      const barMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

      for (let i = 0; i < NUM_BARS; i++) {
        const geometry = new THREE.BoxGeometry(barWidth, 1, barWidth);
        const bar = new THREE.Mesh(geometry, barMaterial);
        bar.position.x = (i - NUM_BARS / 2) * (barWidth + spacing);
        bar.position.y = 0;
        sceneRef.current.add(bar);
        barsRef.current.push(bar);
      }
    };

    const createLights = () => {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      sceneRef.current.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(0, 20, 20);
      sceneRef.current.add(directionalLight);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(frequencyDataRef.current);

        for (let i = 0; i < NUM_BARS; i++) {
          const bar = barsRef.current[i];
          const scaleY = (frequencyDataRef.current[i] / 255) * 20;
          bar.scale.y = Math.max(1, scaleY);
          bar.position.y = bar.scale.y / 2;
        }
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    // Initialize everything
    initThreeJS();
    createBars();
    createLights();
    animate();

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(rendererRef.current.domElement);
      barsRef.current.forEach(bar => {
        bar.geometry.dispose();
        bar.material.dispose();
      });
      rendererRef.current?.dispose();
    };
  }, []);

  const handleAudioFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }

    audioContextRef.current = audioContextRef.current || new (window.AudioContext || window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 128;

    const reader = new FileReader();
    reader.onload = (e) => {
      audioContextRef.current.decodeAudioData(e.target.result, (buffer) => {
        sourceRef.current = audioContextRef.current.createBufferSource();
        sourceRef.current.buffer = buffer;
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
        sourceRef.current.start(0);
      });
    };
    reader.readAsArrayBuffer(file);

    frequencyDataRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
  };

  const handleSoundCloudURL = (event) => {
    event.preventDefault();
    const url = event.target.url.value;

    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }

    audioContextRef.current = audioContextRef.current || new (window.AudioContext || window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 128;

    scRef.current.resolve(url, (track) => {
      scRef.current.play();
      
      // Connect Soundcloud player to analyzer
      sourceRef.current = audioContextRef.current.createMediaElementSource(scRef.current._audio);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    });

    frequencyDataRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
  };

  return (
    <div style={{ margin: 0, overflow: 'hidden' }}>
      <form 
        onSubmit={handleSoundCloudURL}
        style={{
          position: 'absolute',
          top: '50px',
          left: '10px',
          zIndex: 999,
        }}
      >
        <input
          type="text"
          name="url"
          placeholder="Enter SoundCloud URL"
          style={{
            fontSize: '16px',
            padding: '5px',
            width: '300px',
          }}
        />
        <button 
          type="submit"
          style={{
            fontSize: '16px',
            marginLeft: '5px',
          }}
        >
          Play
        </button>
      </form>

      <input
        type="file"
        accept="audio/*"
        onChange={handleAudioFile}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 999,
          fontSize: '16px',
        }}
      />
      <div ref={containerRef} />
    </div>
  );
}
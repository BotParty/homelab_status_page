'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const songs = [
  "Dirtwire - Pyrochrome - 01 Cantaloupe.mp3",
  "Dirtwire - Pyrochrome - 02 The Howl.mp3",
  "Dirtwire - Pyrochrome - 03 Heavy in this World.mp3",
  "Dirtwire - Pyrochrome - 04 Obokano.mp3",
  "Dirtwire - Pyrochrome - 05 Snoozlebug.mp3",
  "Dirtwire - Pyrochrome - 06 Strange Creek.mp3",
  "Dirtwire - Pyrochrome - 07 Hey There Papa.mp3",
  "Dirtwire - Pyrochrome - 08 Hirajoshi.mp3",
  "Dirtwire - Pyrochrome - 09 Above the Clouds.mp3"
];



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
  const audioRef = useRef(null);
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const NUM_BARS = 64;

  useEffect(() => {
    setSongs([
      '/dirtwire/Dirtwire - Pyrochrome - 01 Cantaloupe.mp3',
      '/dirtwire/Dirtwire - Pyrochrome - 02 The Howl.mp3',
      '/dirtwire/Dirtwire - Pyrochrome - 06 Strange Creek.mp3',
      '/dirtwire/Dirtwire - Pyrochrome - 07 Hey There Papa.mp3'
    ]);
  }, []);

  const handleSongSelect = (songPath) => {
    setCurrentSong(songPath);

    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }

    audioContextRef.current = audioContextRef.current || new (window.AudioContext || window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 128;

    if (audioRef.current) {
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }

    frequencyDataRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
  };

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

  return (
    <div style={{ margin: 0, overflow: 'hidden' }}>
      <div 
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 999,
          color: 'white',
          background: 'rgba(0,0,0,0.7)',
          padding: '10px',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
      >
        <h3>Dirtwire Songs</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {songs.map((song, index) => (
            <li key={index}>
              <button 
                onClick={() => handleSongSelect(song)}
                style={{
                  fontSize: '16px',
                  margin: '5px 0',
                  padding: '5px 10px',
                  background: currentSong === song ? '#444' : '#222',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                {song.split('/').pop().replace('.mp3', '')}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <audio
        ref={audioRef}
        src={currentSong}
        controls
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          zIndex: 999
        }}
      />
      
      <div ref={containerRef} />
    </div>
  );
}
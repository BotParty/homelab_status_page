// main.js

let audioContext;
let sourceNode;
let gainNode;
let isPlaying = false;
let audioBuffer;

// UI Elements
const playButton = document.createElement('button');
playButton.textContent = 'Play';
const pauseButton = document.createElement('button');
pauseButton.textContent = 'Pause';
const volumeLabel = document.createElement('label');
volumeLabel.textContent = 'Volume: ';
const volumeSlider = document.createElement('input');
volumeSlider.type = 'range';
volumeSlider.min = '0';
volumeSlider.max = '1';
volumeSlider.step = '0.01';
volumeSlider.value = '0.5';

document.body.appendChild(playButton);
document.body.appendChild(pauseButton);
volumeLabel.appendChild(volumeSlider);
document.body.appendChild(volumeLabel);

async function initAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  // If we haven't loaded the buffer yet, load it now
  if (!audioBuffer) {
    const response = await fetch('/audio-sample.mp3');
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  }

  // Create a new source node each time we play, since buffer sources are one-shot
  sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;

  // Create a gain node for volume control
  gainNode = audioContext.createGain();
  gainNode.gain.value = volumeSlider.value;

  // Connect the nodes
  sourceNode.connect(gainNode).connect(audioContext.destination);
}

playButton.addEventListener('click', async () => {
  if (!isPlaying) {
    await initAudioContext();
    sourceNode.start();
    isPlaying = true;
  } else {
    // If already playing, restart from the beginning
    sourceNode.stop();
    await initAudioContext();
    sourceNode.start();
  }
});

pauseButton.addEventListener('click', () => {
  if (isPlaying) {
    sourceNode.stop();
    isPlaying = false;
  }
});

volumeSlider.addEventListener('input', (e) => {
  if (gainNode) {
    gainNode.gain.value = e.target.value;
  }
});
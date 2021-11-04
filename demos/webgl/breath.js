//from regl.examples
import createREGL from "regl";
let regl = createREGL();

let successFunction = (stream) => {
  console.log("after get user media");

  //convert this function to promise
  // Next we create an analyser node to intercept data from the mic
  const context = new AudioContext();
  const analyser = context.createAnalyser();

  // And then we connect them together
  context.createMediaStreamSource(stream).connect(analyser);

  // Here we preallocate buffers for streaming audio data
  const fftSize = analyser.frequencyBinCount;
  const frequencies = new Uint8Array(fftSize);
  const fftBuffer = regl.buffer({
    length: fftSize,
    type: "uint8",
    usage: "dynamic",
  });

  // This command draws the spectrogram
  const drawSpectrum = regl({
    vert: `
  precision mediump float;

  #define FFT_SIZE ${fftSize}
  #define PI ${Math.PI}

  attribute float index, frequency;

  void main() {
    float theta = 2.0 * PI * index / float(FFT_SIZE);
    gl_Position = vec4(
      0.5 * cos(theta) * (1.0 + frequency),
      0.5 * sin(theta) * (1.0 + frequency),
      0,
      1);
  }`,

    frag: `
  void main() {
    gl_FragColor = vec4(1, 1, 1, 1);
  }`,

    attributes: {
      index: Array(fftSize)
        .fill()
        .map((_, i) => i),
      frequency: {
        buffer: fftBuffer,
        normalized: true,
      },
    },
    elements: null,
    instances: -1,
    lineWidth: 1,
    depth: { enable: false },
    count: fftSize,
    primitive: "line loop",
  });

  regl.frame(({ tick }) => {
    // Clear draw buffer
    regl.clear({
      color: [0, 0, 0, 1],
      depth: 1,
    });
    // Poll microphone data
    analyser.getByteFrequencyData(frequencies);

    // Here we use .subdata() to update the buffer in place
    fftBuffer.subdata(frequencies);

    // Draw the spectrum
    drawSpectrum();
  });
};

let errorFunction = (err) => {
  console.log(err);
  console.log("ground");
};

async function breath() {
  //navigator.webkitGetUserMedia({ audio: true }, successFunction, errorFunction);
  // .then(successFunction)
  console.log("b4 get user media");
  // .catch(errorFunction)
  let stream = await navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(successFunction)
    .then(errorFunction);
  console.log("hello");
  // .then(successFunction)
  // .catch(errorFunction);
}

export default breath;

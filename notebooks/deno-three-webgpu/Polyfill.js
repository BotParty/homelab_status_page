// Polyfill.js
// This file sets up global mocks so that WebGPURenderer thinks it's running in a browser.

globalThis.window = globalThis;
globalThis.document = {
  createElement: (tagName) => {
    if (tagName === "canvas") {
      return new FakeCanvas();
    }
    return {};
  },
};

// A fake canvas class that tries to emulate what WebGPU expects.
class FakeCanvas {
  getContext(type) {
    if (type === "webgpu") {
      return fakeGPUCanvasContext;
    }
    return null;
  }
}

// We will create a fake GPUCanvasContext once we have a device.
let fakeGPUCanvasContext = null;

// Mock navigator.gpu
globalThis.navigator = {
  gpu: {
    async requestAdapter() {
      // In Deno, you can get the adapter using Deno's WebGPU API directly.
      // According to Deno's documentation, this might look like:
      const adapter = await navigator.gpu.requestAdapter({});
      return adapter;
    },
  },
};

// // Polyfill.js continued
// navigator.gpu.requestAdapter = async () => {
//   const adapter = await Deno.gpu.requestAdapter({});
//   return adapter;
// };

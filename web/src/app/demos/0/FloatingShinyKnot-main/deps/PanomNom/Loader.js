import { Stitcher } from "./Stitcher.js";

class Loader {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.stitcher = new Stitcher(this.canvas);
  }

  async load() {}

  onProgress(cb) {
    this.stitcher.onProgress = cb;
  }
}

export { Loader };

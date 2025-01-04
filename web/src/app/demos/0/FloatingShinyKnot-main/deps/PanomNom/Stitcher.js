class Stitcher {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.queue = [];
    this.toLoad = 0;
    this.loaded = 0;
    this.onProgress = null;
  }

  reset() {
    this.toLoad = 0;
    this.loaded = 0;
  }

  addTileTask(task) {
    this.queue.push(task);
    this.toLoad++;
  }

  updateProgress() {
    const p = (this.loaded * 100) / this.toLoad;
    if (this.onProgress) {
      this.onProgress(p);
    }
  }

  processQueue() {
    this.updateProgress();

    if (this.loaded === this.toLoad) {
      if (this.resolve) {
        this.resolve(true);
        this.resolve = null;
      }
      return;
    }

    if (this.queue.length === 0) {
      return;
    }
    const task = this.queue.shift();

    let img = new Image();
    img.decoding = "async";
    img.addEventListener("load", () => {
      this.loaded++;

      this.ctx.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        task.x,
        task.y,
        512,
        512
      );
      this.processQueue();

      img = null;
    });

    img.addEventListener("error", (e) => {
      this.reject("NO_IMAGE");
      img = null;
    });

    img.crossOrigin = "";
    img.src = task.url;
  }

  async process() {
    this.toLoad = this.queue.length;
    this.loaded = 0;
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      const concurrent = Math.min(this.queue.length, 50);
      for (let i = 0; i < concurrent; i++) {
        this.processQueue();
      }
    });
  }
}

export { Stitcher };

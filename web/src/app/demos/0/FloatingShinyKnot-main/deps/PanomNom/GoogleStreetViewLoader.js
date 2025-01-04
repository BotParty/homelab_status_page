import { Loader } from "./Loader.js";
import { getPanoramaById, getGoogleStreetViewService } from "./utils.js";

class GoogleStreetViewLoader extends Loader {
  constructor() {
    super();

    this.service = getGoogleStreetViewService();
    this.zoom = 1;
    this.metadata = {};
  }

  async load(id, zoom = 1) {
    this.zoom = zoom;
    this.panoId = id;

    const metadata = await getPanoramaById(id);
    this.metadata = metadata;

    const aspectRatio =
      this.metadata.tiles.worldSize.width /
      this.metadata.tiles.worldSize.height;

    let widths;
    let levels;
    if (this.metadata.tiles.worldSize.width / 512 === 32) {
      levels = [1, 2, 4, 8, 16, 32];
      widths = [512, 1024, 2048, 4096, 8192, 16384];
    } else {
      levels = [1, 2, 4, 7, 13, 26];
      widths = [416, 832, 1664, 3328, 6656, 13312];
    }

    this.canvas.width = widths[zoom];
    this.canvas.height = this.canvas.width / aspectRatio;

    const tileWidth = this.metadata.tiles.tileSize.width;
    const tileHeight = this.metadata.tiles.tileSize.height;

    const w = levels[zoom];
    const h = w / aspectRatio;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const url = `https://geo0.ggpht.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&panoid=${id}&output=tile&x=${x}&y=${y}&zoom=${zoom}&nbt&fover=2`;

        this.stitcher.addTileTask({
          url: url,
          x: x * tileWidth,
          y: y * tileHeight,
        });
      }
    }

    const res = await this.stitcher.process();
    return res;
  }
}

export { GoogleStreetViewLoader };

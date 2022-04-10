const SCALE = 16;
const PIXEL_SIZE = 4;

export class Renderer {
  constructor(canvas, tiles) {
    this.canvas = canvas;
    this.tiles = tiles;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.imageRendering = 'pixelated';
    this.ctx = canvas.getContext('2d', {antialias: false, depth: false});
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
  resize() {
    const {canvas} = this;
    this.width = canvas.width = canvas.parentNode.clientWidth / PIXEL_SIZE;
    this.height = canvas.height = canvas.parentNode.clientHeight / PIXEL_SIZE;
  }
  render({you, blocks}) {
    const {ctx, width, height, tiles} = this;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(
      Math.round(width / 2 - you.x * SCALE - SCALE / 2),
      Math.round(height / 2 - you.y * SCALE - SCALE / 2)
    );

    ctx.fillStyle = 'blue';
    for (const {x, y, code} of blocks) {
      if (tiles[code]) ctx.drawImage(tiles[code].canvas, x * SCALE, y * SCALE);
      else ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
    }

    if (tiles.w) {
      ctx.drawImage(
        tiles.w.canvas,
        Math.round(you.x * SCALE),
        Math.round(you.y * SCALE)
      );
    } else {
      ctx.fillStyle = 'red';
      ctx.fillRect(you.x * SCALE, you.y * SCALE, SCALE, SCALE);
    }

    ctx.restore();
  }
}

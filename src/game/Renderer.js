const SCALE = 16;

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.imageRendering = 'pixelated';
    this.ctx = canvas.getContext('2d', {antialias: false, depth: false});
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
  resize() {
    const {canvas} = this;
    this.width = canvas.width = canvas.parentNode.clientWidth / 4;
    this.height = canvas.height = canvas.parentNode.clientHeight / 4;
  }
  render({you, blocks}) {
    const {ctx, width, height} = this;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(
      Math.round(width / 2 - you.x * SCALE - SCALE / 2),
      Math.round(height / 2 - you.y * SCALE - SCALE / 2)
    );

    for (const {x, y, color} of blocks) {
      ctx.fillStyle = color;
      ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(
      Math.round(you.x * SCALE),
      Math.round(you.y * SCALE),
      SCALE,
      SCALE
    );

    ctx.restore();
  }
}

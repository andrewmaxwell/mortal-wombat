const SCALE = 32;

const shadowText = (ctx, text, x, y, color, offset) => {
  ctx.fillStyle = 'black';
  ctx.fillText(text, x + offset, y + offset);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', {antialias: false, depth: false});
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
  resize() {
    const {canvas} = this;
    this.width = canvas.width = innerWidth;
    this.height = canvas.height = innerHeight;
  }
  render({you, health, blocks}) {
    const {ctx, width, height} = this;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(
      width / 2 - you.x * SCALE - SCALE / 2,
      height / 2 - you.y * SCALE - SCALE / 2
    );

    for (const {x, y, type} of Object.values(blocks)) {
      ctx.fillStyle = type.color;
      ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(you.x * SCALE, you.y * SCALE, SCALE, SCALE);
    const angle = Math.atan2(you.dirY, you.dirX);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo((you.x + 0.5) * SCALE, (you.y + 0.5) * SCALE);
    ctx.lineTo(
      (you.x + 0.5) * SCALE + (Math.cos(angle) * SCALE) / 2,
      (you.y + 0.5) * SCALE + (Math.sin(angle) * SCALE) / 2
    );
    ctx.stroke();

    ctx.restore();

    // HUD
    if (health > 0) {
      ctx.strokeStyle = 'white';
      ctx.fillStyle = health > 30 ? 'green' : 'red';
      ctx.fillRect(10, 10, health * 5, 20);
      ctx.strokeRect(10, 10, 100 * 5, 20);
      ctx.fillStyle = 'white';
      ctx.textBaseline = 'top';
      ctx.font = '18px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(Math.round(health) + '%', 12, 11);
    } else {
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.font = '120px sans-serif';
      shadowText(ctx, 'you dead', innerWidth / 2, innerHeight / 2, 'red', 5);
      ctx.font = '32px sans-serif';
      shadowText(
        ctx,
        'press R to try again',
        innerWidth / 2,
        innerHeight / 2 + 60,
        '#AFF',
        3
      );
    }
  }
}

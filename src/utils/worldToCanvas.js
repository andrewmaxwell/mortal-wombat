import {indexBy, objToArr} from '../utils';

// One pixel per tile, scaled down (never up) to fit maxWidth x maxHeight.
// Some worlds span tens of thousands of tiles, which is past what a canvas can hold.
export const worldToCanvas = (
  world,
  tileTypes,
  canvas = document.createElement('canvas'),
  {maxWidth = Infinity, maxHeight = Infinity} = {},
) => {
  const tileTypeIndex = indexBy((t) => t.id, objToArr(tileTypes));
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const key in world) {
    const {x, y} = world[key];
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  if (minX === Infinity) {
    canvas.width = canvas.height = 0;
    return canvas;
  }
  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  const scale = Math.min(1, maxWidth / width, maxHeight / height);
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const ctx = canvas.getContext('2d');
  for (const key in world) {
    const {x, y, tileType} = world[key];
    ctx.fillStyle = tileTypeIndex[tileType]?.color;
    ctx.fillRect(
      Math.floor((x - minX) * scale),
      Math.floor((y - minY) * scale),
      1,
      1,
    );
  }
  return canvas;
};

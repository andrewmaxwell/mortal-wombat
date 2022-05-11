import {indexBy, objToArr} from '../utils';

export const worldToCanvas = (
  world,
  tileTypes,
  canvas = document.createElement('canvas')
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
  canvas.width = maxX - minX + 1;
  canvas.height = maxY - minY + 1;
  const ctx = canvas.getContext('2d');
  for (const key in world) {
    const {x, y, tileType} = world[key];
    ctx.fillStyle = tileTypeIndex[tileType]?.color;
    ctx.fillRect(x - minX, y - minY, 1, 1);
  }
  return canvas;
};

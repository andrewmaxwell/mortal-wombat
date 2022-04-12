export const graphicToCanvas = ({colors, frames}) => {
  const canvas = document.createElement('canvas');
  canvas.width = frames[0][0].length;
  canvas.height = frames[0].length;
  const ctx = canvas.getContext('2d');
  for (let y = 0; y < frames[0].length; y++) {
    for (let x = 0; x < frames[0][y].length; x++) {
      if (frames[0][y][x]) {
        ctx.fillStyle = colors[frames[0][y][x] - 1];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
  return canvas;
};

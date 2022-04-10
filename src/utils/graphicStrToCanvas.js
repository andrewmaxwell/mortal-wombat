import LZString from 'lz-string';

export const graphicStrToCanvas = (str) => {
  const data = JSON.parse(LZString.decompressFromBase64(str));
  const canvas = document.createElement('canvas');
  canvas.width = data[0][0].length;
  canvas.height = data[0].length;
  const ctx = canvas.getContext('2d');
  for (let y = 0; y < data[0].length; y++) {
    for (let x = 0; x < data[0][y].length; x++) {
      if (data[0][y][x]) {
        ctx.fillStyle = data[0][y][x];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
  return {data, canvas};
};

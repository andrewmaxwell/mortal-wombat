import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

// Draws the world's tiles on a canvas the size of the window, which stays fast for worlds with
// tens of thousands of tiles. A tile type's image takes precedence over its color, and is
// scaled to fit the tile, like getBackground. A tile at (x, y) covers screen pixels from
// innerWidth / 2 + (x - xCoord) * scale, which is what getCoords in WorldEditor inverts.

const images = {};
const onImageLoad = new Set(); // canvases to redraw when an image finishes loading
const getImage = (url) => {
  if (!images[url]) {
    images[url] = new Image();
    images[url].onload = () => onImageLoad.forEach((redraw) => redraw());
    images[url].src = url;
  }
  return images[url];
};

const drawContained = (ctx, img, x, y, w, h) => {
  const s = Math.min(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * s;
  const dh = img.naturalHeight * s;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
};

export const TileCanvas = ({world, tileTypeIndex, xCoord, yCoord, scale}) => {
  const canvasRef = useRef();
  const [size, setSize] = useState({width: innerWidth, height: innerHeight});
  const latest = useRef();
  latest.current = {world, tileTypeIndex, xCoord, yCoord, scale, size};

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const {world, tileTypeIndex, xCoord, yCoord, scale, size} = latest.current;
    const dpr = devicePixelRatio || 1;
    const width = Math.round(size.width * dpr);
    const height = Math.round(size.height * dpr);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    // in device pixels, rounded so neighboring tiles meet without seams
    const toX = (x) =>
      Math.round((size.width / 2 + (x - xCoord) * scale) * dpr);
    const toY = (y) =>
      Math.round((size.height / 2 + (y - yCoord) * scale) * dpr);
    const minX = Math.floor(xCoord - size.width / 2 / scale) - 1;
    const maxX = Math.ceil(xCoord + size.width / 2 / scale);
    const minY = Math.floor(yCoord - size.height / 2 / scale) - 1;
    const maxY = Math.ceil(yCoord + size.height / 2 / scale);

    // per tile type: its loaded image, or a valid color (an invalid one draws nothing, like CSS)
    const looks = {};
    const lookOf = (type) => {
      if (looks[type.id] !== undefined) return looks[type.id];
      let look = null;
      if (type.image) {
        const img = getImage(type.image);
        if (img.complete && img.naturalWidth) look = {img};
      } else if (type.color) {
        ctx.fillStyle = 'transparent';
        ctx.fillStyle = type.color;
        look = {color: ctx.fillStyle};
      }
      return (looks[type.id] = look);
    };

    for (const key in world) {
      const tile = world[key];
      const x = +tile.x;
      const y = +tile.y;
      if (x < minX || x > maxX || y < minY || y > maxY) continue;
      const type = tileTypeIndex[tile.tileType];
      const look = type && lookOf(type);
      if (!look) continue;
      const x0 = toX(x);
      const y0 = toY(y);
      const w = toX(x + 1) - x0;
      const h = toY(y + 1) - y0;
      if (look.img) drawContained(ctx, look.img, x0, y0, w, h);
      else {
        ctx.fillStyle = look.color;
        ctx.fillRect(x0, y0, w, h);
      }
    }
  }, []);

  // before the browser paints, so tiles move in step with the cursors and ghost tile
  useLayoutEffect(draw, [world, tileTypeIndex, xCoord, yCoord, scale, size]);

  useEffect(() => {
    let frame;
    const redraw = () => {
      frame ??= requestAnimationFrame(() => {
        frame = undefined;
        draw();
      });
    };
    const onResize = () => setSize({width: innerWidth, height: innerHeight});
    onImageLoad.add(redraw);
    addEventListener('resize', onResize);
    return () => {
      onImageLoad.delete(redraw);
      removeEventListener('resize', onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="tileCanvas" />;
};

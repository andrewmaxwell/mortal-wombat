import LZString from 'lz-string';
import {useEffect, useRef, useState} from 'react';

/*
TODO
Frames
Undo/Redo

*/

const assocPath = ([first, ...rest], val, obj) => {
  const copy = Array.isArray(obj) ? [...obj] : {...obj};
  copy[first] = rest.length ? assocPath(rest, val, copy[first]) : val;
  return copy;
};

const getColors = (grid) => {
  const vals = grid.flat().flat();
  const counts = {};
  for (const x of vals) {
    if (x) counts[x] = (counts[x] || 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map((x) => x[0]);
};

export const TileEditor = ({rows, cellSize, input}) => {
  const ref = useRef();
  const [grids, setGrids] = useState([
    new Array(rows).fill(new Array(rows).fill(0)),
  ]);
  const [frame] = useState(0);
  const [color, setColor] = useState('#000000');
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    setGrids(input);
  }, input);

  useEffect(() => {
    const canvas = ref.current;
    canvas.width = rows * cellSize;
    canvas.height = rows * cellSize;
  }, [rows, cellSize]);

  useEffect(() => {
    const canvas = ref.current;
    const W = rows * cellSize;
    const H = rows * cellSize;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rows; j++) {
        if (grids[frame][i][j]) {
          ctx.fillStyle = grids[frame][i][j];
          ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
      }
    }

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0.25;
    for (let i = 0; i <= rows; i++) {
      const x = i * cellSize;
      ctx.moveTo(0, x);
      ctx.lineTo(W, x);
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
    }
    ctx.stroke();
  }, [grids, frame]);

  const canvasMouseDown = (e) => {
    const x = Math.floor(e.nativeEvent.offsetX / cellSize);
    const y = Math.floor(e.nativeEvent.offsetY / cellSize);
    if (grids[frame][y][x] === color) {
      setErasing(true);
      setGrids((g) => assocPath([frame, y, x], 0, g));
    } else {
      setGrids((g) => assocPath([frame, y, x], color, g));
    }
  };

  const canvasMouseUp = () => {
    setErasing(false);
  };

  const canvasMouseMove = (e) => {
    if (e.nativeEvent.which === 1) {
      const x = Math.floor(e.nativeEvent.offsetX / cellSize);
      const y = Math.floor(e.nativeEvent.offsetY / cellSize);
      if (erasing) {
        setGrids((g) => assocPath([frame, y, x], 0, g));
      } else {
        setGrids((g) => assocPath([frame, y, x], color, g));
      }
    }
  };

  return (
    <div style={{border: '1px solid rgba(0,0,0,0.3)', padding: 10}}>
      <h3 style={{margin: 0}}>Tile Editor</h3>
      <canvas
        ref={ref}
        style={{display: 'block'}}
        onMouseDown={canvasMouseDown}
        onMouseUp={canvasMouseUp}
        onMouseMove={canvasMouseMove}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{width: 32, height: 32, padding: 0}}
      />
      {getColors(grids)
        .filter((c) => c !== color)
        .map((color) => (
          <button
            key={color}
            style={{
              background: color,
              width: 20,
              height: 20,
              border: 0,
              margin: 2,
            }}
            onClick={() => setColor(color)}
          />
        ))}
      <div>
        Copy and paste this into the &quot;Graphic&quot; column of the
        &quot;Tiles&quot; sheet to save it:
        <textarea
          style={{width: '100%', height: 50}}
          readOnly
          value={LZString.compressToBase64(JSON.stringify(grids))}
        ></textarea>
      </div>
    </div>
  );
};

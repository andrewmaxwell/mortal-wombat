import {useCallback, useEffect, useRef, useState} from 'react';
import {assocPath} from '../utils';

/*
TODO
Undo/Redo
*/

const getColors = (frames) => {
  const vals = frames?.flat().flat();
  const counts = {};
  for (const x of vals) {
    if (x) counts[x] = (counts[x] || 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map((x) => x[0]);
};

export const TileEditor = ({rows, cellSize, input, onChange}) => {
  const ref = useRef();
  const [frames, setFrames] = useState([
    new Array(rows).fill(new Array(rows).fill(0)),
  ]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [color, setColor] = useState('#000000');
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    setFrames(
      input.frames.map((f) =>
        f.map((r) => r.map((v) => (v ? input.colors[v - 1] : v)))
      )
    );
    if (input.colors[0]) setColor(input.colors[0]);
  }, [input]);

  const colors = getColors(frames);
  // useEffect(() => {
  //   onChange({
  //     colors,
  //     frames: frames.map((f) =>
  //       f.map((r) => r.map((v) => colors.indexOf(v) + 1))
  //     ),
  //   });
  // }, [frames]);

  useEffect(() => {
    const canvas = ref.current;
    const W = (canvas.width = rows * cellSize);
    const H = (canvas.height = rows * cellSize);
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rows; j++) {
        if (frames[currentFrame][i][j]) {
          ctx.fillStyle = frames[currentFrame][i][j];
          ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
      }
    }

    // draw cell lines
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
  }, [rows, cellSize, frames, currentFrame]);

  const canvasMouseDown = useCallback(
    (e) => {
      const x = Math.floor(e.nativeEvent.offsetX / cellSize);
      const y = Math.floor(e.nativeEvent.offsetY / cellSize);
      if (frames[currentFrame][y][x] === color) {
        setErasing(true);
        setFrames((g) => assocPath([currentFrame, y, x], 0, g));
      } else {
        setFrames((g) => assocPath([currentFrame, y, x], color, g));
      }
    },
    [frames, currentFrame, color, cellSize]
  );

  const canvasMouseUp = useCallback(() => {
    setErasing(false);
  }, []);

  const canvasMouseMove = useCallback(
    (e) => {
      if (e.nativeEvent.which === 1) {
        const x = Math.floor(e.nativeEvent.offsetX / cellSize);
        const y = Math.floor(e.nativeEvent.offsetY / cellSize);
        if (erasing) {
          setFrames((g) => assocPath([currentFrame, y, x], 0, g));
        } else {
          setFrames((g) => assocPath([currentFrame, y, x], color, g));
        }
      }
    },
    [cellSize, erasing, currentFrame, color]
  );

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
      {colors
        .filter((c) => c !== color)
        .map((color) => (
          <button
            key={color}
            className="colorButton"
            style={{background: color}}
            onClick={() => setColor(color)}
          />
        ))}
      {frames.map((f, i) => (
        <div
          key={i}
          style={{
            background: currentFrame === i ? 'blue' : 'none',
            cursor: currentFrame === i ? 'inherit' : 'pointer',
          }}
        >
          {currentFrame === i && (
            <div style={{float: 'right'}}>
              {i > 0 && (
                <a
                  onClick={() => {
                    setFrames((f) => {
                      const copy = [...f];
                      [copy[i], copy[i - 1]] = [copy[i - 1], copy[i]];
                      return copy;
                    });
                    setCurrentFrame(i - 1);
                  }}
                >
                  move up
                </a>
              )}
              {i < frames.length - 1 && (
                <a
                  onClick={() => {
                    setFrames((f) => {
                      const copy = [...f];
                      [copy[i], copy[i + 1]] = [copy[i + 1], copy[i]];
                      return copy;
                    });
                    setCurrentFrame(i + 1);
                  }}
                >
                  move down
                </a>
              )}
              <a
                onClick={() => {
                  setFrames((f) =>
                    f.flatMap((x, j) => (i === j ? [x, x] : [x]))
                  );
                  setCurrentFrame(i + 1);
                }}
              >
                copy
              </a>
              {frames.length > 1 && (
                <a
                  onClick={() => {
                    setFrames((f, j) => i !== j);
                    setCurrentFrame(0);
                  }}
                >
                  delete
                </a>
              )}
            </div>
          )}
          <a onClick={() => setCurrentFrame(i)}>Frame {i + 1}</a>
        </div>
      ))}
      {/* <textarea
        readOnly
        value={JSON.stringify({
          colors,
          frames: frames.map((f) =>
            f.map((r) => r.map((v) => colors.indexOf(v) + 1))
          ),
        })}
      /> */}
    </div>
  );
};

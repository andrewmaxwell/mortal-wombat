import {useCallback, useEffect, useRef} from 'react';
import {placeTile} from '../db/world';
import './worldEditor.css';

const getCoords = (e, scale, xCoord, yCoord) => ({
  x: Math.floor((e.clientX - innerWidth / 2) / scale) + xCoord,
  y: Math.floor((e.clientY - innerHeight / 2) / scale) + yCoord,
});

export const WorldEditor = ({
  world,
  selectedTileType,
  tileTypeIndex,
  onError,
  xCoord,
  yCoord,
  scale,
}) => {
  const ghostRef = useRef();

  const onClick = useCallback(
    (e) => {
      const {x, y} = getCoords(e, scale, xCoord, yCoord);
      if (world[`${x}_${y}`]?.tileType !== selectedTileType.id) {
        placeTile(x, y, selectedTileType.id, onError);
      }
    },
    [selectedTileType, onError, scale, xCoord, yCoord]
  );

  // this is much more performant than keeping mouse coords in state!
  useEffect(() => {
    if (!selectedTileType) return;
    const s = ghostRef.current?.style;
    s.backgroundColor = selectedTileType.color || 'transparent';
    const mouseMove = (e) => {
      const {x, y} = getCoords(e, scale, xCoord, yCoord);
      s.left = x * scale + 'px';
      s.top = y * scale + 'px';
      if (e.buttons) onClick(e);
    };
    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, [
    selectedTileType,
    ghostRef,
    xCoord,
    yCoord,
    scale,
    innerWidth,
    innerHeight,
  ]);

  const cx = innerWidth / 2 - xCoord * scale;
  const cy = innerHeight / 2 - yCoord * scale;

  return (
    <div className="world" onClick={selectedTileType ? onClick : undefined}>
      <div
        className="viewBox"
        style={{
          transform: `translate(${cx}px,${cy}px)`,
        }}
      >
        {Object.entries(world).map(([key, {x, y, tileType}]) => (
          <div
            key={key}
            className="tile"
            style={{
              left: x * scale + 'px',
              top: y * scale + 'px',
              backgroundColor: tileTypeIndex[tileType]?.color,
            }}
          />
        ))}

        {selectedTileType && (
          <div ref={ghostRef} className="ghost tile">
            {selectedTileType.icon && <i>{selectedTileType.icon}</i>}
          </div>
        )}
      </div>
    </div>
  );
};

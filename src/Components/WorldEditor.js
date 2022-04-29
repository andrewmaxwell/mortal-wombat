import {useRef} from 'react';
import {updateWithHistory} from '../firebase';
import './worldEditor.css';

const placeTile = (x, y, id, user, onError) =>
  updateWithHistory(
    {[`world/${x}_${y}`]: id ? {x, y, tileType: id} : null},
    user,
    onError
  );

const getCoords = (e, scale, xCoord, yCoord) => ({
  x: Math.floor((e.clientX - innerWidth / 2) / scale) + xCoord,
  y: Math.floor((e.clientY - innerHeight / 2) / scale) + yCoord,
});

export const getBackground = (type) => ({
  background: type.image
    ? `no-repeat center/contain url(${type.image})`
    : type.color,
});

export const WorldEditor = ({
  world,
  selectedTileType,
  tileTypeIndex,
  onError,
  xCoord,
  yCoord,
  scale,
  user,
}) => {
  // using a ref is much more performant than keeping mouse coords in state
  const ghostRef = useRef();

  const onClick = (e) => {
    const {x, y} = getCoords(e, scale, xCoord, yCoord);
    if (world[`${x}_${y}`]?.tileType !== selectedTileType.id) {
      placeTile(x, y, selectedTileType.id, user, onError);
    }
  };

  const onMouseMove = (e) => {
    const {x, y} = getCoords(e, scale, xCoord, yCoord);
    const s = ghostRef.current?.style;
    s.left = x * scale + 'px';
    s.top = y * scale + 'px';
    if (e.buttons) onClick(e);
  };

  const cx = innerWidth / 2 - xCoord * scale;
  const cy = innerHeight / 2 - yCoord * scale;

  return (
    <div
      className="world"
      onClick={selectedTileType ? onClick : undefined}
      onMouseMove={selectedTileType ? onMouseMove : undefined}
    >
      <div
        className="viewBox"
        style={{
          transform: `translate(${cx}px,${cy}px)`,
        }}
      >
        {Object.entries(world)
          .filter(([key, t]) => {
            if (!tileTypeIndex[t.tileType]) {
              console.log('>>>', key, t); // TODO: delete the ones that get logged out here
              return false;
            }
            return true;
          })
          .map(([key, {x, y, tileType}]) => (
            <div
              key={key}
              className="tile"
              style={{
                left: x * scale + 'px',
                top: y * scale + 'px',
                ...getBackground(tileTypeIndex[tileType]),
              }}
            />
          ))}

        {selectedTileType && (
          <div
            ref={ghostRef}
            className="ghost tile"
            style={getBackground(selectedTileType)}
          ></div>
        )}
      </div>
    </div>
  );
};

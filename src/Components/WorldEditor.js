import {useMemo, useRef} from 'react';
import {updateWithHistory} from '../firebase';
import {indexBy, objToArr} from '../utils';
import './worldEditor.css';

const placeTile = (x, y, id, user, onError) =>
  updateWithHistory(
    {[`world/${x}_${y}`]: id === '_delete' ? null : {x, y, tileType: id}},
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
  tileTypes,
  selectedTileTypeId,
  onError,
  xCoord,
  yCoord,
  scale,
  user,
}) => {
  // using a ref is much more performant than keeping mouse coords in state
  const ghostRef = useRef();

  const tileTypeIndex = useMemo(
    () => indexBy((t) => t.id, objToArr(tileTypes)),
    [tileTypes]
  );

  const onClick = (e) => {
    const {x, y} = getCoords(e, scale, xCoord, yCoord);
    const currentType = world[`${x}_${y}`]?.tileType;
    const t = e.shiftKey ? '_delete' : selectedTileTypeId;
    if ((currentType || t !== '_delete') && currentType !== t) {
      placeTile(x, y, t, user, onError);
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
      onClick={selectedTileTypeId ? onClick : undefined}
      onMouseMove={selectedTileTypeId ? onMouseMove : undefined}
    >
      <div style={{transform: `translate(${cx}px,${cy}px)`}}>
        {Object.entries(world)
          .filter(([key, t]) => {
            if (!tileTypeIndex[t.tileType]) {
              console.log('BAD DATA', key, t); // TODO: delete the ones that get logged out here
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

        {selectedTileTypeId && (
          <div
            ref={ghostRef}
            className="ghost tile"
            style={getBackground(tileTypeIndex[selectedTileTypeId])}
          ></div>
        )}
      </div>
    </div>
  );
};

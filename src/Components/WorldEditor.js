import {serverTimestamp} from 'firebase/database';
import {memo, useCallback, useMemo, useRef} from 'react';
import {update} from '../firebase';
import {setCursor} from '../hooks/useCursors';
import {indexBy, objToArr} from '../utils';
import {Cursors} from './Cursors';
import './worldEditor.css';

const placeTile = (x, y, id, user, onError) =>
  update(
    {
      [`world/${x}_${y}`]:
        id === '_delete'
          ? null
          : {x, y, tileType: id, user: user.email, tstamp: serverTimestamp()},
    },
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

const getTitle = (user, tstamp, userIndex) => {
  if (!user || !tstamp) return '';
  const name = userIndex[user]?.name || user;
  const date = new Date(tstamp).toLocaleString();
  return `Placed by ${name} on ${date}`;
};

const Tiles = ({world, tileTypeIndex, scale, userIndex}) =>
  Object.entries(world)
    .filter(([key, t]) => {
      if (!tileTypeIndex[t.tileType]) {
        console.log('BAD DATA', key, t); // TODO: delete the ones that get logged out here
        return false;
      }
      return true;
    })
    .map(([key, {x, y, tileType, user, tstamp}]) => (
      <div
        key={key}
        className="tile"
        title={getTitle(user, tstamp, userIndex)}
        style={{
          left: x * scale + 'px',
          top: y * scale + 'px',
          ...getBackground(tileTypeIndex[tileType]),
        }}
      />
    ));

const TilesMemo = memo(Tiles);

export const WorldEditor = ({
  world,
  tileTypes,
  selectedTileTypeId,
  onError,
  xCoord,
  yCoord,
  scale,
  user,
  cursors,
  userIndex,
}) => {
  // using a ref is much more performant than keeping mouse coords in state
  const ghostRef = useRef();

  const tileTypeIndex = useMemo(
    () => indexBy((t) => t.id, objToArr(tileTypes)),
    [tileTypes]
  );

  const onClick = (e) => {
    const {x, y} = getCoords(e, scale, xCoord, yCoord);
    if (e.altKey) {
      window.open(
        location.href.replace(/\?.*/, '') + '#' + btoa(JSON.stringify({x, y})),
        '_blank'
      );
      e.preventDefault();
      return false;
    } else if (selectedTileTypeId) {
      const currentType = world[`${x}_${y}`]?.tileType;
      const t = e.shiftKey ? '_delete' : selectedTileTypeId;
      if ((currentType || t !== '_delete') && currentType !== t) {
        placeTile(x, y, t, user, onError);
      }
    }
  };

  const onMouseMove = useCallback(
    (e) => {
      const {x, y} = getCoords(e, scale, xCoord, yCoord);
      if (selectedTileTypeId) {
        const s = ghostRef.current?.style;
        s.left = x * scale + 'px';
        s.top = y * scale + 'px';
        if (e.buttons) onClick(e);
      }
      setCursor(user, x, y, xCoord, yCoord, scale, onError);
    },
    [scale, xCoord, yCoord, selectedTileTypeId, user]
  );

  const cx = innerWidth / 2 - xCoord * scale;
  const cy = innerHeight / 2 - yCoord * scale;

  return (
    <div
      id="worldEditor"
      className="world"
      onClick={onClick}
      onMouseMove={onMouseMove}
    >
      <div style={{transform: `translate(${cx}px,${cy}px)`}}>
        <Cursors cursors={cursors} scale={scale} userIndex={userIndex} />

        <TilesMemo {...{world, tileTypeIndex, scale, userIndex}} />

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

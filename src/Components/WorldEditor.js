import {serverTimestamp} from 'firebase/database';
import {memo, useCallback, useMemo, useRef} from 'react';
import {update} from '../firebase';
import {setCursor} from '../hooks/useCursors';
import {indexBy, objToArr} from '../utils';
import {getBackground} from '../utils/getBackground';
import {CSS_SIZE, Cursors} from './Cursors';
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

const getTitle = (user, tstamp, userIndex) => {
  if (!user || !tstamp) return '';
  const name = userIndex[user]?.name || user;
  const date = new Date(tstamp).toLocaleString();
  return `Placed by ${name} on ${date}`;
};

const Tiles = ({world, tileTypeIndex, userIndex}) =>
  Object.entries(world).map(([key, {x, y, tileType, user, tstamp}]) => (
    <div
      key={key}
      className="tile"
      title={getTitle(user, tstamp, userIndex)}
      style={{
        transform: `translate(${x * CSS_SIZE}px, ${y * CSS_SIZE}px)`,
        background: getBackground(tileTypeIndex[tileType]),
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

  // This checks for invalid tiles in the world and outputs them along with an update object
  // useEffect(() => {
  //   const badData = Object.entries(world).filter(
  //     ([, t]) => !tileTypeIndex[t.tileType]
  //   );
  //   if (badData.length) {
  //     console.log(
  //       'This is bad data',
  //       badData.map((p) => p[1]),
  //       JSON.stringify(
  //         Object.fromEntries(badData.map(([key]) => [`world/${key}`, null]))
  //       )
  //     );
  //   }
  // }, [world, tileTypeIndex]);

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
        s.transform = `translate(${x * CSS_SIZE}px, ${y * CSS_SIZE}px)`;
        if (e.buttons) onClick(e);
      }
      setCursor(user, x, y, xCoord, yCoord, scale, onError);
    },
    [scale, xCoord, yCoord, selectedTileTypeId, user]
  );

  const cx = innerWidth / 2 - xCoord * CSS_SIZE;
  const cy = innerHeight / 2 - yCoord * CSS_SIZE;

  return (
    <div
      id="worldEditor"
      className="world"
      onClick={onClick}
      onMouseMove={onMouseMove}
    >
      <div
        style={{
          transformOrigin: `${innerWidth / 2}px ${innerHeight / 2}px`,
          transform: `scale(${scale / CSS_SIZE}) translate(${cx}px,${cy}px)`,
        }}
      >
        <Cursors cursors={cursors} userIndex={userIndex} scale={scale} />

        <TilesMemo {...{world, tileTypeIndex, userIndex}} />

        {selectedTileTypeId && (
          <div
            ref={ghostRef}
            className="ghost tile"
            style={{
              background: getBackground(tileTypeIndex[selectedTileTypeId]),
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

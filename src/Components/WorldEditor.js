import {memo, useCallback, useMemo, useRef} from 'react';
import {setCursor} from '../hooks/useCursors';
import {indexBy, objToArr} from '../utils';
import {getBackground} from '../utils/getBackground';
import {saveTile} from '../utils/saveTile';
import {timeAgo} from '../utils/timeAgo';
import {CSS_SIZE, Cursors} from './Cursors';
import './worldEditor.css';

const getCoords = (e, scale, xCoord, yCoord) => ({
  x: Math.floor((e.clientX - innerWidth / 2) / scale) + xCoord,
  y: Math.floor((e.clientY - innerHeight / 2) / scale) + yCoord,
});

const getTitle = (user, tstamp, userIndex) => {
  if (!user || !tstamp) return '';
  const name = userIndex[user]?.name || user;
  return `Placed by ${name} ${timeAgo(Date.now() - tstamp)}`;
};

const Tiles = ({world, tileTypeIndex, userIndex, setTileLogicCoords}) =>
  Object.entries(world).map(([key, {x, y, tileType, user, tstamp}]) => (
    <div
      key={key}
      className="tile"
      title={getTitle(user, tstamp, userIndex)}
      style={{
        transform: `translate(${x * CSS_SIZE}px, ${y * CSS_SIZE}px)`,
        background: getBackground(tileTypeIndex[tileType]),
      }}
      onDoubleClick={() => setTileLogicCoords({x, y})}
    />
  ));

const TilesMemo = memo(Tiles);

export const WorldEditor = ({
  world,
  tileTypes,
  selectedTileTypeId,
  onError,
  worldId,
  xCoord,
  yCoord,
  scale,
  user,
  cursors,
  userIndex,
  tileLogicCoords,
  setTileLogicCoords,
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
        location.href.replace(/\?.*/, '') +
          '#' +
          btoa(JSON.stringify({worldId, x, y})),
        '_blank'
      );
      e.preventDefault();
      return false;
    } else {
      const currentType = world[`${x}_${y}`]?.tileType;
      const t = e.shiftKey ? '_delete' : selectedTileTypeId;
      if (t && (currentType || t !== '_delete') && currentType !== t) {
        saveTile(worldId, {x, y, tileType: t}, onError);
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
      setCursor(user, x, y, worldId, xCoord, yCoord, scale, onError);
    },
    [scale, worldId, xCoord, yCoord, selectedTileTypeId, user]
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

        <TilesMemo {...{world, tileTypeIndex, userIndex, setTileLogicCoords}} />

        {selectedTileTypeId && (
          <div
            ref={ghostRef}
            className="ghost tile"
            style={{
              background: getBackground(tileTypeIndex[selectedTileTypeId]),
            }}
          />
        )}
        {tileLogicCoords && (
          <div
            style={{
              transform: `translate(${tileLogicCoords.x * CSS_SIZE}px, ${
                tileLogicCoords.y * CSS_SIZE
              }px)`,
            }}
            className="selected tile"
          />
        )}
      </div>
    </div>
  );
};

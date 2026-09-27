import {getAuth} from 'firebase/auth';
import {serverTimestamp} from 'firebase/database';
import {useEffect, useRef, useState} from 'react';
import {defaultTileTypes} from '../defaults';
import {loadItem, update} from '../firebase';
import {guid} from '../utils';
import {mergeDeepLeft} from '../utils/mergeDeepLeft';
import {timeAgo} from '../utils/timeAgo';
import {worldToCanvas} from '../utils/worldToCanvas';
import './myWorlds.css';

const gotoWorld = (id) => {
  location.hash = `${id}/0/0/32`;
};

const createNewWorld = async () => {
  const worldGuid = guid();

  const worldName = prompt('Enter a name for your new world.');
  if (!worldName) return;

  await update({
    [`worlds/${worldGuid}`]: {
      worldName,
      lastEdited: serverTimestamp(),
      lastEditedBy: getAuth().currentUser.email,
    },
  });

  gotoWorld(worldGuid);
};

// collabitat

const WorldCanvas = ({world, tileTypes}) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (world && tileTypes) worldToCanvas(world, tileTypes, canvasRef.current);
  }, [world, tileTypes]);

  return <canvas ref={canvasRef}></canvas>;
};

const WorldItem = ({
  id,
  item: {lastEdited, worldName, lastEditedBy, world, tileTypes},
  userIndex,
  close,
}) => (
  <button
    className="worldButton"
    onClick={() => {
      gotoWorld(id);
      close();
    }}
  >
    <div className="canvasContainer">
      <WorldCanvas
        world={world}
        tileTypes={mergeDeepLeft(tileTypes, defaultTileTypes)}
      />{' '}
    </div>
    {worldName || '???'}
    {lastEdited && (
      <span className="lastEdited">
        last edited by{' '}
        {(userIndex[lastEditedBy]?.name || lastEditedBy || '???') +
          ' ' +
          timeAgo(Date.now() - lastEdited)}
      </span>
    )}
  </button>
);

const loadWorlds = async (setWorlds) => {
  setWorlds();
  setWorlds(await loadItem('worlds'));
};

export const MyWorlds = ({userIndex, close}) => {
  const [worlds, setWorlds] = useState();

  useEffect(() => {
    loadWorlds(setWorlds);
  }, []);

  return worlds ? (
    <div className="myWorlds">
      <div style={{float: 'right'}}>
        <button
          onClick={async () => {
            await createNewWorld();
            close();
          }}
        >
          <i className="fa-solid fa-circle-plus"></i> Create a New World
        </button>
      </div>
      <button onClick={() => loadWorlds(setWorlds)}>
        <i className="fa-solid fa-arrows-rotate"></i> Refresh List
      </button>

      {Object.entries(worlds)
        .sort((a, b) => b[1].lastEdited - a[1].lastEdited)
        .map(([key, item]) => (
          <WorldItem
            key={key}
            id={key}
            item={item}
            userIndex={userIndex}
            close={close}
          />
        ))}
    </div>
  ) : (
    <div className="fa-3x" style={{textAlign: 'center'}}>
      <i className="fa-solid fa-spinner fa-spin"></i>
    </div>
  );
};

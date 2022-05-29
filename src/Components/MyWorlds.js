import {getAuth} from 'firebase/auth';
import {serverTimestamp} from 'firebase/database';
import {useEffect, useRef, useState} from 'react';
import {loadData, update} from '../firebase';
import {guid} from '../utils';
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
  item: {lastEdited, worldName, lastEditedBy, world},
  userIndex,
  tileTypes,
}) => (
  <button className="worldButton" onClick={() => gotoWorld(id)}>
    <div className="canvasContainer">
      <WorldCanvas world={world} tileTypes={tileTypes} />{' '}
    </div>
    {worldName || '???'}
    {lastEdited && (
      <span className="lastEdited">
        last edited by {userIndex[lastEditedBy]?.name || lastEditedBy || '???'}{' '}
        on {new Date(lastEdited).toLocaleString()}
      </span>
    )}
  </button>
);

const loadWorlds = async (setWorlds) => {
  setWorlds();
  const {worlds} = await loadData(['worlds']);
  setWorlds(worlds);
};

export const MyWorlds = ({userIndex, tileTypes}) => {
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
            await loadWorlds(setWorlds);
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
            tileTypes={tileTypes}
          />
        ))}
    </div>
  ) : (
    <div className="fa-3x" style={{textAlign: 'center'}}>
      <i className="fa-solid fa-spinner fa-spin"></i>
    </div>
  );
};

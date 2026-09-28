import {getAuth} from 'firebase/auth';
import {serverTimestamp} from 'firebase/database';
import {useEffect, useState} from 'react';
import {loadItem, update} from '../firebase';
import {guid} from '../utils';
import {timeAgo} from '../utils/timeAgo';
import {renderThumbnail, worldIndexPath} from '../utils/worldIndex';
import './myWorlds.css';
import {editorName} from '../hooks/useUserIndex';

const gotoWorld = (id) => {
  location.hash = `${id}/0/0/32`;
};

const createNewWorld = async () => {
  const worldGuid = guid();

  const worldName = prompt('Enter a name for your new world.');
  if (!worldName) return;

  const summary = {
    worldName,
    lastEdited: serverTimestamp(),
    lastEditedBy: getAuth().currentUser.uid,
  };
  await update({
    [`worlds/${worldGuid}`]: summary,
    [worldIndexPath(worldGuid)]: summary,
  });

  gotoWorld(worldGuid);
};

// collabitat

// Worlds indexed before thumbnails existed: render one from the full world, once, and save it.
const MissingThumbnail = ({id}) => {
  const [src, setSrc] = useState();

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      loadItem(`worlds/${id}/world`),
      loadItem(`worlds/${id}/tileTypes`),
    ]).then(([world, tileTypes]) => {
      if (cancelled) return;
      const thumbnail = renderThumbnail(world || {}, tileTypes);
      if (!thumbnail) return;
      setSrc(thumbnail);
      update({[`${worldIndexPath(id)}/thumbnail`]: thumbnail});
    }, console.error);
    return () => {
      cancelled = true;
    };
  }, [id]);

  return src ? <img src={src} alt="" /> : null;
};

const WorldItem = ({
  id,
  item: {lastEdited, worldName, lastEditedBy, thumbnail},
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
      {thumbnail ? (
        <img src={thumbnail} alt="" />
      ) : (
        <MissingThumbnail id={id} />
      )}
    </div>
    {worldName || '???'}
    {lastEdited && (
      <span className="lastEdited">
        last edited by{' '}
        {editorName(userIndex, lastEditedBy) +
          ' ' +
          timeAgo(Date.now() - lastEdited)}
      </span>
    )}
  </button>
);

const loadWorlds = async (setWorlds) => {
  setWorlds();
  setWorlds((await loadItem('worldIndex')) || {});
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

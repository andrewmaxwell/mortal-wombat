import {getLatestTimestamp, sessionTimeOut} from '../hooks/useCursors';

export const HereNow = ({cursors, userIndex, worldId}) => {
  const latestTimestamp = getLatestTimestamp(cursors);
  return Object.entries(cursors)
    .filter((c) => latestTimestamp - c[1].tstamp < sessionTimeOut)
    .map(([key, {user, mouseX, mouseY}]) => (
      <div key={key} style={{margin: 5}}>
        {userIndex[user]?.name || user}
        {mouseX && mouseY ? (
          <a
            style={{margin: '0 10px'}}
            href={`#${worldId || ''}/${mouseX}/${mouseY}/32`}
          >
            go
          </a>
        ) : null}
      </div>
    ));
};

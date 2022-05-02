import {getLatestTimestamp, sessionTimeOut} from '../hooks/useCursors';

export const HereNow = ({cursors, userIndex}) => {
  const latestTimestamp = getLatestTimestamp(cursors);
  return Object.entries(cursors)
    .filter((c) => latestTimestamp - c[1].tstamp < sessionTimeOut)
    .sort((a, b) => b[1].tstamp - a[1].tstamp)
    .map(([key, {user, mouseX, mouseY}]) => (
      <div key={key} style={{margin: 5}}>
        {userIndex[user]?.name || user}
        {mouseX && mouseY && (
          <a
            className="button"
            style={{margin: '0 10px'}}
            href={`#${mouseX}/${mouseY}/32`}
          >
            go
          </a>
        )}
      </div>
    ));
};

import {Fragment} from 'react';
import {
  getLatestTimestamp,
  sessionId,
  sessionTimeOut,
} from '../hooks/useCursors';

export const Cursors = ({cursors, scale, userIndex}) => {
  const latestTimestamp = getLatestTimestamp(cursors);
  return Object.entries(cursors).map(
    ([key, {user, left, top, width, height, tstamp, mouseX, mouseY}]) => {
      if (key === sessionId || latestTimestamp - tstamp > sessionTimeOut)
        return null;

      const opacity = 1 - (latestTimestamp - tstamp) / sessionTimeOut;
      return (
        <Fragment key={key}>
          <div
            className="cursorView"
            style={{
              transform: `translate(${left * scale}px, ${top * scale}px)`,
              width: width * scale,
              height: height * scale,
              opacity,
            }}
          >
            <span>{userIndex[user]?.name || user}</span>
          </div>
          {mouseX && mouseY ? (
            <div
              className="mouseCursor"
              style={{
                transform: `translate(${(mouseX + 0.5) * scale}px, ${
                  (mouseY + 0.5) * scale
                }px)`,
                opacity,
              }}
            >
              <i className="fa-solid fa-arrow-pointer"></i>
              <span>{userIndex[user]?.name || user}</span>
            </div>
          ) : null}
        </Fragment>
      );
    }
  );
};

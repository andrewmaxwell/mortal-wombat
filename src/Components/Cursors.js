import {Fragment} from 'react';
import {
  getLatestTimestamp,
  sessionId,
  sessionTimeOut,
} from '../hooks/useCursors';

export const CSS_SIZE = 32;

export const Cursors = ({cursors, userIndex}) => {
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
              transform: `translate(${left * CSS_SIZE}px, ${top * CSS_SIZE}px)`,
              width: width * CSS_SIZE,
              height: height * CSS_SIZE,
              opacity,
            }}
          >
            <span>{userIndex[user]?.name || user}</span>
          </div>
          {mouseX && mouseY ? (
            <div
              className="mouseCursor"
              style={{
                transform: `translate(${(mouseX + 0.5) * CSS_SIZE}px, ${
                  (mouseY + 0.5) * CSS_SIZE
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

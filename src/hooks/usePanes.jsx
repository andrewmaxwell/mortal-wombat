import {useEffect, useState} from 'react';

// Which editor panes are open, remembered in localStorage (as "show<buttonLabel>"), and a
// toggle button for each. Returns {[key]: {button, show, setShow, paneProps}}.

const storageKey = ({buttonLabel}) => 'show' + buttonLabel;

const readShown = (config) => {
  const shown = {};
  for (const pane of config) {
    try {
      shown[pane.key] = JSON.parse(localStorage[storageKey(pane)] ?? 'false');
    } catch (e) {
      console.error(e);
    }
  }
  return shown;
};

export const usePanes = (config) => {
  const [shown, setShown] = useState(() => readShown(config));

  useEffect(() => {
    for (const pane of config) {
      localStorage[storageKey(pane)] = JSON.stringify(!!shown[pane.key]);
    }
  }, [shown]);

  return Object.fromEntries(
    config.map(({key, buttonLabel, paneLabel, icon}) => {
      const show = !!shown[key];
      const setShow = (value) =>
        setShown((shown) => ({
          ...shown,
          [key]: typeof value === 'function' ? value(!!shown[key]) : value,
        }));

      const button = (
        <a
          key={key}
          className={show ? 'active' : ''}
          onClick={() => setShow((s) => !s)}
        >
          <i className={`fa-solid fa-${icon}`} /> {buttonLabel}
        </a>
      );

      const paneProps = {
        label: paneLabel,
        className: key + 'Container',
        hide: () => setShow(false),
      };

      return [key, {button, show, setShow, paneProps}];
    }),
  );
};

import {useStatePersist} from '../hooks/useStatePersist';

export const makeButtons = (config) =>
  Object.fromEntries(
    config.map(({key, buttonLabel, paneLabel, icon}) => {
      const [show, setShow] = useStatePersist('show' + buttonLabel, false);

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
    })
  );

import {useStatePersist} from '../hooks/useStatePersist';

export const makeButtons = (config) =>
  Object.fromEntries(
    config.map(({key, buttonLabel, paneLabel, icon, hideButton}) => {
      const [show, setShow] = useStatePersist('show' + buttonLabel, false);

      const button = !hideButton && (
        <a
          key={key}
          className={`button${show ? ' active' : ''}`}
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

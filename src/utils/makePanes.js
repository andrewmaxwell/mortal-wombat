import {useStatePersist} from '../hooks/useStatePersist';

export const makePanes = (config) =>
  Object.fromEntries(
    config.map(({key, label, icon, hideButton}) => {
      const [show, setShow] = useStatePersist('show' + label, false);

      const button = !hideButton && (
        <button
          key={key}
          className={show ? 'active' : ''}
          onClick={() => setShow((s) => !s)}
        >
          <i className={`fa-solid fa-${icon}`} /> {label}
        </button>
      );

      return [key, {key, label, button, show, setShow}];
    })
  );

import {Pane} from '../Components/Pane';
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

      const pane = ({children}) =>
        show && (
          <Pane
            label={label}
            className={`${key}Container`}
            hide={() => setShow(false)}
          >
            {children}
          </Pane>
        );

      return [key, {pane, button, show, setShow}];
    })
  );

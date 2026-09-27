import './pane.css';

export const Pane = ({className, hide, label, children}) => (
  <div className={`pane ${className}`}>
    <div className="paneHeader">
      <a onClick={hide}>
        <i className="fa-solid fa-x"></i>
      </a>
      <strong>{label}</strong>
    </div>
    <div className="paneBody">{children}</div>
  </div>
);

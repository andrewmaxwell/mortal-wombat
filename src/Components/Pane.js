import './pane.css';

export const Pane = ({className, hide, label, children}) => (
  <div className={`pane ${className}`}>
    <header>
      <a onClick={hide}>[x]</a>
      <strong>{label}</strong>
    </header>
    {children}
  </div>
);

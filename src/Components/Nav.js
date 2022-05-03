import {logOut} from '../firebase';

export const Nav = ({user, setScale, zoomAmt, userIndex, children}) => (
  <nav>
    {user && (
      <div style={{float: 'right'}}>
        <a
          className="button"
          onClick={() => setScale((s) => Math.round(s * zoomAmt))}
        >
          <i className="fa-solid fa-magnifying-glass-plus"></i>
        </a>
        <a
          className="button"
          onClick={() => setScale((s) => Math.round(s / zoomAmt))}
        >
          <i className="fa-solid fa-magnifying-glass-minus"></i>
        </a>
        Hi, {userIndex[user.email]?.name || user.email}!
        <a className="button" onClick={logOut}>
          log out
        </a>
      </div>
    )}
    <b>Game Editor</b>
    {children}
  </nav>
);

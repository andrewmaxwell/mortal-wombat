import {logOut} from '../firebase';

export const Nav = ({user, setScale, zoomAmt, userIndex, children}) => (
  <nav>
    {user && (
      <div style={{float: 'right'}}>
        <button onClick={() => setScale((s) => Math.round(s * zoomAmt))}>
          <i className="fa-solid fa-magnifying-glass-plus"></i>
        </button>
        <button onClick={() => setScale((s) => Math.round(s / zoomAmt))}>
          <i className="fa-solid fa-magnifying-glass-minus"></i>
        </button>
        Hi, {userIndex[user.email]?.name || user.email}!
        <button onClick={logOut}>log out</button>
      </div>
    )}
    <b>Game Editor</b>
    {children}
  </nav>
);

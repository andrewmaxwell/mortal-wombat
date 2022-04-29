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
        <a
          className="button"
          href={location.href.replace(/\?.*/, '')}
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-solid fa-play"></i> Play Game
        </a>
        Hello, {userIndex[user.email]?.name} (<a onClick={logOut}>log out</a>)
      </div>
    )}
    <b>Game Editor</b>

    {children}
  </nav>
);

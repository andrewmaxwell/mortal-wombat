import {logOut} from '../firebase';
import packageJSON from '../../package.json';

export const Nav = ({user, setScale, zoomAmt, userIndex, children}) => (
  <nav>
    {user && (
      <div style={{float: 'right'}}>
        <a onClick={() => setScale((s) => Math.round(s * zoomAmt))}>
          <i className="fa-solid fa-magnifying-glass-plus"></i>
        </a>
        <a onClick={() => setScale((s) => Math.round(s / zoomAmt))}>
          <i className="fa-solid fa-magnifying-glass-minus"></i>
        </a>
        Hi, {userIndex[user.email]?.name || user.email}!
        <a onClick={logOut}>log out</a>
      </div>
    )}
    <b>MW Collabitat v{packageJSON.version}</b>
    {children}
  </nav>
);

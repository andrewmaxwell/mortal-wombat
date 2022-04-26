import './App.css';
import {ErrorBanner} from './ErrorBanner';
import {Chat} from './Chat';
import {useErrors} from '../hooks/useErrors';
import {useEffect, useState} from 'react';
import {listen, logOut} from '../firebase';
import {Login} from './Login';
import {useUser} from '../hooks/useUser';
import {useUserIndex} from '../hooks/useUserIndex';
import {Toolbar} from './Toolbar';
import {WorldEditor} from './WorldEditor';
import {useTileTypeIndex} from '../hooks/useTileTypeIndex';
import {useCoords} from '../hooks/useCoords';
import {Todos} from './Todos';
import {Pane} from './Pane';

const zoomAmt = 1.25;

export const App = () => {
  const [errors, onError, clearError] = useErrors();
  const user = useUser();
  const userIndex = useUserIndex(onError);
  const tileTypeIndex = useTileTypeIndex(onError);

  const [selectedTileType, setSelectedTileType] = useState();

  const [world, setWorld] = useState({});
  useEffect(() => listen('world', setWorld, onError), []);

  const {xCoord, yCoord} = useCoords(16, 4);
  const [scale, setScale] = useState(48);

  const [showChat, setShowChat] = useState(true);
  const [showTodos, setShowTodos] = useState(true);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    // syncronize scale in css as var(--scale)
    document.documentElement.style.setProperty('--scale', scale + 'px');
  }, [scale]);

  return (
    <>
      <nav>
        {user && (
          <div style={{float: 'right'}}>
            <button onClick={() => setScale(Math.round(scale * zoomAmt))}>
              <i className="fa-solid fa-magnifying-glass-plus"></i> Zoom In
            </button>
            <button onClick={() => setScale(Math.round(scale / zoomAmt))}>
              <i className="fa-solid fa-magnifying-glass-minus"></i> Zoom Out
            </button>
            <a
              className="button"
              href={location.href.replace(/\?.*/, '')}
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-solid fa-play"></i> Play Game
            </a>
            Hello, {userIndex[user.email]?.name} (
            <a onClick={logOut}>log out</a>)
          </div>
        )}
        <b>Game Editor</b>

        <button
          className={showChat ? 'active' : ''}
          onClick={() => setShowChat((s) => !s)}
        >
          <i className="fa-solid fa-message"></i> Chat
        </button>

        <button
          className={showTodos ? 'active' : ''}
          onClick={() => setShowTodos((s) => !s)}
        >
          <i className="fa-solid fa-list-check"></i> Todos
        </button>

        <button
          className={showDebug ? 'active' : ''}
          onClick={() => setShowDebug((s) => !s)}
        >
          <i className="fa-solid fa-bug"></i> Debug
        </button>
      </nav>
      <ErrorBanner errors={errors} clearError={clearError} />
      {user ? (
        <div className="appContainer">
          {showChat && (
            <Pane
              label="Chat"
              className="chatContainer"
              hide={() => setShowChat(false)}
            >
              <Chat onError={onError} user={user} userIndex={userIndex} />
            </Pane>
          )}

          {showTodos && (
            <Pane
              label="Shared To Do List"
              className="todosContainer"
              hide={() => setShowTodos(false)}
            >
              <Todos onError={onError} />
            </Pane>
          )}

          {showDebug && (
            <Pane
              label="Debug"
              className="debugContainer"
              hide={() => setShowDebug(false)}
            >
              <textarea
                readOnly
                value={JSON.stringify(
                  {
                    xCoord,
                    yCoord,
                    scale,
                    user,
                    selectedTileType,
                    userIndex,
                    errors,
                    tileTypeIndex,
                    world,
                  },
                  null,
                  2
                )}
              />
            </Pane>
          )}

          <div className="gameContainer">
            <WorldEditor
              {...{
                selectedTileType,
                world,
                tileTypeIndex,
                onError,
                xCoord,
                yCoord,
                scale,
              }}
            />
          </div>

          <div className="toolContainer">
            <Toolbar
              {...{tileTypeIndex, selectedTileType, setSelectedTileType}}
            />
          </div>
        </div>
      ) : (
        <Login onError={onError} />
      )}
    </>
  );
};

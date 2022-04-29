import {ErrorBanner} from './ErrorBanner';
import {Chat} from './Chat';
import {useErrors} from '../hooks/useErrors';
import {useEffect, useState} from 'react';

import {Login} from './Login';
import {useUser} from '../hooks/useUser';
import {useUserIndex} from '../hooks/useUserIndex';
import {Toolbar} from './Toolbar';
import {WorldEditor} from './WorldEditor';
import {useTileTypeIndex} from '../hooks/useTileTypeIndex';
import {useCoords} from '../hooks/useCoords';
import {Todos} from './Todos';
import {useStatePersist} from '../hooks/useStatePersist';
import {useWorld} from '../hooks/useWorld';
import {Nav} from './Nav';
import {TileTypeEditor} from './TileTypeEditor';
import {makePanes} from '../utils/makePanes';
import {GameConfig} from './GameConfig';
import './App.css';
import {useLocationHash} from '../hooks/useLocationHash';

const zoomAmt = 1.25;

const paneConfigs = [
  {key: 'chat', label: 'Chat', icon: 'message'},
  {key: 'todos', label: 'Todos', icon: 'list-check'},
  {
    key: 'gameConfig',
    label: 'Game Config',
    icon: 'toolbox',
  },
  {key: 'tte', label: 'Tile Type Editor', hideButton: true},
  {key: 'debug', label: 'Debug', icon: 'bug'},
];

export const App = () => {
  const [errors, onError, clearError] = useErrors();

  // firebase state
  const user = useUser();
  const userIndex = useUserIndex(onError);
  const tileTypeIndex = useTileTypeIndex(onError);
  const world = useWorld(onError);

  // local state
  const [selectedTileTypeId, setSelectedTileTypeId] = useState();
  const {xCoord, yCoord, setXCoord, setYCoord} = useCoords(16, 4);
  const [scale, setScale] = useStatePersist('scale', 48);

  // pane toggles
  const Panes = makePanes(paneConfigs);

  useEffect(() => {
    // syncronize scale in css as var(--scale)
    document.documentElement.style.setProperty('--scale', scale + 'px');
  }, [scale]);

  useLocationHash({xCoord, yCoord, scale, setXCoord, setYCoord, setScale});

  return (
    <>
      <Nav {...{user, scale, setScale, zoomAmt, userIndex}}>
        {Object.values(Panes).map(({button}) => button)}
      </Nav>

      <ErrorBanner errors={errors} clearError={clearError} />

      {user ? (
        <div className="appContainer">
          <Panes.chat.pane>
            <Chat onError={onError} user={user} userIndex={userIndex} />
          </Panes.chat.pane>

          <Panes.todos.pane>
            <Todos onError={onError} />
          </Panes.todos.pane>

          <Panes.debug.pane>
            <textarea
              readOnly
              value={JSON.stringify(
                {
                  xCoord,
                  yCoord,
                  scale,
                  selectedTileTypeId,
                  errors,
                  user,
                  // tileTypeIndex,
                  // userIndex,
                  // world,
                },
                null,
                2
              )}
            />
          </Panes.debug.pane>

          {tileTypeIndex[selectedTileTypeId] && (
            <Panes.tte.pane>
              <TileTypeEditor
                selectedTileType={tileTypeIndex[selectedTileTypeId]}
                user={user}
                onError={onError}
              />
            </Panes.tte.pane>
          )}

          <Panes.gameConfig.pane>
            <GameConfig onError={onError} user={user} />
          </Panes.gameConfig.pane>

          <div className="toolContainer">
            <Toolbar
              {...{
                tileTypeIndex,
                selectedTileTypeId,
                setSelectedTileTypeId,
                showTileTypeEditor: Panes.tte.show,
                setShowTileTypeEditor: Panes.tte.setShow,
              }}
            />
          </div>

          <div className="worldEditorContainer">
            <WorldEditor
              {...{
                selectedTileType: tileTypeIndex[selectedTileTypeId],
                world,
                tileTypeIndex,
                onError,
                xCoord,
                yCoord,
                scale,
                user,
              }}
            />
          </div>
        </div>
      ) : (
        <Login onError={onError} />
      )}
    </>
  );
};

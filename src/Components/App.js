import {ErrorBanner} from './ErrorBanner';
import {useErrors} from '../hooks/useErrors';
import {useEffect, useState} from 'react';

import {Login} from './Login';
import {useUser} from '../hooks/useUser';
import {useUserIndex} from '../hooks/useUserIndex';
import {Toolbar} from './Toolbar';
import {WorldEditor} from './WorldEditor';
import {useTileTypes} from '../hooks/useTileTypes';
import {useCoords} from '../hooks/useCoords';
import {useWorld} from '../hooks/useWorld';
import {Nav} from './Nav';
import {TileTypeEditor} from './TileTypeEditor';
import {makePanes} from '../utils/makePanes';
import {GameConfig} from './GameConfig';
import './App.css';
import {useLocationHash} from '../hooks/useLocationHash';

const zoomAmt = 1.25;

const paneConfigs = [
  {
    key: 'gameConfig',
    label: 'Config',
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
  const tileTypes = useTileTypes(onError);
  const world = useWorld(onError);

  // local state
  const [selectedTileTypeId, setSelectedTileTypeId] = useState();
  const {xCoord, yCoord, setXCoord, setYCoord} = useCoords(16, 4);
  const [scale, setScale] = useState(32);

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

          {selectedTileTypeId &&
            tileTypes &&
            Object.values(tileTypes).some(
              (t) => t.id === selectedTileTypeId
            ) && (
              <Panes.tte.pane>
                <TileTypeEditor
                  selectedTileTypeId={selectedTileTypeId}
                  tileTypes={tileTypes}
                  user={user}
                  onError={onError}
                />
              </Panes.tte.pane>
            )}

          <Panes.gameConfig.pane>
            <GameConfig onError={onError} user={user} />
          </Panes.gameConfig.pane>

          {tileTypes && (
            <div className="toolContainer">
              <Toolbar
                {...{
                  tileTypes,
                  selectedTileTypeId,
                  setSelectedTileTypeId,
                  showTileTypeEditor: Panes.tte.show,
                  setShowTileTypeEditor: Panes.tte.setShow,
                }}
              />
            </div>
          )}

          {world && tileTypes && (
            <div className="worldEditorContainer">
              <WorldEditor
                {...{
                  world,
                  selectedTileTypeId,
                  tileTypes,
                  onError,
                  xCoord,
                  yCoord,
                  scale,
                  user,
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <Login onError={onError} />
      )}
    </>
  );
};

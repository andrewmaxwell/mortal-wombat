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
import {makeButtons} from '../utils/makeButtons';
import {GameConfig} from './GameConfig';
import './App.css';
import {useLocationHash} from '../hooks/useLocationHash';
import {Pane} from './common/Pane';
import {setCursor, useCursors} from '../hooks/useCursors';
import {HereNow} from './HereNow';

const zoomAmt = 2;

const paneConfigs = [
  {
    key: 'instructions',
    buttonLabel: 'Instructions',
    paneLabel: 'Instructions',
    icon: 'circle-question',
  },
  {
    key: 'gameConfig',
    buttonLabel: 'Config',
    paneLabel: 'Game Config',
    icon: 'toolbox',
  },
  {key: 'tileTypeEditor', paneLabel: 'Tile Type Editor', hideButton: true},
  {
    key: 'hereNow',
    buttonLabel: 'People',
    paneLabel: 'Editing Now',
    icon: 'person',
  },
  {key: 'debug', buttonLabel: 'Debug', paneLabel: 'Debug', icon: 'bug'},
];

export const App = () => {
  const [errors, onError, clearError] = useErrors();

  // firebase state
  const user = useUser();
  const userIndex = useUserIndex(onError);
  const tileTypes = useTileTypes(onError);
  const world = useWorld(onError);
  const cursors = useCursors(onError);

  // local state
  const [selectedTileTypeId, setSelectedTileTypeId] = useState();
  const {xCoord, yCoord, setXCoord, setYCoord} = useCoords(0, 0);
  const [scale, setScale] = useState(32);

  // pane toggles
  const Panes = makeButtons(paneConfigs);

  useEffect(() => {
    // syncronize scale in css as var(--scale)
    document.documentElement.style.setProperty('--scale', scale + 'px');
  }, [scale]);

  useLocationHash({xCoord, yCoord, scale, setXCoord, setYCoord, setScale});

  useEffect(() => {
    if (user) setCursor(user, null, null, xCoord, yCoord, scale, onError);
  }, [user, xCoord, yCoord, scale]);

  return (
    <>
      <Nav {...{user, scale, setScale, zoomAmt, userIndex}}>
        {Object.values(Panes).map(({button}) => button)}
      </Nav>

      <ErrorBanner errors={errors} clearError={clearError} />

      {user ? (
        <div className="appContainer">
          {Panes.debug.show && (
            <Pane {...Panes.debug.paneProps}>
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
                    cursors,
                    // tileTypeIndex,
                    // userIndex,
                    // world,
                  },
                  null,
                  2
                )}
              />
            </Pane>
          )}

          {selectedTileTypeId &&
            tileTypes &&
            Panes.tileTypeEditor.show &&
            Object.values(tileTypes).some(
              (t) => t.id === selectedTileTypeId
            ) && (
              <Pane {...Panes.tileTypeEditor.paneProps}>
                <TileTypeEditor
                  selectedTileTypeId={selectedTileTypeId}
                  tileTypes={tileTypes}
                  onError={onError}
                />
              </Pane>
            )}

          {Panes.gameConfig.show && (
            <Pane {...Panes.gameConfig.paneProps}>
              <GameConfig onError={onError} />
            </Pane>
          )}

          {Panes.hereNow.show && (
            <Pane {...Panes.hereNow.paneProps}>
              <HereNow cursors={cursors} userIndex={userIndex} />
            </Pane>
          )}

          {Panes.instructions.show && (
            <Pane {...Panes.instructions.paneProps}>
              <p>Use the arrow keys or WASD to move around the map.</p>
              <p>
                Click a tile type at the bottom. Click on the map to place it.
              </p>
              <p>Shift+Click a tile to delete it.</p>
              <p>
                You can zoom in and out with{' '}
                <i className="fa-solid fa-magnifying-glass-plus"></i> and{' '}
                <i className="fa-solid fa-magnifying-glass-minus"></i> in the
                upper right.
              </p>
              <p>
                Share your URL with other editors to show them what you made.
              </p>
              <p>
                To test what you have made, Alt+Click where you want to start
                testing. Share your game URL to share your starting point.
              </p>
            </Pane>
          )}

          {tileTypes && (
            <div className="toolContainer">
              <Toolbar
                {...{
                  tileTypes,
                  selectedTileTypeId,
                  setSelectedTileTypeId,
                  showTileTypeEditor: Panes.tileTypeEditor.show,
                  setShowTileTypeEditor: Panes.tileTypeEditor.setShow,
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
                  cursors,
                  userIndex,
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

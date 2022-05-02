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
import {Pane} from './common/Pane';
import {setCursor, useCursors} from '../hooks/useCursors';
import {HereNow} from './HereNow';

const zoomAmt = 1.25;

const paneConfigs = [
  {
    key: 'gameConfig',
    label: 'Config',
    icon: 'toolbox',
  },
  {key: 'tileTypeEditor', label: 'Tile Type Editor', hideButton: true},
  {key: 'hereNow', label: 'People', icon: 'person'},
  {key: 'debug', label: 'Debug', icon: 'bug'},
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
  const Panes = makePanes(paneConfigs);

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
            <Pane
              label={Panes.debug.label}
              className="debugContainer"
              hide={() => Panes.debug.setShow(false)}
            >
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
              <Pane
                label={Panes.tileTypeEditor.label}
                className={Panes.tileTypeEditor.key + 'Container'}
                hide={() => Panes.tileTypeEditor.setShow(false)}
              >
                <TileTypeEditor
                  selectedTileTypeId={selectedTileTypeId}
                  tileTypes={tileTypes}
                  user={user}
                  onError={onError}
                />
              </Pane>
            )}

          {Panes.gameConfig.show && (
            <Pane
              label="Game Config"
              className="gameConfigContainer"
              hide={() => Panes.gameConfig.setShow(false)}
            >
              <GameConfig onError={onError} user={user} />
            </Pane>
          )}

          {Panes.hereNow.show && (
            <Pane
              label="Using the Editor Right Now"
              className="hereNowContainer"
              hide={() => Panes.hereNow.setShow(false)}
            >
              <HereNow cursors={cursors} userIndex={userIndex} />
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

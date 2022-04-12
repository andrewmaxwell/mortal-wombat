import {useMemo, useState} from 'react';
import {graphicToCanvas} from '../utils/graphicToCanvas';
import {TileEditor} from './TileEditor';

const TileButton = ({tile, isSelected, select}) => (
  <button
    className="tileButton"
    style={{
      boxShadow: isSelected ? '0 0 16px cyan' : 'none',
      border: isSelected ? '1px solid cyan' : 'none',
    }}
    onClick={select}
  >
    <img
      src={useMemo(
        () => graphicToCanvas(tile.graphic).toDataURL(),
        [tile.graphic]
      )}
    />
    <div>{tile.description}</div>
  </button>
);

export const Editor = ({initialState, onChange}) => {
  const [selected, setSelected] = useState();
  return (
    initialState && (
      <div style={{padding: 5}}>
        <div>
          {Object.entries(initialState.tiles).map(([id, tile]) => (
            <TileButton
              key={id}
              tile={tile}
              isSelected={selected === id}
              select={() => setSelected(id)}
            />
          ))}
        </div>

        {selected && (
          <div style={{margin: '30px 0'}}>
            <input
              value={initialState.tiles[selected].description}
              onChange={(e) =>
                onChange(['tiles', selected, 'description'], e.target.value)
              }
            />
            <TileEditor
              rows={16}
              cellSize={24}
              input={initialState.tiles[selected].graphic}
              onChange={(newGraphic) =>
                onChange(['tiles', selected, 'graphic'], newGraphic)
              }
            />
          </div>
        )}
      </div>
    )
  );
};

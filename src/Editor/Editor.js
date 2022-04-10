import {useState} from 'react';
import {TileEditor} from './TileEditor/TileEditor';

const sharedUrl =
  'https://docs.google.com/spreadsheets/d/1ijvNlyV5KCEx0eemqdmLjYMMajbkbQQq6GduOCLHmvk/edit?usp=sharing';

const TileButton = ({canvas, description, isSelected, select}) => (
  <button
    style={{
      position: 'relative',
      display: 'inline-block',
      width: 48,
      height: 48,
      margin: 5,
      padding: 0,
      boxShadow: isSelected ? '0 0 16px cyan' : 'none',
      border: isSelected ? '1px solid cyan' : 'none',
      cursor: 'pointer',
    }}
    onClick={select}
  >
    <img
      src={canvas.toDataURL()}
      style={{width: '100%', height: '100%', imageRendering: 'pixelated'}}
    />
    <div
      style={{
        position: 'absolute',
        bottom: -8,
        right: 0,
        color: 'white',
        background: 'rgba(0,0,0,0.5)',
      }}
    >
      {description}
    </div>
  </button>
);

export const Editor = ({initialState}) => {
  const [selected, setSelected] = useState();
  const [editingTile, setEditingTile] = useState(false);
  return (
    initialState && (
      <div style={{padding: 5}}>
        <div>
          {Object.entries(initialState.tiles).map(([id, tile]) => (
            <TileButton
              key={id}
              {...tile}
              isSelected={selected === id}
              select={() => setSelected(id)}
            />
          ))}
        </div>

        {selected && (
          <div style={{margin: '30px 0'}}>
            {editingTile ? (
              <TileEditor
                rows={16}
                cellSize={24}
                input={initialState.tiles[selected]?.data}
              />
            ) : (
              <button onClick={() => setEditingTile(true)}>Edit Tile</button>
            )}
          </div>
        )}

        <a
          href={sharedUrl}
          target="_blank"
          rel="noreferrer"
          style={{display: 'block', marginTop: 30}}
        >
          Edit Config in Google Sheets
        </a>
      </div>
    )
  );
};

import {useState} from 'react';
import {TileEditor} from './TileEditor/TileEditor';

const TileButton = ({dataURL, description, isSelected, select}) => (
  <button
    className="tileButton"
    style={{
      boxShadow: isSelected ? '0 0 16px cyan' : 'none',
      border: isSelected ? '1px solid cyan' : 'none',
    }}
    onClick={select}
  >
    <img src={dataURL} />
    <div>{description}</div>
  </button>
);

export const Editor = ({initialState}) => {
  const [selected, setSelected] = useState();
  return (
    initialState && (
      <div style={{padding: 5}}>
        <div>
          {Object.values(initialState.tiles).map(
            ({id, description, dataURL}) => (
              <TileButton
                key={id}
                description={description}
                dataURL={dataURL}
                isSelected={selected === id}
                select={() => setSelected(id)}
              />
            )
          )}
        </div>

        {selected && (
          <div style={{margin: '30px 0'}}>
            <TileEditor
              rows={16}
              cellSize={24}
              input={initialState.tiles[selected].graphic}
            />
          </div>
        )}
      </div>
    )
  );
};

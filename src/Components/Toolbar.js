import './toolbar.css';
import {getBackground} from './WorldEditor';

export const Toolbar = ({
  tileTypes,
  selectedTileTypeId,
  setSelectedTileTypeId,
  showTileTypeEditor,
  setShowTileTypeEditor,
}) => (
  <div className="toolBar">
    {Object.values(tileTypes)
      .sort((a, b) => a.order - b.order)
      .map((type) => (
        <div
          key={type.label}
          className={
            'tileType' + (selectedTileTypeId === type.id ? ' selected' : '')
          }
          style={getBackground(type)}
          title={
            showTileTypeEditor ? '' : 'Double click to edit tile properties.'
          }
          onClick={() => {
            setShowTileTypeEditor(false);
            setSelectedTileTypeId(type.id);
          }}
          onDoubleClick={() =>
            type.id && !type.id.startsWith('_') && setShowTileTypeEditor(true)
          }
        >
          <label>{type.label}</label>
        </div>
      ))}
  </div>
);

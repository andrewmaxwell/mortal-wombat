import {update} from '../firebase';
import {getBackground} from '../utils/getBackground';
import './toolbar.css';

export const Toolbar = ({
  tileTypes,
  selectedTileTypeId,
  setSelectedTileTypeId,
  showTileTypeEditor,
  setShowTileTypeEditor,
  worldId,
}) => {
  const createTileType = () => {
    const newKey = Object.values(tileTypes).length.toString();
    update({
      [`worlds/${worldId}/tileTypes/${newKey}`]: {order: newKey, id: newKey},
    });
    setSelectedTileTypeId(newKey);
    setShowTileTypeEditor(true);
  };

  return (
    <div className="toolBar">
      <div className="tileType" onClick={() => setSelectedTileTypeId()}>
        <label>None</label>
      </div>

      {Object.entries(tileTypes)
        .sort((a, b) => a[1].order - b[1].order)
        .map(([key, type]) => (
          <div
            key={key}
            className={
              'tileType' + (selectedTileTypeId === type.id ? ' selected' : '')
            }
            style={{background: getBackground(type)}}
            title={
              showTileTypeEditor ? '' : 'Double click to edit tile properties.'
            }
            onClick={() => setSelectedTileTypeId(type.id)}
            onDoubleClick={() => setShowTileTypeEditor(true)}
          >
            <label>{type.label}</label>
          </div>
        ))}
      <div className="tileType">
        <button onClick={createTileType}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

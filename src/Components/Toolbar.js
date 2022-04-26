import './toolbar.css';

const extraButtons = [
  // {key: '__select', label: 'select', icon: '⌖'},
  {
    key: '__erase',
    label: 'erase',
    icon: <i className="fa-solid fa-eraser"></i>,
    color: 'black',
  },
];

export const Toolbar = ({
  tileTypeIndex,
  selectedTileType,
  setSelectedTileType,
}) => (
  <div className="toolBar">
    {[...extraButtons, ...Object.values(tileTypeIndex)].map((type) => (
      <div
        key={type.key}
        className={'tileType' + (selectedTileType === type ? ' selected' : '')}
        style={{backgroundColor: type.color}}
        onClick={() => setSelectedTileType(type)}
      >
        {type.icon}
        <label>{type.label}</label>
      </div>
    ))}
  </div>
);

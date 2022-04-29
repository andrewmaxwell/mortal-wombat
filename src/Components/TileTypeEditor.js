import {updateWithHistory} from '../firebase';
import {objToArr} from '../utils';
import {FormThing} from './FormThing';
import './tileTypeEditor.css';

const fields = [
  {
    prop: 'label',
    label: 'Label',
    type: 'text',
    info: 'The label you see in the tool bar below.',
  },
  {
    prop: 'image',
    label: 'Image URL',
    type: 'text',
    info: 'The image. uhduhhhh',
  },
  {
    prop: 'color',
    label: 'Color',
    type: 'text',
    info: 'The color to use if there is no image',
  },
  {prop: 'edible', label: 'Edible', type: 'checkbox', info: 'Can you eat it?'},
  {
    prop: 'diggable',
    label: 'Diggable',
    type: 'checkbox',
    info: 'Can you dig it?',
  },
  {prop: 'deadly', label: 'Deadly', type: 'checkbox', info: 'Does it hurt?'},
  {
    prop: 'collectible',
    label: 'Collectible',
    type: 'checkbox',
    info: 'Can you collect it?',
  },
  {
    prop: 'order',
    label: 'Order',
    type: 'number',
    info: 'The order it shows up in the toolbar below',
  },
  // {prop: 'movement', label: 'Movement', type: 'select', }
];

export const TileTypeEditor = ({
  selectedTileTypeId,
  tileTypes,
  user,
  onError,
}) => {
  const selectedTileType = objToArr(tileTypes).find(
    (el) => el.id === selectedTileTypeId
  );

  return (
    selectedTileType && (
      <div className="tileTypeEditor">
        <FormThing
          fields={fields}
          data={selectedTileType}
          onChange={(value, prop) => {
            updateWithHistory(
              {[`tileTypes/${selectedTileType.key}/${prop}`]: value},
              user,
              onError
            );
          }}
        />
      </div>
    )
  );
};

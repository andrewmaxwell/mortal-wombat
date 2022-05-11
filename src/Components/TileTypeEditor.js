import {update} from '../firebase';
import {objToArr} from '../utils';
import {FormThing} from './common/FormThing';
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
  {
    prop: 'hp',
    label: 'HP',
    type: 'number',
    info: 'How much health does it have?',
  },
  {
    prop: 'movable',
    label: 'Movable',
    type: 'checkbox',
    info: 'Can you move it?',
  },
  {
    prop: 'moveDelay',
    label: 'Move Delay',
    type: 'number',
    info: 'How many frames does it wait to move? Smaller is faster.',
  },
  {
    prop: 'moveStyle',
    label: 'Move Style',
    type: 'select',
    info: 'How does it move?',
    options: ['liquid', 'patrol'],
    show: (data) => parseInt(data.moveDelay),
  },
  {
    prop: 'healing',
    label: 'Healing',
    type: 'number',
    info: 'How much does it heal (or hurt) when you eat/touch it (per frame)?',
  },
  {prop: 'edible', label: 'Edible', type: 'checkbox', info: 'Can you eat it?'},
  {
    prop: 'makePoop',
    label: 'Make Poop',
    type: 'number',
    info: 'How much poop does it make?',
    show: (data) => data.edible,
  },
  {
    prop: 'diggable',
    label: 'Diggable',
    type: 'checkbox',
    info: 'Can you dig it?',
    show: (data) => !data.edible,
  },
  {
    prop: 'collectible',
    label: 'Collectible',
    type: 'checkbox',
    info: 'Can you collect it?',
    show: (data) => !data.edible && !data.movable,
  },
  {
    prop: 'order',
    label: 'Order',
    type: 'number',
    info: 'The order it shows up in the toolbar below',
  },

  // {prop: 'movement', label: 'Movement', type: 'select', }
];

export const TileTypeEditor = ({selectedTileTypeId, tileTypes, onError}) => {
  const selectedTileType = objToArr(tileTypes).find(
    (el) => el.id === selectedTileTypeId
  );

  return (
    selectedTileType && (
      <div className="tileTypeEditor">
        <p>
          <span style={{color: 'orange'}}>
            <i className="fa-solid fa-triangle-exclamation"></i> WARNING
          </span>{' '}
          You can seriously mess up the game if you change these. Please write
          them down and change them very carefully!
        </p>
        <FormThing
          fields={fields}
          data={selectedTileType}
          onChange={(value, prop) => {
            update(
              {[`tileTypes/${selectedTileType.key}/${prop}`]: value},
              onError
            );
          }}
        />
      </div>
    )
  );
};

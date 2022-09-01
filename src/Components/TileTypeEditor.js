import {defaultTileTypes} from '../defaults';
import {update} from '../firebase';
import {objToArr} from '../utils';
import {mergeDeepLeft} from '../utils/mergeDeepLeft';
import {FormThing} from './common/FormThing';
import './tileTypeEditor.css';

/*
g: grass
p: poop,
s: stone,
w: wombat,
m: magma,
j: jewel,
k: koala,
a: water,
o: polymer
n: npc

*/

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const fields = [
  {
    prop: 'label',
    label: 'Label',
    type: 'text',
    info: 'The label you see in the tool bar below.',
  },
  ...['standing', 'walking', 'pushing', 'jumping', 'digging', 'crouching'].map(
    (n) => ({
      prop: n === 'standing' ? 'image' : `${n}Image$`,
      label: `${capitalize(n)} Image URL`,
      type: 'text',
      info: `A url to an image for ${n}.`,
      show: (data) => n === 'standing' || parseInt(data.moveDelay),
    })
  ),
  {
    prop: 'sound',
    label: 'Sound URL',
    type: 'text',
    info: 'URL for the sound that should be played.',
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
    prop: 'density',
    label: 'Density',
    type: 'number',
    info: 'Air density is 0. Wombat density is 1. Wombat floats when density is >1, sinks when <1.',
    show: (data) => parseInt(data.moveDelay),
  },
  {
    prop: 'moveStyle',
    label: 'Move Style',
    type: 'select',
    info: 'How does it move?',
    options: [
      {label: 'Liquid', value: 'liquid'},
      {label: 'Patrol', value: 'patrol'},
    ],
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
    prop: 'dropsLoot',
    label: 'Drops Loot',
    type: 'select',
    info: 'What kind of loot does it drop?',
    options: [{label: 'Jewel', value: 'j'}],
    show: (data) => data.diggable && data.hp,
  },
  {
    prop: 'order',
    label: 'Order',
    type: 'number',
    info: 'The order it shows up in the toolbar below',
  },
];

const defaults = fields.reduce((res, {prop, type}) => {
  res[prop] = type === 'checkbox' ? false : '';
  return res;
}, {});

export const TileTypeEditor = ({
  selectedTileTypeId,
  tileTypes,
  worldId,
  onError,
}) => {
  const selectedTileType = objToArr(tileTypes).find(
    (el) => el.id === selectedTileTypeId
  );

  const selectedTileTypeDefaults = mergeDeepLeft(
    Object.values(defaultTileTypes).find((el) => el.id === selectedTileTypeId),
    defaults
  );

  const onChange = (value, prop) => {
    update(
      {[`worlds/${worldId}/tileTypes/${selectedTileType.key}/${prop}`]: value},
      onError
    );
  };

  return (
    selectedTileType && (
      <div className="tileTypeEditor">
        <FormThing
          fields={fields}
          data={selectedTileType}
          defaults={selectedTileTypeDefaults}
          onChange={onChange}
        />
      </div>
    )
  );
};

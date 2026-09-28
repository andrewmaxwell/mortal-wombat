import {defaultTileTypes} from '../defaults';
import {update} from '../firebase';
import {objToArr} from '../utils';
import {mergeDeepLeft} from '../utils/mergeDeepLeft';
import {markEdited} from '../utils/worldIndex';
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
  {
    prop: 'image',
    label: 'Image URL',
    type: 'text',
    info: `A url to an image.`,
  },
  ...['walking', 'pushing', 'jumping', 'digging', 'crouching'].map((n) => ({
    prop: `${n}Image`,
    label: `${capitalize(n)} Image URL`,
    type: 'text',
    info: `A url to an image for ${n}.`,
    show: (data) => data.label === 'wombat' || parseInt(data.moveDelay),
  })),
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
    prop: 'burns',
    label: 'Burns',
    type: 'checkbox',
    info: 'Does it destroy touching tiles that have HP, like magma does?',
  },
  {
    prop: 'reactsWith',
    label: 'Reacts With',
    type: 'select',
    info: 'When it touches this kind of tile, that tile disappears and this one turns into "Reacts Into". Magma reacts with water.',
    tileTypeOptions: true,
  },
  {
    prop: 'reactsInto',
    label: 'Reacts Into',
    type: 'select',
    info: 'What it turns into after reacting. Magma turns into stone.',
    tileTypeOptions: true,
    show: (data) => data.reactsWith,
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
    tileTypeOptions: true,
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
  if (
    !selectedTileTypeId ||
    selectedTileTypeId.startsWith('_') ||
    !Object.values(tileTypes).some((t) => t.id === selectedTileTypeId)
  )
    return "You can't edit this.";

  const selectedTileType = objToArr(tileTypes).find(
    (el) => el.id === selectedTileTypeId,
  );

  // placeable tile types, for the fields that pick one
  const options = objToArr(tileTypes)
    .filter(({id}) => id && !id.startsWith('_') && id !== 'w')
    .sort((a, b) => a.order - b.order)
    .map(({id, label}) => ({label: label || id, value: id}));
  const formFields = fields.map((field) =>
    field.tileTypeOptions ? {...field, options} : field,
  );

  const onChange = (value, prop) => {
    if (prop === 'color') markEdited(worldId);
    update(
      {[`worlds/${worldId}/tileTypes/${selectedTileType.key}/${prop}`]: value},
      onError,
    );
  };

  const selectedTileTypeDefaults = Object.values(defaultTileTypes).find(
    (el) => el.id === selectedTileTypeId,
  );

  return (
    selectedTileType && (
      <div className="tileTypeEditor">
        <FormThing
          fields={formFields}
          data={selectedTileType}
          defaults={
            selectedTileTypeDefaults &&
            mergeDeepLeft(selectedTileTypeDefaults, defaults)
          }
          onChange={onChange}
        />
      </div>
    )
  );
};

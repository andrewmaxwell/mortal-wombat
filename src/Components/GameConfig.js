import {useEffect, useState} from 'react';
import {defaultGameConfig} from '../defaults';
import {listen, update} from '../firebase';
import {FormThing} from './common/FormThing';
import './gameConfig.css';

const useConfig = (worldId, onError) => {
  const [config, setConfig] = useState();
  useEffect(
    () => listen(`worlds/${worldId}/gameConfig`, setConfig, onError),
    []
  );
  return config;
};

const fields = [
  {
    prop: 'digSpeed',
    label: 'Wombat Digging Speed',
    type: 'number',
    info: 'How fast much can you dig in one frame?',
  },
  {
    prop: 'eatSpeed',
    label: 'Wombat Eating Speed',
    type: 'number',
    info: 'How fast much can you eat in one frame?',
  },
  {
    prop: 'gravity',
    label: 'Gravity',
    type: 'number',
    info: 'How strong is gravity?',
  },
  {
    prop: 'health',
    label: 'Wombat Starting Health',
    type: 'number',
    info: 'How much health do you start with?',
  },
  {
    prop: 'maxHealth',
    label: 'Wombat Max Health',
    type: 'number',
    info: 'How much health can you have?',
  },
  {
    prop: 'poop',
    label: 'Wombat Starting Poop',
    type: 'number',
    info: 'How much poop do you start with?',
  },
  {
    prop: 'maxPoop',
    label: 'Wombat Max Poop',
    type: 'number',
    info: 'How much poop can you hold?',
  },
  {
    prop: 'jumpPower',
    label: 'Wombat Jumping Power',
    type: 'number',
    info: 'How much jumping power do you start with?',
  },
  {
    prop: 'moveSpeed',
    label: 'Wombat Acceleration',
    type: 'number',
    info: 'How fast can you move?',
  },
  {
    prop: 'moveDeceleration',
    label: 'Wombat Deceleration',
    type: 'number',
    info: 'How fast can you slow down?',
  },
  {
    prop: 'airDrag',
    label: 'Air Drag',
    type: 'number',
    info: 'How much does the air slow you down?',
  },
  {
    prop: 'fallDamageMin',
    label: 'Fall Dmg Threshold',
    type: 'number',
    info: 'What is the minimum blocks/frame where landing hurts?',
  },
  {
    prop: 'fallDamageMult',
    label: 'Fall Dmg Multiplier',
    type: 'number',
    info: 'This is multiplied by (your speed - Fall Dmg Threshold) when you land to calculate the damage you take.',
  },
  {
    prop: 'fallDamageSound',
    label: 'Fall Dmg Sound',
    type: 'text',
    info: 'The URL for the sound that is played if fall damage occurs.',
  },
  {
    prop: 'swimPower',
    label: 'Swim Power',
    type: 'number',
    info: 'How fast of a swimmer do you start out as?',
  },
  {
    prop: 'waterDrag',
    label: 'Water Drag',
    type: 'number',
    info: 'How quickly does water slow you down?',
  },
  {
    prop: 'gameOverSound',
    label: 'Game Over Sound',
    type: 'text',
    info: 'The URL for the sound that is played when the game is over.',
  },
  {
    prop: 'backgroundUrl',
    label: 'Background URL',
    type: 'text',
    info: 'The URL for the background of the game.',
  },
];

export const GameConfig = ({worldId, onError}) => {
  const config = useConfig(worldId, onError);
  return (
    <div className="gameConfig">
      <FormThing
        fields={fields}
        data={config}
        defaults={defaultGameConfig}
        onChange={(value, prop) => {
          update({[`worlds/${worldId}/gameConfig/${prop}`]: value}, onError);
        }}
      />
    </div>
  );
};

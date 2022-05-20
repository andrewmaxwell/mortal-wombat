import {useEffect, useState} from 'react';
import {listen, update} from '../firebase';
import {FormThing} from './common/FormThing';
import './gameConfig.css';

const useConfig = (onError) => {
  const [config, setConfig] = useState();
  useEffect(() => listen('gameConfig', setConfig, onError), []);
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
];

export const GameConfig = ({onError}) => {
  const config = useConfig(onError);
  return (
    <div className="gameConfig">
      <p>
        <span style={{color: 'orange'}}>
          <i className="fa-solid fa-triangle-exclamation"></i> WARNING
        </span>{' '}
        You can seriously mess up the game if you change these. Please write
        them down and change them very carefully!
      </p>
      <FormThing
        fields={fields}
        data={config}
        onChange={(value, prop) => {
          update({[`gameConfig/${prop}`]: value}, onError);
        }}
      />
    </div>
  );
};
